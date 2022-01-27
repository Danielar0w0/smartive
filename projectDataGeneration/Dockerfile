FROM python:3.8-slim-buster
RUN pip install --upgrade pip


WORKDIR /
COPY . .

ENV ADMIN_AUTH_TOKEN=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY0MzI2MTg3NSwiaWF0IjoxNjQzMjQzODc1fQ.pAggiHxBsUu3rtN3qsvLSIUWWFiJ9Hjwn5IJnfIX-tRTLIiabOiphpj24uX1vyO06V2n-JrC8S9TvMwp2f_9oQ
ENV API_ADDRESS=http://172.18.0.3
ENV API_PORT=8080
ENV RABBITMQ_ADDRESS=172.18.0.7
ENV RABBITMQ_PORT=5672
ENV RABBITMQ_USER=test
ENV RABBITMQ_PASS=test

RUN pip install -r requirements.txt
RUN chmod a+x run.sh
CMD [ "./run.sh"]
