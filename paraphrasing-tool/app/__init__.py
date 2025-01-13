from flask import Flask
from flask_cors import CORS


def create_app():
    # Initialize the Flask app
    app = Flask(__name__)

    # Configure CORS to allow requests from specific origins
    CORS(app)

    # Import configuration
    from .config import Config

    app.config.from_object(Config)

    # Import the main blueprint
    from .main import main as main_blueprint

    app.register_blueprint(main_blueprint)

    return app
