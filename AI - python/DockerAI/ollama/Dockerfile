FROM ollama/ollama:latest

# Install dos2unix
RUN apt-get update && apt-get install -y dos2unix

COPY ./pull-llama3.sh /pull-llama3.sh
RUN dos2unix /pull-llama3.sh && chmod +x /pull-llama3.sh

CMD ["/pull-llama3.sh"]