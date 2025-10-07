FROM node:22-alpine

COPY package.json .
RUN npm install

COPY index.js .

CMD node index.js
