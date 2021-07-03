from flask import Blueprint, request, abort, jsonify
from http import HTTPStatus
from functools import wraps
from flask_cors import cross_origin
from flask_jwt_extended import (
    current_user,
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies,
    jwt_required,
    unset_access_cookies,
    unset_refresh_cookies,
)
from utils.forms import RegisterForm, LoginForm, get_form_errors, DoctorAppointmentForm
from models import db, User, DoctorAppointment, appointment as appointment_table
from utils import util
from datetime import datetime


api = Blueprint("api", __name__)


# decorator to make route only accessible by admin
def admin_only(f):
    @wraps(f)
    def wrapped_function(*args, **kwargs):
        if current_user and current_user.is_admin:
            return f(*args, **kwargs)
        return abort(HTTPStatus.UNAUTHORIZED)

    return wrapped_function


# AUTH
# REGISTER
@api.route("auth/register", methods=["POST"])
def register():
    data = request.json
    form = RegisterForm.from_json(data)

    if not form.validate():
        return {"error": get_form_errors(form)}, HTTPStatus.BAD_REQUEST

    first_name = form.first_name.data
    last_name = form.last_name.data
    email = form.email.data

    # Ensure that email is unique
    if User.query.filter_by(email=email).first():
        return {"error": {"email": "Email already in use."}}, HTTPStatus.BAD_REQUEST

    age = form.age.data
    password = form.password.data

    new_user = User(first_name, last_name, email, password, age)
    db.session.add(new_user)
    db.session.commit()
    response = jsonify(
        success="User created",
        user=util.row_to_dict(new_user, hidden_columns=["password"]),
    )

    util.set_access_and_refresh_token_cookies(response, new_user)

    return response, HTTPStatus.CREATED


# LOGIN
@api.route("auth/login", methods=["POST"])
def login():
    data = request.json
    form = LoginForm.from_json(data)
    if not form.validate():
        return {"error": get_form_errors(form)}, HTTPStatus.BAD_REQUEST
    email = form.email.data
    password = form.password.data
    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return {
            "error": {"password": "Email or Password is wrong"}
        }, HTTPStatus.BAD_REQUEST

    response = jsonify(
        success="Log in success",
        user=util.row_to_dict(user, hidden_columns=["password"]),
    )

    util.set_access_and_refresh_token_cookies(response, user)
    return response


# LOGOUT (remove jwt from cookies)
@api.route("auth/logout", methods=["POST"])
def logout():
    response = jsonify(success=True)
    unset_access_cookies(response)
    unset_refresh_cookies(response)
    return response


