# pip install vosk

import vosk
import wave
import sys
import json

# model downloaded from: https://alphacephei.com/vosk/models

vosk.SetLogLevel(-1) # not interested in logs
model = vosk.Model(lang="en-us")

# recognizer
rec = vosk.KaldiRecognizer(model, 16000)

def _check_file(file_path):
    wf = wave.open(file_path, "rb")
    if wf.getnchannels() != 1 or wf.getsampwidth() != 2 or wf.getcomptype() != "NONE":
        print("Audio file must be WAV format mono PCM.")
        sys.exit(1)

def _predict(file_path):
    with open(file_path, "rb") as wf:
        wf.read(44) # skip header

        resp = ""

        while True:
            data = wf.read(4000)
            if len(data) == 0:
                break
            if rec.AcceptWaveform(data):
                res = json.loads(rec.Result())
                resp += res["text"]

        # res = json.loads(rec.FinalResult())

        return resp

def transcribe(filepath):
    _check_file(filepath)
    prediction = _predict(filepath)
    return prediction