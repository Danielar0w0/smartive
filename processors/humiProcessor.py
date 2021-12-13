# A Work Queue used to distribute all the different data among multiple workers (processors)
# Advantages: Easily parallelize work and scale

# By default, RabbitMQ will send each message to the next consumer, in sequence-
# On average every consumer will get the same number of messages.
# This way of distributing messages is called round-robin.

# docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.9-management

import pika
import json

connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='localhost'))
channel = connection.channel()

# When RabbitMQ quits or crashes, it won't forget the queue
channel.queue_declare(queue='humidity_queue', durable=True)
print('[*] Waiting for messages. To exit press CTRL+C')

def callback(ch, method, properties, body):
    print("[x] Received %r" % body.decode())

    jsonObj = json.loads(body.decode())
    
    if "value" in jsonObj:
        print(jsonObj["value"])
    else:
        print("Invalid format!")

    print("[x] Done")

    # An ack() is sent back to tell RabbitMQ that the message has been received, processed and that RabbitMQ is free to delete it
    ch.basic_ack(delivery_tag=method.delivery_tag)

# Don't give more than one message to a worker at a time
channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='humidity_queue', on_message_callback=callback)

channel.start_consuming()