# Refresh jwt
@api.route("refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh_jwt_token():
    response = jsonify(success="token refreshed")
    util.set_access_and_refresh_token_cookies(response, current_user)
    return response


# ADMIN ROUTES
# Create new appointment
@api.route("admin/appointments", methods=["POST"])
@jwt_required()
@admin_only
def add_doctor_appointment():
    data = request.json
    form = DoctorAppointmentForm.from_json(data)

    if not form.validate():
        return {"error": get_form_errors(form)}, HTTPStatus.BAD_REQUEST

    doctor_name = form.doctor_name.data
    description = form.description.data
    max_registrants = form.max_registrants.data

    new_appointment = DoctorAppointment(doctor_name, description, max_registrants)
    db.session.add(new_appointment)
    db.session.commit()

    result = util.row_to_dict(new_appointment)

    # registrants empty
    result["registrants"] = []
    # use date from request
    # result["date"] = date
    return (jsonify(success=True, appointment=result), HTTPStatus.CREATED)


# Edit or delete appointment
@api.route("admin/appointments", methods=["PUT", "DELETE"])
@jwt_required()
@admin_only
def update_or_delete_doctor_appointment():
    id = request.json.get("id")
    if not id:
        return abort(HTTPStatus.BAD_REQUEST)

    # abort 404 if appointment doesn't exist
    appointment = DoctorAppointment.query.get_or_404(id)

    # Edit appointment
    if request.method == "PUT":
        data = request.json
        form = DoctorAppointmentForm.from_json(data)

        if not form.validate():
            return {"error": get_form_errors(form)}, HTTPStatus.BAD_REQUEST

        appointment.doctor_name = form.doctor_name.data
        appointment.description = form.description.data
        appointment.max_registrants = form.max_registrants.data

        db.session.commit()
        return jsonify(success=True, appointment=util.row_to_dict(appointment))
    # Delete appointment
    else:
        db.session.delete(appointment)
        db.session.commit()
        return jsonify(success=True)


# Get all appointments details
@api.route("admin/appointments")
@jwt_required()
@admin_only
def get_all_appointments_registrants():
    all_appointments = DoctorAppointment.query.order_by(
        DoctorAppointment.created_at.desc()
    ).all()
    res = []
    for appointment in all_appointments:
        data = util.row_to_dict(appointment)

        # Parse registrants into list of registrants dict
        data["registrants"] = [
            util.row_to_dict(registrant, ["password"])
            for registrant in appointment.registrants
        ]
        res.append(data)
    return jsonify(res)


# PATIENT/USER APPOINTMENTS ROUTES
# Get all available appointments in the future
@api.route("appointments/available", methods=["GET"])
@jwt_required()
def get_available_appointments():

    # get all patient appointments
    user_appointments_id = [appointment.id for appointment in current_user.appointments]

    # only pass appointments that patient hasn't added and the date hasn't passed
    result = (
        DoctorAppointment.query.filter(
            DoctorAppointment.id.notin_(user_appointments_id)
        )
        .order_by(DoctorAppointment.created_at.desc())
        .all()
    )

    res = []
    for appointment in result:
        data = util.row_to_dict(appointment)

        # tell user whether appointment is currently full or not
        data["is_full"] = len(appointment.registrants) >= appointment.max_registrants

        res.append(data)
    return jsonify(res)


# Add new appointment for patient or delete patient's existing appointment
@api.route("appointments", methods=["POST", "DELETE"])
@jwt_required()
def add_or_delete_user_appointment():
    id = request.json.get("id")

    # abort if id isn't passed in request
    if not id:
        return abort(HTTPStatus.BAD_REQUEST)

    # abort if appointment with id specified doesn't exist
    appointment = DoctorAppointment.query.get_or_404(id)

    # check whether patient already have such appointment or not
    relationship_is_exists = (
        DoctorAppointment.query.filter(DoctorAppointment.id == id)
        .join(appointment_table)
        .join(User)
        .filter(User.id == current_user.id)
        .first()
    )

    if request.method == "DELETE":
        # abort if patient doesn't have such appointment
        if not relationship_is_exists:
            return abort(HTTPStatus.BAD_REQUEST)

        current_user.appointments.remove(appointment)
        db.session.commit()

        return jsonify(success=True)
    else:
        # abort if user already have appointment added
        if relationship_is_exists:
            return (
                jsonify(error="Patient already have this appointment."),
                HTTPStatus.BAD_REQUEST,
            )

        # abort if appointment registrants is full
        if len(appointment.registrants) >= appointment.max_registrants:
            return jsonify(error="Registrants is full."), HTTPStatus.BAD_REQUEST

        current_user.appointments.append(appointment)
        db.session.commit()
        result = util.row_to_dict(appointment)

        return jsonify(success=True, appointment=result)


# Get user current appointments
@api.route("appointments", methods=["GET"])
@jwt_required()
def get_user_appointments():
    appointments = current_user.appointments
    res = []
    for appointment in appointments:
        data = util.row_to_dict(appointment)

        res.append(data)
    return jsonify(res)


# get user own info
@api.route("user-info")
@jwt_required()
def get_user_data():
    return util.row_to_dict(current_user, ["password"])
