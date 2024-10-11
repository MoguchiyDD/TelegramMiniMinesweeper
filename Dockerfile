FROM python:3.10

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y

COPY requirements.txt /usr/src/app/requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

COPY /keys/ /etc/nginx/keys/
COPY /nginx/nginx.conf /etc/nginx/nginx.conf
COPY /server/ /usr/src/app/server/
COPY manage.py /usr/src/app/manage.py

EXPOSE 5000

CMD ["gunicorn", "--certfile=/etc/nginx/keys/cert.pem", "--keyfile=/etc/nginx/keys/key_no_pass.pem", "--bind", "0.0.0.0:5000", "manage:app"]
