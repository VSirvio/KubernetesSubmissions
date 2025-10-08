FROM node:22-alpine

COPY package.json .
RUN npm install

RUN mkdir -p /usr/src/app/files

COPY index.js .

CMD ["node", "index.js"]
