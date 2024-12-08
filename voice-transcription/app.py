# pip install fastapi[standard]
# pip install python-multipart
# run: fastapi dev app.py (OR)
# run: uvicorn app:app --reload

from vosk_transcriptor.transcriptor import transcribe
from fastapi import FastAPI, File, UploadFile

app = FastAPI()

@app.get("/")
async def read_root():
    return "Transcriptify running"

@app.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    try:
        contents = file.file.read()
        filepath = f"./audio_files/rcvd_{file.filename}"
        with open(filepath, 'wb') as f:
            f.write(contents)
    except Exception:
        raise HTTPException(status_code=500, detail='Something went wrong')
    finally:
        file.file.close()

    prediction = transcribe(filepath)

    return {"status": "success",
            "text": prediction}