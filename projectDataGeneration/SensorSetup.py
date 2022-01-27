from apiHandler import ApiHandler
import pika
from multiprocessing import Process
import os
from bson import ObjectId
import time
import requests

process_list = []
id_list = []

api_handler = ApiHandler()

def main_func():
    
    middleware_devices = api_handler.getMiddlewareSensors()

    if middleware_devices is not None:

        for item in middleware_devices:
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
    p.start()
    p = Process(target=createProcessor, args=(ObjectId(), sensor))
    p.start()
    sensor = "humi"
    p = Process(target=createProcessor, args=(ObjectId(), sensor))
    p.start()
    p = Process(target=createProcessor, args=(ObjectId(), sensor))
    p.start()

    while(True):
        time.sleep(30)

        middleware_devices = api_handler.getMiddlewareSensors()

        if middleware_devices is not None:

            for item in middleware_devices:
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
