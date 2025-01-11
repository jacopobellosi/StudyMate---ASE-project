**Text Summarization API with Ollama**
======================================

This repository provides a lightweight and efficient microservice for text summarization using the Ollama platform. The API enables users to generate either **detailed** or **short** summaries of input text, leveraging the capabilities of the llama3 model.    

**Getting Started**
-------------------


    

### **Installation**

1.  Build the component by using docker ( is gonna take a long time):
```bash
docker compose up --build
```
    

### **Usage**


1.  The API will be available at:
```bash
http://localhost:8000/summarize
```    
is necessary to send with two parameters:
request:str and percentage:float 

**How It Works**
----------------

This microservice leverages the **Ollama** platform and the llama3 model for text summarization. Depending on the length parameter, the service dynamically adjusts the summarization process to meet the user's requirements.
