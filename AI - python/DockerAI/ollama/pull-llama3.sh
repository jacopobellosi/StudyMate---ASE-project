#!/bin/bash
./bin/ollama serve &

pid=$!

sleep 5

echo "Pulling llama 3 model"
ollama pull llama3

wait $pid