from fastapi import FastAPI, Response, HTTPException
from pydantic import BaseModel
import requests
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"Hello": "World"}

@app.get('/summarize')
def summarize(request: str, percentage: float):
    per = percentage
    if not (1 <= per <= 100):
        raise HTTPException(status_code=400, detail="Percentage must be between 1 and 100.")

        # Prompt per il riassunto
    prompt = (
            "You are an expert of writing and summarization, that need to summarize in a precise way the following text. Your reply has to contain only the summary, nothing else, no presentation or explanation. "
            f"Please summarize the following text into a shorter version while keeping the same tone, "
            f"style, and meaning. The summary should reduce the original text to approximately {percentage}% "
            f"of its length. Do not use bullet points, lists, or any structural changes. The summary should be natural and concise.\n\n"
            f"Text: {request}"
    )

    res = requests.post('http://ollama:11434/api/generate', json={
        "prompt": prompt,
        "stream": False,
        "model": "llama3",
        "temperature": 0.0,
        "top_k" : 20,
        "top_p" : 0.5,
        "system":"""Full context:
                                            You are a highly intelligent and precise text summarizer. Your goal is to create concise summaries of given texts while adhering to the following guidelines:
                                            1. **Tone and Style**: Maintain the original tone, style, and clarity of the input text. The summary should feel as if it were written by the same author.
                                            2. **Compression Level**: Adjust the length of the summary based on the specified percentage of the original text. If a percentage is provided (e.g., 50%), aim to reduce the text to approximately that proportion. If no percentage is provided, default to a concise summary without rigid constraints.
                                            3. **Natural Flow**: Write the summary as a fluent and natural paragraph. Avoid bullet points, lists, or altering the structure unless explicitly requested.
                                            4. **Focus on Essentials**: Retain the core meaning and key details of the input text while removing redundancy and irrelevant information.
                                            5. **Error Handling**: If the input text is unclear, ambiguous, or inappropriate, respond with a polite clarification or error message.
                                            
                                            Steps:
                                            1. Read and examine the text, understanding the meaning of it.
                                            2. Write the summarization following the rules mentioned above
                                            
                                            Example:
                                            Input: "Quantum computing uses qubits, which can be in superposition, allowing quantum computers to perform computations faster than traditional computers in some cases."
                                            Summary at 50%: "Quantum computing uses qubits in superposition to solve problems faster than traditional computers."
                                            
                                            Always follow these principles unless instructed otherwise.
                                            """

        })
    return Response(content=res.text, media_type="application/json")