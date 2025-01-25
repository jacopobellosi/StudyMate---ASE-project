FROM python:3.8-slim

COPY . .

RUN pip3 install -r requirements.txt

CMD ["uvicorn", "app:app", "--port", "8001", "--host", "0.0.0.0", "--reload"]
