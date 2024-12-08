## TODO
- standardize file input
- take params for language and model size as input
- add unit testing
- function comments
- black, poetry
- github precommits
- maybe docker?

Required libraries:
```ps1
pip install fastapi[standard]
pip install python-multipart
pip install vosk
```

To run the application:
 `uvicorn app:app --reload` within the `voice-transcription` directory (transcriptify microservice parent directory).

- backend: FastAPI
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


### Open Source Notice
This microservice uses FFmpeg for converting audio formats