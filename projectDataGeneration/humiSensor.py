import sys
import time
import random
import pika
import json

class humiSensor:
    def __init__(self, id, start_humi = None, sleep_time = 10):
        if start_humi != None:
            self.base_humi = start_humi
        else:
            self.base_humi = random.uniform(65,75)
        self.sleep_time = sleep_time
        self.type = "Humidity"
        self.id = id
        self.value = self.base_humi
        self.connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
        self.channel = self.connection.channel()
        self.queue = 'humidity_queue'
        self.channel.queue_declare(queue=self.queue, durable=True)

    def run(self):
        humi = self.base_humi
        while True:
            humi_change = random.random() / 4    #variação de humidade
            chance = random.random()             
            humi_dif = humi-self.base_humi      #diferença entre humidade inicial e humidade atual
            up_or_down = (0.5 + (0.5 * (humi_dif/3)))     #regra dos 3 simples para ter uma diferença máxima de 3 da base_humi

            #Exemplo:
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
            print(self.value)
            message = {"id":self.id, "value":self.value}
            self.channel.basic_publish(
                exchange = '',
                routing_key = self.queue, 
                body = json.dumps(message),
                properties=pika.BasicProperties(delivery_mode=pika.spec.PERSISTENT_DELIVERY_MODE),
            )
            time.sleep(self.sleep_time)
    


if __name__ == '__main__':
    id = sys.argv[0]
    temp = humiSensor(id)
    temp.run()

    #humi = humiSensor(1,None,1)
    #humi.run() 
    