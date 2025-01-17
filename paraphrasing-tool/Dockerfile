# Use the official Python image from the Docker Hub
FROM python:3.13-slim

ENV POETRY_HOME=/opt/poetry
ENV POETRY_VIRTUALENVS_CREATE=false
ENV PATH="$POETRY_HOME/bin:$PATH"

# Install Poetry
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Poetry (pinned version)
RUN curl -sSL https://install.python-poetry.org | python - --version 1.6.1

# Set the working directory in the container to /app
WORKDIR /app

# Copy the requirements file and install dependencies first
COPY pyproject.toml poetry.lock ./
RUN poetry install --no-root

# Copy the rest of the application code
COPY . /app

# Expose port 5000 for the Flask app to be accessible
EXPOSE 5000

# Expose port 8080 for OpenAPI
EXPOSE 8080

# Run run.py when the container launches
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "run:app"]
