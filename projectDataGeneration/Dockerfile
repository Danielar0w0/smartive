FROM python:3.8-slim-buster
RUN pip install --upgrade pip


WORKDIR /
COPY . .

ENV ADMIN_AUTH_TOKEN=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY0MzI3NzA0OSwiaWF0IjoxNjQzMjU5MDQ5fQ.GvPIT1mSiWzhfPp4rfUmORiLP-4qlR3xBB3pfukAsOmnkMnD-ysUNBa9vmKRh-zF0RHqwnAzeEUXE5ELtzKLZw
ENV API_ADDRESS=http://172.18.0.3
ENV API_PORT=8080
ENV RABBITMQ_ADDRESS=172.18.0.7
ENV RABBITMQ_PORT=5672
ENV RABBITMQ_USER=test
ENV RABBITMQ_PASS=test

RUN pip install -r requirements.txt
RUN chmod a+x run.sh
CMD [ "./run.sh"]
