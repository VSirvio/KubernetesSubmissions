FROM node:22-alpine

COPY package.json .
RUN npm install

COPY index.js .
RUN mkdir static

CMD ["node", "index.js"]
