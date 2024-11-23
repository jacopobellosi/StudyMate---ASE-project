FROM python:3.13-slim

ENV POETRY_HOME=/opt/poetry
ENV POETRY_VIRTUALENVS_CREATE=false
ENV PATH="$POETRY_HOME/bin:$PATH"

# Install Poetry
RUN apt-get update && apt-get install -y  \
    tesseract-ocr \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Poetry (pinned version)
RUN curl -sSL https://install.python-poetry.org | python - --version 1.6.1

# Install Python runtime dependencies
WORKDIR /app
COPY pyproject.toml poetry.lock ./
RUN poetry install --no-root

# Install application
COPY . .

EXPOSE 5001

CMD  ["python3", "server.py"]