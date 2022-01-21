# --- reactjs ---
FROM node:16.13.1

# set working directory
WORKDIR /app

ENV REACT_APP_API_ADDRESS=172.18.0.3
ENV REACT_APP_RABBIT_MQ_ADDRESS=172.18.0.7
 
COPY package*.json ./

RUN npm install

COPY . .
 
EXPOSE 3000

CMD [ "npm", "start" ]
