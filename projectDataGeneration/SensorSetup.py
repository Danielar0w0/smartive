import pika
from multiprocessing import Process
import os
import requests


def first_setup():
    request = requests.get("localhost:8080/api/devices/sensors")
    print(request.json)

    for item in request.json:
        if item["category"] == "TEMPERATURE":
            p = Process(target=createProcessor, args="temp")
        elif item["category"] == "HUMIDITY":
            p = Process(target=createProcessor, args="humi")
        
        p.start()
                                #temp/humi
def createProcessor(processorID, sensor):
    os.system('python3 ' + sensor +  'Sensor.py ')

if __name__ == "__main__":
    first_setup()
