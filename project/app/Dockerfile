# --- reactjs ---
FROM node:16.13.1

# set working directory
WORKDIR /app
 
COPY package*.json ./

RUN npm install --loglevel verbose
RUN npm install react-scripts@3.4.1 -g --silent

COPY . .
 
EXPOSE 3000

CMD [ "npm", "start" ]
