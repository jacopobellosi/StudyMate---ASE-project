from vosk_transcriptor.transcriptor import transcribe
from fastapi import FastAPI, File, UploadFile, HTTPException
from os.path import abspath
from os import remove
import uuid
import pathlib

# initialization code
app = FastAPI()
pathlib.Path("audio_files").mkdir(parents=True, exist_ok=True)
##

@app.get("/")
async def home():
    return "Transcriptify running..."

@app.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    try:
        contents = file.file.read()
        unqiue_file_identifier = str(uuid.uuid1())
        filepath = abspath(f"./audio_files/rcvd_{unqiue_file_identifier}_{file.filename}")
        with open(filepath, 'wb') as f:
            f.write(contents)
    except Exception:
        raise HTTPException(status_code=500, detail='Something went wrong')
    finally:
        file.file.close()

    prediction = transcribe(filepath)

    # deleting stored file
    remove(filepath)

    return {"status": "success",
            "text": prediction}