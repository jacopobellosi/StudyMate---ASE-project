from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import ollama
from ollama import Options
app = FastAPI()


# Modello per la richiesta
class SummaryRequest(BaseModel):
    text: str
    style: str


# Endpoint principale
@app.post("/summarize/")
async def summarize(request: SummaryRequest):
    try:

        length = request.style.lower()  # "detailed" or "short"
        if length not in ["detailed", "short"]:
            raise HTTPException(status_code=400, detail="Length parameter must be 'detailed' or 'short'.")

        if length == "detailed":
            prompt = (
                "Summarize the following text into a detailed summary that retains all key information "
                "and reduces the length by approximately 50%. Maintain the original tone, style, and meaning.\n\n"
                f"Text: {request.text}"
            )
        elif length == "short":
            prompt = (
                "Summarize the following text into a short summary that condenses the content by approximately 70%. "
                "Focus only on the most essential information while maintaining the tone and style of the original.\n\n"
                f"Text: {request.text}"
            )
        else:
            raise HTTPException(status_code=400, detail="Length parameter must be 'detailed' or 'short'.")

        # Chiamata a Ollama
        response = ollama.generate(model='llama3.2', prompt=prompt,
                                   options= Options(temperature=0.0,top_k = 20,top_p = 0.5),
                                   system="""Full context:
                                            You are an expert text summarizer designed to create summaries based on the specified length preferences. Your task is to generate accurate and concise summaries while adhering to the following rules:

                                            1. **Length Options**: The user will specify the length as either:
                                               - `"detailed"`: Create a detailed summary that retains all key information, reducing the original text by approximately 50%.
                                               - `"short"`: Create a much shorter summary, condensing the original text by approximately 70%, while retaining only the most essential information.
                                            2. **Tone and Style**: Maintain the original tone and style of the input text. Ensure the summary feels cohesive and natural.
                                            3. **Structure**: Write the summary as a single paragraph without using lists, bullet points, or formatting changes.
                                            4. **Focus**: Highlight the core meaning and remove irrelevant or redundant details. For `"short"`, prioritize brevity over detailed explanations.
                                            
                                            Example:
                                            - Input: "Quantum computing uses qubits, which can be in superposition, allowing quantum computers to perform computations faster than traditional computers in some cases."
                                              - **Detailed Summary**: "Quantum computing uses qubits, which leverage superposition to perform faster computations than traditional computers."
                                              - **Short Summary**: "Quantum computing uses qubits for faster problem-solving."
                                            
                                            Always follow these principles unless explicitly instructed otherwise.

                                            """



                                   )

        # Estrai e restituisci il risultato
        return {"summary": response['response']}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
