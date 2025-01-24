FROM ollama/ollama:latest

COPY ./pull-llama3.sh /pull-llama3.sh

# Ensure the script has the correct permissions
RUN chmod +x /pull-llama3.sh

ENTRYPOINT ["/usr/bin/bash", "/pull-llama3.sh"]