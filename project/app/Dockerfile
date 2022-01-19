# --- reactjs ---
FROM node:16.13.1

# set working directory
WORKDIR /app

ENV REACT_APP_API_ADDRESS=project_api_1
ENV REACT_APP_RABBIT_MQ_ADDRESS=project_rabbitmq_1
 
COPY package*.json ./

RUN npm install

COPY . .
 
EXPOSE 3000

CMD [ "npm", "start" ]
