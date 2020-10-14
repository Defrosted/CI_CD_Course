FROM node:latest

COPY package.json .
COPY util.ts .
COPY orig.ts .

RUN npm i
RUN wget -q https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x ./wait-for-it.sh

CMD [ "npm", "run", "start:orig" ]
