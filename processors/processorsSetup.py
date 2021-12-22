import pika
from multiprocessing import Process
import time
import os
from math import ceil

queues = ['humidity_queue', 'temperature_queue']

connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='localhost'))
channel = connection.channel()

process_list = {'humidity_queue': [], 'temperature_queue': []}

def first_setup():

    global process_list
    
    for queue in queues:

        response = channel.queue_declare(queue=queue, passive=True)
        
        # Obtain number of current messages and consumers
        messages = response.method.message_count
        consumers = response.method.consumer_count
        
        print(f'Queue {queue} has {messages} messages and {consumers} consumers.')
        
        # Create as many consumers (processors) as messages
        for message in range(messages):

            p = Process(target=createProcessor, args=(queue,))
            print(f'Created a processor for queue {queue}!')
            
            # Start the process
            p.start()

            # Add the alive process to the list
            process_list[queue].append(p)
        
def createProcessor(queue):
    try:
        os.system('python processor.py ' + queue)
    except KeyboardInterrupt:
        pass    

def loop():

    global process_list

    try:

        while True:
            
            time.sleep(20)

            # Remove closed processes from the list
            for queue in process_list.keys():
                for p in process_list[queue]:

                    if not p.is_alive():
                        process_list[queue].remove(p)
            
            # process_list = [p for p in process_list if p.is_alive()]

            for queue in queues:
                
                response = channel.queue_declare(queue=queue, passive=True)

                # Obtain number of current messages and consumers
                messages = response.method.message_count
                consumers = response.method.consumer_count

                print(f'Queue {queue} has {messages} messages and {consumers} consumers.')

                # If the number of processes is way less than the number of messages
                if consumers < messages/2:

                    for i in range(ceil(messages/2 - consumers)):

                        p = Process(target=createProcessor, args=(queue,))
                        print(f'Created a processor for queue {queue}!')

                        # Start the process
                        p.start()
                        process_list[queue].append(p)

                # If the number of processes is way more than the number of messages
                elif consumers > messages:
                        
                    for i in range(consumers - messages):

                        print(f'Closed a processor for queue {queue}!')

                        # Close a process
                        if process_list[queue]:
                            p = process_list[queue].pop()
                            p.terminate()


    except KeyboardInterrupt:
        pass

    finally:
        # Close the connection
        print("Closed connection.")
        connection.close()

        # Close processors
        if process_list:
            for queue in process_list.keys():
                for p in process_list[queue]:
                    p.terminate()   
        
        time.sleep(5)
        print("Closed processors.") 

def main():
    first_setup()
    loop()

if __name__ == "__main__":
    main()