import os

from flask_cors import CORS
from openai import OpenAI
import connexion

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def create_app():
    # Initialize the Flask app
    app = connexion.App(__name__, specification_dir='./')
    app.add_api('openapi.yaml')

    # Configure CORS to allow requests from specific origins
    CORS(app.app)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000)
