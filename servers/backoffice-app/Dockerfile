FROM python:3.8-slim
RUN pip3 install --no-cache-dir --upgrade \
    pip==21.3.1 \
    virtualenv \
    setuptools \
    wheel

RUN mkdir /app
COPY requirements.txt /app
WORKDIR /app
ENV VIRTUAL_ENV=/home/appuser/venv
RUN virtualenv ${VIRTUAL_ENV}
RUN pip install -r requirements.txt
COPY . /app

EXPOSE 8501
ENTRYPOINT ["streamlit", "run", "main.py", "prod"]
