import pika

connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='172.18.0.6'))
channel = connection.channel()

channel.queue_declare(queue='humidity_queue', durable=True)

message = '{"id": "61b3241532f6c61ab2a15b63", "value": 30}'
channel.basic_publish(
    exchange='',
    routing_key='humidity_queue',
    body=message,
    properties=pika.BasicProperties(
        delivery_mode=pika.spec.PERSISTENT_DELIVERY_MODE
    ))
print(" [x] Sent %r" % message)
connection.close()
