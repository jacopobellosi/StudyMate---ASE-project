from app import create_app

app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True) # TODO: Change to False before deployment, as it shows as a warning in docker logs
