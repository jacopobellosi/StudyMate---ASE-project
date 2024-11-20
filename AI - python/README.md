**Text Summarization API with Ollama**
======================================

This repository provides a lightweight and efficient microservice for text summarization using the Ollama platform. The API enables users to generate either **detailed** or **short** summaries of input text, leveraging the capabilities of the llama3.2:1b model.

**Features**
------------

*   **Summarization Modes**:
    
    *   **Detailed**: Generates a detailed summary, reducing the input text length by approximately 50%, while preserving all key information.
        
    *   **Short**: Generates a concise summary, condensing the text by approximately 70%, focusing on the most essential points.
        
*   **Consistent Style**: Ensures the summaries maintain the original tone and style of the input text.
    
*   **Simple API**: Easily integrate the summarization functionality into other systems.
    

**Getting Started**
-------------------

### **Prerequisites**

To run this project locally, ensure you have the following installed:

1.  **Python 3.9+**
    
2.  **Pip** (Python package manager)
    
3.  **Ollama CLI**: Follow the [Ollama installation guide](https://ollama.ai/download) to set up Ollama on your machine.
    
4.  **Docker** (optional, for containerized deployment)
    

### **Installation**

1.  Clone the repository:
    
```bash
git clone https://github.com/../text-summarization-api.gitcd text-summarization-api//when it will became official
```
2.  Install the required Python packages:
```bash
pip install -r requirements.txt
```
3.  Ensure the Ollama CLI is installed and accessible from your environment.
    

### **Usage**

1.  Start the API server:
    
```bash
uvicorn microservice:app --host 0.0.0.0 --port 8000
```
1.  The API will be available at:
```bash
http://localhost:8000
```    

### **API Endpoints**

#### **1\. Summarize Text**

**Endpoint**:
```http
POST /summarize/
```
**Request Body**:
```http
{    "text": "Your input text goes here.",    "length": "detailed"  } 
```
**Parameters**:

*   text (string, required): The text to summarize.
    
*   length (string, required): The summarization mode, either "detailed" or "short".
    

**Example Response**:
```http
 {    "summary": "Quantum computing uses qubits, leveraging superposition to solve problems faster than traditional computers."  }   
```http

**Error Response** (Invalid length parameter):
```http
 {    "detail": "Length parameter must be 'detailed' or 'short'."  } 
```http
**Development and Deployment**
------------------------------

### **Local Development**

For testing and development, run the server locally with uvicorn:
```bash
 uvicorn microservice:app --reload   `
```
**How It Works**
----------------

This microservice leverages the **Ollama** platform and the llama3.2:1b model for text summarization. Depending on the length parameter, the service dynamically adjusts the summarization process to meet the user's requirements.