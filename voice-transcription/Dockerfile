FROM python:3.13-slim

RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y ffmpeg

RUN pip install poetry==1.8.5

COPY . .

RUN poetry install

CMD ["poetry", "run", "uvicorn", "app:app", "--host", "0.0.0.0", "--reload"]

# # Poetry's configuration:
# ENV 
#   POETRY_NO_INTERACTION=1 \
#   POETRY_VIRTUALENVS_CREATE=false \
#   POETRY_CACHE_DIR='/var/cache/pypoetry' \
#   POETRY_HOME='/usr/local'
#   POETRY_VERSION=1.8.5

# # System deps:
# RUN curl -sSL https://install.python-poetry.org | python3 -

# # Copy only requirements to cache them in docker layer
# WORKDIR /code
# COPY poetry.lock pyproject.toml /code/

# # Project initialization:
# RUN poetry install $(test "$YOUR_ENV" == production && echo "--only=main") --no-interaction --no-ansi

# # Creating folders, and files for a project:
# COPY . /code
