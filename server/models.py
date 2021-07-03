from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()

# many to many relationship table
appointment = db.Table(
    "appointments",
    db.Column("user_id", db.ForeignKey("users.id")),
    db.Column("appointment_id", db.ForeignKey("doctor_appointments.id")),
)


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    is_admin = db.Column(db.Boolean, default=False)
    age = db.Column(db.Integer, nullable=False)
    password = db.Column(db.String(100), nullable=False)

    appointments = db.relationship(
        "DoctorAppointment",
        secondary=appointment,
        order_by="DoctorAppointment.created_at.desc()",
        backref=db.backref("registrants"),
    )

    def __init__(self, first_name, last_name, email, password, age):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email

        # use sha256 to encrypt password
        self.password = generate_password_hash(password, "pbkdf2:sha256", 8)
        self.age = age

    def check_password(self, password):
        # compare password with encrypted password
        return check_password_hash(self.password, password)


class DoctorAppointment(db.Model):
    __tablename__ = "doctor_appointments"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    doctor_name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    max_registrants = db.Column(db.Integer, default=5)
    created_at = db.Column(db.DateTime, nullable=False)

    def __init__(self, doctor_name, description, max_registrants=5):
        self.doctor_name = doctor_name
        self.description = description
        self.max_registrants = max_registrants
        self.created_at = datetime.utcnow()
