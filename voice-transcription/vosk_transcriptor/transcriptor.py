import vosk
import wave
import sys
import json
from os import remove
from .utils.ffmpeg_util import convert_std_wav

vosk.SetLogLevel(-1)  # not interested in logs
model = vosk.Model(lang="en-us")

# recognizer
rec = vosk.KaldiRecognizer(model, 16000)


def _convert(filepath):
    conv_file = convert_std_wav(filepath)
    return conv_file


def _check_file(filepath):
    wf = wave.open(filepath, "rb")
    if wf.getnchannels() != 1 or wf.getsampwidth() != 2 or wf.getcomptype() != "NONE":
        print("Audio file must be WAV format mono PCM.")
        sys.exit(1)


def _predict(filepath):
    with wave.open(filepath) as wf:
        resp = ""

        while True:
            data = wf.readframes(4000)
            if len(data) == 0:
                break
            if rec.AcceptWaveform(data):
                resp += json.loads(rec.Result())["text"] + " "
            else:
                pass
                # print(json.loads(rec.PartialResult()))

        resp += json.loads(rec.FinalResult())["text"]
        # print(resp)
        return resp


def transcribe(filepath):
    _conv_file = _convert(filepath)
    _check_file(_conv_file)  # making sure file is in correct format after conversion
    prediction = _predict(_conv_file)

    # deleting converted file
    remove(_conv_file)

    return prediction
