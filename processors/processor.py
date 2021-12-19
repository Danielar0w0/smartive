# A Work Queue used to distribute all the different data among multiple workers (processors)
# Advantages: Easily parallelize work and scale

# By default, RabbitMQ will send each message to the next consumer, in sequence.
# On average every consumer will get the same number of messages.
# This way of distributing messages is called round-robin.

# docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.9-management

import pika
import json
import requests
import sys

# REST API
api_url = "localhost:8080/middleware/device/sensor"

def main():

    # Check if the user has provided the correct number of arguments
    if len(sys.argv) < 2:
        print("Usage: python processor.py <queue>")
        sys.exit(1)
    queue = sys.argv[1]    

    connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='localhost'))
    channel = connection.channel()

    # When RabbitMQ quits or crashes, it won't forget the queue
    channel.queue_declare(queue=queue, durable=True)
    print(' [*] Waiting for messages. To exit press CTRL+C')

    # Don't give more than one message to a worker at a time
    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue=queue, on_message_callback=callback)

    try:
        channel.start_consuming()
    finally:
        # Close the channel when it is no longer needed
        print(" [x] Closed channel")
        channel.close()
        

def callback(ch, method, properties, body):

    print(" [x] Received %r" % body.decode())

    # Update sensor state
    # data = json.loads(body.decode())
    # updateState(data)

    print(" [x] Done")

    # An ack() is sent back to tell RabbitMQ that the message has been received, processed and that RabbitMQ is free to delete it
    ch.basic_ack(delivery_tag=method.delivery_tag)
    
    
def updateState(data):
    
    # Default value
    sensor = {}

    # Obtain deviceId and deviceState
    if "id" in data and "value" in data:
        sensor = {"deviceId": data["id"], "state": {"value": data["value"], "unit": "%"}}

    # The keyword json automatically sets the request’s HTTP header Content-Type to application/json
    response = requests.put(api_url, json=sensor)
    print(response["message"])
    

if __name__ == '__main__':
    main()