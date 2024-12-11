# Use the official Python image from the Docker Hub
FROM python:latest

# Set the working directory in the container to /app
WORKDIR /app

# Copy the requirements file and install dependencies first
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . /app

# Expose port 5000 for the Flask app to be accessible
EXPOSE 5000

# Run run.py when the container launches
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "run:app"]
