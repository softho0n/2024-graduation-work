FROM python:3.8-slim

RUN mkdir /tmp/backend
WORKDIR /tmp/backend

COPY ./ ./

RUN pip install --upgrade pip
RUN pip install -r requirements.txt
EXPOSE 1398
ENV ENVIRONMENT=prod

ENTRYPOINT ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "1398"]
