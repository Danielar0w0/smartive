import pika
from multiprocessing import Process
import os
import time
import requests

process_list = []
id_list = []

def main_func():
    request = requests.get("http://localhost:8080/api/devices/sensors")
    
    for item in request.json():
        if item["category"] == "TEMPERATURE":
            sensor = "temp"
            p = Process(target=createProcessor, args=(item["deviceId"], sensor))
        elif item["category"] == "HUMIDITY":
            sensor = "humi"
            p = Process(target=createProcessor, args=(item["deviceId"], sensor))
        p.start()
        process_list.append(p)
        id_list.append(item["deviceId"])

    while(True):
        time.sleep(60)
        request = requests.get("http://localhost:8080/api/devices/sensors")
        for item in request.json():
            if item["deviceId"] not in id_list:
                if item["category"] == "TEMPERATURE":
                    sensor = "temp"
                    p = Process(target=createProcessor, args=(item["deviceId"], sensor))
                elif item["category"] == "HUMIDITY":
                    sensor = "humi"
                    p = Process(target=createProcessor, args=(item["deviceId"], sensor))
                p.start()
                process_list.append(p)
                id_list.append(item["deviceId"])

def createProcessor(processorID, sensor):
    os.system('python3 ' + sensor +  'Sensor.py ' + str(processorID))

if __name__ == "__main__":
    main_func()
