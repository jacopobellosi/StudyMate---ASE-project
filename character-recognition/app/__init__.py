from flask import Flask


def create_app(test_config=None):
    app = Flask(__name__)

    if test_config:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    @app.route("/hello")
    def hello():
        return "Hello, World!"

    return app
