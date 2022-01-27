# A Work Queue used to distribute all the different data among multiple workers (processors)
# Advantages: Easily parallelize work and scale

# By default, RabbitMQ will send each message to the next consumer, in sequence.
# On average every consumer will get the same number of messages.
# This way of distributing messages is called round-robin.

# docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.9-management

from apiHandler import ApiHandler
import pika
import requests
import json
import sys
import os

categories = {'humidity_queue': 'HUMIDITY', 'temperature_queue': 'TEMPERATURE'}
units = {'humidity_queue': '%', 'temperature_queue': 'ºC'}
token = None

apiHandler = ApiHandler()


def main():

    rabbitmq_address = os.environ.get('RABBITMQ_ADDRESS')
    rabbitmq_port = os.environ.get('RABBITMQ_PORT')
    rabbitmq_user = os.environ.get('RABBITMQ_USER')
    rabbitmq_pass = os.environ.get('RABBITMQ_PASS')

    # Check if the user has provided the correct number of arguments
    if len(sys.argv) < 2:
        print("Usage: python processor.py <queue>")
        return
    queue = sys.argv[1]    

    credentials = pika.PlainCredentials(rabbitmq_user, rabbitmq_pass)
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=rabbitmq_address, port=rabbitmq_port, credentials=credentials))
    #connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost',port=5672, credentials=credentials))
    channel = connection.channel()

    # When RabbitMQ quits or crashes, it won't forget the queue
    channel.queue_declare(queue=queue, durable=True)
    print(' [*] Waiting for messages. To exit press CTRL+C')

    # Don't give more than one message to a worker at a time
    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue=queue, on_message_callback=callback)

    try:
        channel.start_consuming()
        
    except KeyboardInterrupt or SystemExit:
        pass

    finally:
        print(" [x] Closed connection")
        channel.stop_consuming()
        connection.close()
        

def callback(ch, method, properties, body):

    print(" [x] Received %r" % body.decode())

    # Obtain sensor data
    data = json.loads(body.decode())

    if "id" not in data and "value" not in data and "power" not in data and "unit" not in data:
        print(" [-] Data is not in the correct format!")
        return
    
    sensor_id = data["id"]
    state_value = data["value"]
    power_consumption = data["power"]
    unit = data["unit"]
    


    # Obtain sensor from registered devices
    sensor = obtain_sensor(sensor_id, "registered")

    # If the sensor is registered
    if sensor:

        # Update sensor state
        updateState(sensor, state_value, power_consumption, unit)

    # If the sensor isn't registered
    else:

        # Obtain sensor from available devices
        sensor = obtain_sensor(sensor_id, "available")

        # If the sensor isn't available
        if not sensor:
            # Register as available sensor
            category = categories[method.routing_key]
            sensor = register_sensor(sensor_id, category)

    print(" [x] Done")

    # An ack() is sent back to tell RabbitMQ that the message has been received, processed and that RabbitMQ is free to delete it
    ch.basic_ack(delivery_tag=method.delivery_tag)


def obtain_sensor(sensor_id, device_type = "registered"):


    if device_type == "registered":
        response = apiHandler.getMiddlewareSensors()
    elif device_type == "available":
        response = apiHandler.getAvailableDevices()
    else:
        print(" [-] Unable to get list of '{device_type}' sensors!")
        return
    
    # Check if request was successful
    if response is None or response.status_code != 200: 
        print(" [-] Unable to get sensors!")
        print(" [-] Error", response.status_code if response is not None else 'Unknown')
        return
    
    # Obtain all sensors (response content is in bytes)
    all_sensors = response.content.decode()

    current_sensor = {}

    if all_sensors:

        # Convert to JSON
        all_sensors = json.loads(all_sensors)

        # Run through all sensors and find the sensor with the given id
        for sensor in all_sensors:
            
            # Check if sensor id is the same as the one given
            if sensor["deviceId"] == sensor_id:
                current_sensor = sensor
        
    return current_sensor


def register_sensor(sensor_id, category=None):

    # Create sensor
    sensor = {'deviceId': sensor_id, 'name': f'Sensor {sensor_id}', 'category': category}
        
    # Register available sensor
    response = apiHandler.addAvailableDevices(sensor)
    
    # Check if request was successful
    if response is None or response.status_code != 200: 
        print(" [-] Unable to register sensor!")
        print(" [-] Error", response.status_code if response is not None else 'Unknown')
        return

    return sensor

    
def updateState(sensor, state_value, power_consumption, unit):

    # Create sensor state
    sensor = {"deviceId": sensor["deviceId"], "state": {"value": state_value, "unit": unit, "powerConsumption": power_consumption}}
    
    # The keyword json automatically sets the request’s HTTP header Content-Type to application/json
    response = apiHandler.putDeviceState(sensor)
    
    # Check if request was successful
    if response is None or response.status_code != 200: 
        print(" [-] Unable to update sensors!")
        print(" [-] Error", response.status_code if response is not None else 'Unknown')
        return
    
    print(" [+] Sensor state updated")

if __name__ == '__main__':
    main()
