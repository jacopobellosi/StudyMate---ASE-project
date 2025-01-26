from app.extractor import extract_text_from_image
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_restx import Resource, Api

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}

def create_app(test_config=None):
    app = Flask(__name__)
    api = Api(app, title="OCR Microservice", version="1.0", description="A simple OCR microservice", doc="/docs")

    CORS(app)
    app.config["MAX_CONTENT_LENGTH"] = 16 * 1000 * 1000

    if test_config:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    @api.route("/extract-text")
    class ExtractText(Resource): 
        def post(self):

            if "file" not in request.files:
                return jsonify({"error": "No file part in the request"}), 400

            file = request.files["file"]

            if file.filename == "":
                return jsonify({"error": "No selected file"}), 400

            if not is_allowed_file(file.filename):
                return jsonify({"error": "Unsupported file type"}), 400

            # Process the image
            try:
                file_bytes = file.read()
                text = extract_text_from_image(file_bytes)
                return jsonify({"extracted_text": text}), 200
            except Exception as e:
                return jsonify({"error": str(e)}), 500

    def is_allowed_file(filename):
        return (
            "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS
        )

    return app
