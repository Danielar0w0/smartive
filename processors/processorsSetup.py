import pika
from multiprocessing import Process
import os

# queues = ['humidity_queue', 'temperature_queue']
queues = ['humidity_queue']

connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='localhost'))
channel = connection.channel()

def first_setup():
    
    for queue in queues:

        response = channel.queue_declare(queue=queue, passive=True)
        
        # Obtain number of current messages and consumers
        messages = response.method.message_count
        consumers = response.method.consumer_count
        
        print(f'Queue {queue} has {messages} messages and {consumers} consumers.')
        
        # Create as many consumers (processors) as messages
        for message in range(messages):
            p = Process(target=createProcessor, args=(message, queue))
            
            print(f'Created a processor for queue {queue}!')
            p.start()
        
def createProcessor(processorID, queue):
    os.system('python3 processor.py ' + queue)

if __name__ == "__main__":
    first_setup()