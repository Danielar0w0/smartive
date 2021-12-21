FROM python:3.8-slim-buster
RUN pip install --upgrade pip


WORKDIR /

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

RUN chmod a+x run.sh
CMD [ "./run.sh"]