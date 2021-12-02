# --- reactjs ---
FROM node:16.13.1-alpine

# set working directory
WORKDIR /app
 
COPY package*.json ./
 
RUN npm install
 
COPY . .
 
EXPOSE 3000
 
CMD [ "npm", "start" ]
