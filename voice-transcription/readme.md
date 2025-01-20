# Transcriptfy
A microservice built using FastAPI for transcribing audio files. Currently, it supports transcribing English only using a model called `Vosk`. FFmpeg is used for converting audio files to a Vosk-supported format.


## Running using Docker:
#### Building an image:
within voice-transcription directory run `docker build -t voice-transcription:latest .`
#### Running the image on port `8000`:
`docker run -d -p 8000:8000 --name transcriptify voice-transcription:latest`

## Running Locally
### Installing required libraries:
 1. You need to have [Poetry](https://python-poetry.org/docs/) installed.
 2. You need to have [FFmpeg](https://www.ffmpeg.org/download.html) available in the system path
 2. within the `voice-transcription` directory, **run:** `poetry install` 

### To run the application:
 within the `voice-transcription` directory, **run:** `poetry run uvicorn app:app --host 0.0.0.0 --reload` 
 
### Code formatting
This project uses black as code formatter, to run the formatter:
`poetry run black .`

### Endpoint testing
For automating endpoint tests, pytest was used and tests can be found on `./tests/test_endpoints.py`
**To run the tests:**
- If server is running locally: `cd` to `tests` directory, then run `pytest -v`
- If running a docker image: `docker run --rm voice-transcription bash -c "poetry run pytest tests"`

Also, `Postman` is used as follows:

- `GET /`
![GET request](/voice-transcription/endpoint_testing/screenshots/get1.png "Title")

- `POST /transcribe` (using a .wav file)
![POST request](/voice-transcription/endpoint_testing/screenshots/post1.png "Title")

- `POST /transcribe` (using a .ogg file)
![POST request](/voice-transcription/endpoint_testing/screenshots/post2.png "Title")

## Microservice Description
### Main libraries used
- backend: `FastAPI`
- Model: `Vosk`


### Vosk:

Vosk is a speech recognition toolkit.

- It supports 20+ languages and dialects - English, Indian English, German, French, Spanish, Portuguese, Chinese, Russian, Turkish, Vietnamese, Italian, Dutch, Catalan, Arabic, Greek, Farsi, Filipino, Ukrainian, Kazakh, Swedish, Japanese, Esperanto, Hindi, Czech, Polish, Uzbek, Korean, Breton, Gujarati, Tajik.

- Works offline, even on lightweight devices - Raspberry Pi, Android, iOS

#### Variants of Vosk

| Variant | Size | Description |
|---|---|---|
| vosk-model-small-en-us-0.15 | 40M | Lightweight wideband model for Android and RPi |
| vosk-model-en-us-0.22 | 1.8G | Accurate generic US English model |

---

### Open Source Notice
This microservice uses (but doesn't distribute) FFmpeg for converting audio formats


## TODO

- take params for language and model size as input
- unit testing using pytest
- ~~code documentation~~
- github precommits
- ~~black~~
- ~~poetry~~
- ~~maybe docker~~
- ~~standardize file input format~~