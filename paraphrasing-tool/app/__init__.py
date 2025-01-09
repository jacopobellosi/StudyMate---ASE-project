from flask import Flask

def create_app():
    app = Flask(__name__)

    # Import configuration
    from .config import Config
    app.config.from_object(Config)

    # Import the main blueprint
    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app
