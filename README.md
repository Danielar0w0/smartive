# Smartive

Smartive is a smart device management App that allows you to easily control and manage your intelligent home products.

# Team

Team manager: [Gonçalo Machado](https://github.com/goncalo-machado)  
Architect: [Hugo Gonçalves](https://github.com/Hugo1307)  
Product Owner: [Daniela Dias](https://github.com/Danielar0w0)  
DevOps: [José Trigo](https://github.com/zepedrotrigo)

# Quick Links

* [Project Management board](https://app.zenhub.com/workspaces/ies-planning-61afe72170a170001067f7a0/board?repos=431834632)
* Reports
* [API documentation](https://documenter.getpostman.com/view/16743908/UVR5sVHN)

# Run the app locally

To run the Smartive application locally, follow these steps:

* Navigate to the /project directory;
* Run ```docker-compose build --no-cache```
* Run ```docker-compose up```
* Wait until all containers have started
* In order to enable the WebSockets support for RabbitMQ:
    * Open the RabbitMQ container using: ```docker exec -it project_rabbitmq_1 /bin/bash```
    * Execute the command: ```rabbitmq-plugins enable rabbitmq_web_stomp```
* Open the browser in the following url:
  * http://172.18.0.2:3000 or http://localhost:3000
