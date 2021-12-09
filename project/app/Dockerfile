# --- reactjs ---
FROM node:16.13.1

# set working directory (this is inside docker container)
WORKDIR /app
 
COPY . .

RUN npm install
RUN npm install react-scripts@3.4.1 -g --silent
 
EXPOSE 3000

CMD [ "npm", "start" ]
