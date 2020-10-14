FROM node:latest

COPY package.json .
COPY util.ts .
COPY http-server.ts .

RUN npm i

EXPOSE 8080
CMD [ "npm", "run", "start:http" ]
