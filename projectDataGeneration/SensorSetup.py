import pika
from multiprocessing import Process
import os
from bson import ObjectId
import time
import requests

process_list = []
id_list = []

def main_func():
    
    api_address = os.environ.get('API_ADDRESS', 'http://172.18.0.3')
    api_port = os.environ.get('API_PORT', 8080)
    api_url = "{}:{}".format(api_address, api_port)

    request_headers = { 'Authorization': 'Bearer ' + os.environ.get('ADMIN_AUTH_TOKEN'), 'Content-Type': 'application/json' }

    request = requests.get("{}/middleware/devices/sensors".format(api_url), headers=request_headers)

    print(request)

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
        request = requests.get("{}/middleware/devices/sensors".format(api_url), headers=request_headers)
        
        print(request)
        
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
