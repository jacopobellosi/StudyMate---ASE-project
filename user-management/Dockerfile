# Use Python 3.13-slim as the base image
FROM python:3.13-slim

# Set the working directory
WORKDIR /app

# Copy the Poetry configuration files
COPY pyproject.toml poetry.lock ./

# Install Poetry
RUN pip install poetry

# Update the lock file
RUN poetry lock

# Install the dependencies
RUN poetry install --no-root

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Command to run the FastAPI application
CMD ["poetry", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "5000"]