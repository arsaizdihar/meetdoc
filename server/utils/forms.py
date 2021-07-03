from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, IntegerField
from wtforms.validators import DataRequired, Email, Length, NumberRange
from wtforms.fields.html5 import DateTimeLocalField


class RegisterForm(FlaskForm):
    first_name = StringField(
        "First Name", validators=[DataRequired(), Length(min=4, max=30)]
    )
    last_name = StringField(
        "Last Name", validators=[DataRequired(), Length(min=4, max=30)]
    )
    email = StringField("Email", validators=[DataRequired(), Email()])
    password = PasswordField("Password", validators=[DataRequired(), Length(min=6)])
    age = IntegerField(
        "Age",
        validators=[DataRequired(), NumberRange(min=0, max=100, message="Invalid age")],
    )


class LoginForm(FlaskForm):
    email = StringField("Email", validators=[DataRequired(), Email()])
    password = PasswordField("Password", validators=[DataRequired()])


class DoctorAppointmentForm(FlaskForm):
    doctor_name = StringField("Doctor Name", validators=[DataRequired()])
    description = StringField("Description", validators=[DataRequired()])
    max_registrants = IntegerField(
        "Max Registrants", validators=[DataRequired(), NumberRange(min=1)]
    )


def get_form_errors(form):
    """
    Get only the first error of each field errors
    """
    res = {}
    for field, errors in form.errors.items():
        res[field] = errors[0]
    return res
