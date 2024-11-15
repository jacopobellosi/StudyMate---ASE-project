from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

db = SQLAlchemy()
jwt = JWTManager()


def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"
    app.config["JWT_SECRET_KEY"] = "your_jwt_secret_key"
    db.init_app(app)
    jwt.init_app(app)
    return app
