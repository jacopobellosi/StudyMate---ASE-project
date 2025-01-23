import logging
from flask import Flask
from flask_cors import CORS

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def create_app():
    # Initialize the Flask app
    app = Flask(__name__)
    CORS(app)

    from .config import Config
    app.config.from_object(Config)

    # Import the main blueprint
    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000)