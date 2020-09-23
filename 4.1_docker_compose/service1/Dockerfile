FROM node:current-slim

COPY index.js .
COPY package.json .

RUN npm install

EXPOSE 8001
ENV PORT=8001

CMD [ "npm", "start" ]