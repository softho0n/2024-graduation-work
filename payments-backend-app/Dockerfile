FROM python:3.8-slim

RUN mkdir /tmp/backend
WORKDIR /tmp/backend

COPY *.py .
COPY requirements.txt .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt
EXPOSE 1398
ENTRYPOINT [ "uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "1398"]
