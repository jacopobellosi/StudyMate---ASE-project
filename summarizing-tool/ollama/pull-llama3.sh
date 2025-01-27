#!/bin/sh

# Start the Ollama server in the background
./bin/ollama serve &

# Capture the process ID of the background task
pid=$!

# Wait for a few seconds to ensure the server starts
sleep 10

echo "Pulling llama 3 model"
ollama pull llama3


# Wait for the server process to finish
if kill -0 $pid 2>/dev/null; then
    wait $pid
else
    echo "The Ollama server process ($pid) has already terminated."
fi