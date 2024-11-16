FROM python:3.13-slim

ENV POETRY_HOME=/opt/poetry
ENV POETRY_VIRTUALENVS_CREATE=false
ENV PATH="$POETRY_HOME/bin:$PATH"

# Install Poetry
RUN apt-get update && apt-get install -y curl
RUN curl -sSL https://install.python-poetry.org | python -

# Install Python runtime dependencies
WORKDIR /app
COPY pyproject.toml poetry.lock ./
RUN poetry install --no-root

# Install application
COPY . .
RUN poetry install --only main

EXPOSE 5001

CMD ["python3", "server.py"]