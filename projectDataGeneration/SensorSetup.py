import pika
from multiprocessing import Process
import os
import requests

list = []

def first_setup():
    request = requests.get("http://localhost:8080/api/devices/sensors")
    
    for item in request.json():
        if item["category"] == "TEMPERATURE":
            sensor = "temp"
            p = Process(target=createProcessor, args=(item["deviceId"], sensor))
        elif item["category"] == "HUMIDITY":
            sensor = "humi"
            p = Process(target=createProcessor, args=(item["deviceId"], sensor))
        p.start()
        list.append(p)
    while(True):
        continue #de x em x tempo, ver se a sensores novos e caso haja adicionar
                                #temp/humi
def createProcessor(processorID, sensor):
    os.system('python3 ' + sensor +  'Sensor.py ' + str(processorID))

if __name__ == "__main__":
    first_setup()
