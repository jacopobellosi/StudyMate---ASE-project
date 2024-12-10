# Transcriptfy
A microservice for transcribing audio files. Currently, it supports English only.

### Installing required libraries:
 1. You need to have [poetry](https://python-poetry.org/docs/) installed.
 2. within the `voice-transcription` directory, **run:** `poetry install` 

### To run the application:
 within the `voice-transcription` directory, **run:** `poetry run uvicorn app:app --reload` 
 
### Code formatting
This project uses black as code formatter, to run the formatter:
`poetry run black .`


### Main libraries used
- backend: `FastAPI`
- Model: `Vosk`


## Vosk:

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