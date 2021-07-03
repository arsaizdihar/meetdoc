from flask import Flask, Blueprint
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import BaseConfig
from models import db, User
from routes.api import api
import wtforms_json
import os

app = Flask(__name__)

# set up app config
app.config.from_object(BaseConfig)

jwt = JWTManager(app)

# Api blueprint routes with prefix
app.register_blueprint(api, url_prefix="/api")
db.init_app(app)
cors = CORS(app)

# Enable wtforms to parse from request json
wtforms_json.init()

# initialize models
with app.app_context():
    db.create_all()


# set data to pass in jwt
@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id


# function to load user object from jwt identity
@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.get(identity)


if __name__ == "__main__":
    PORT = os.environ.get("PORT", 5000)
    app.run(port=PORT)
