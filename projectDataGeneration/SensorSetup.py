import pika
from multiprocessing import Process
import os
from bson import ObjectId
import time
import requests

process_list = []
id_list = []
token = None

def main_func():
    # fazer login para api, receber resposta, retirar token de resposta, guardar token em variavel global?, meter token no header sempre que faço call ao api
    #authHeader = { 'Authorization': 'Bearer ' + token }
    login_account = {"username":"PLACEHOLDER", "password": "PLACEHOLDER"}
    login = requests.post("http://172.18.0.3:8080/public/login", json=login_account, headers={ 'Authorization': ''}, timeout=5)

    response = login.json()                             #confirmar se resposta vem em json
    token_not_trimmed = response["token"]                           #confirmar se o token tem como nome token ou outra cena tipo authToken
    token = str(token_not_trimmed).replace('"', '').replace('\"','').strip()

    request = requests.get("http://172.18.0.3:8080/middleware/devices/sensors", headers={ 'Authorization': 'Bearer ' + token })
    
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
        request = requests.get("http://172.18.0.3:8080/middleware/devices/sensors", headers={ 'Authorization': 'Bearer ' + token })
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
