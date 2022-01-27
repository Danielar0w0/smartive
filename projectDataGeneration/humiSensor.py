import sys
import os
import time
import random
import pika
import json


class humiSensor:

    def __init__(self, id, start_humi=None, sleep_time=10):

        self.rabbitmq_address = os.environ.get('RABBITMQ_ADDRESS')
        self.rabbitmq_port = os.environ.get('RABBITMQ_PORT')
        self.rabbitmq_user = os.environ.get('RABBITMQ_USER')
        self.rabbitmq_pass = os.environ.get('RABBITMQ_PASS')

        if start_humi != None:
            self.base_humi = start_humi
        else:
            self.base_humi = random.uniform(65, 75)
        self.sleep_time = sleep_time
        self.type = "Humidity"
        self.id = id
        self.value = self.base_humi
        self.unit = "%"
        # Not sure if values are like real life, unit is Watts per hour
        self.power = random.uniform(30, 40)
        self.credentials = pika.PlainCredentials(self.rabbitmq_user, self.rabbitmq_pass)
        self.connection = pika.BlockingConnection(pika.ConnectionParameters(
            host=self.rabbitmq_address, port=self.rabbitmq_port, credentials=self.credentials))
        #self.connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost',port=5672, credentials=self.credentials))

        self.channel = self.connection.channel()
        self.queue = 'humidity_queue'
        self.channel.queue_declare(queue=self.queue, durable=True)

    def run(self):
        humi = self.base_humi
        while True:
            humi_change = random.random() / 4  # variação de humidade
            chance = random.random()
            humi_dif = humi-self.base_humi  # diferença entre humidade inicial e humidade atual
            # regra dos 3 simples para ter uma diferença máxima de 3 da base_humi
            up_or_down = (0.5 + (0.5 * (humi_dif/3)))

            # Exemplo:
            #           base_humi = 13  humi = 14.5 humi_dif = -1.5 max_dif = 3
            #           1 --------- 3
            #           x --------- -1.5    -->  (-1.5*1)/3 = -0.5
            #           up_or_down = 0.5 + (0.5*-0.5) = 0.25
            # Quando a dif é 3, x vai ser 1, logo up_or_down = 0.5 + 0.5*1 = 1
            # Quando a dif é -3, x vai ser -1, logo up_or_down = 0.5 + 0.5*-1 = 0

            if chance > up_or_down:
                humi = humi + humi_change
            else:
                humi = humi - humi_change

            self.value = humi
            power = ((self.power / 60)/60) * self.sleep_time
            print(power)
            print(self.value)
            message = {"id": self.id, "value": self.value,
                       "power": power, "unit": self.unit}
            self.channel.basic_publish(
                exchange='',
                routing_key=self.queue,
                body=json.dumps(message),
                properties=pika.BasicProperties(
                    delivery_mode=pika.spec.PERSISTENT_DELIVERY_MODE),
            )
            time.sleep(self.sleep_time)


if __name__ == '__main__':
    id = sys.argv[1]
    temp = humiSensor(id)
    temp.run()

    """humi = humiSensor(1,None,1)
    humi.run()"""
