import pika
from multiprocessing import Process
import os
from bson import ObjectId
import time
import requests

process_list = []
id_list = []

def main_func():
    request = requests.get("http://172.18.0.2:8080/api/devices/sensors")
    
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
        print(item["deviceId"])
    
    #Processos extra que podem ser adicionados
    sensor = "temp"
    p = Process(target=createProcessor, args=(ObjectId(), sensor))
    p = Process(target=createProcessor, args=(ObjectId(), sensor))
    sensor = "humi"
    p = Process(target=createProcessor, args=(ObjectId(), sensor))
    p = Process(target=createProcessor, args=(ObjectId(), sensor))

    while(True):
        time.sleep(30)
        request = requests.get("http://172.18.0.2:8080/api/devices/sensors")
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
                print(item["deviceId"])

def createProcessor(processorID, sensor):
    print('python3 ' + sensor +  'Sensor.py ' + str(processorID))
    os.system('python3 ' + sensor +  'Sensor.py ' + str(processorID))

if __name__ == "__main__":
    main_func()
