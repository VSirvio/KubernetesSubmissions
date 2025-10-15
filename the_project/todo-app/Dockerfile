FROM node:22-alpine AS build-stage

WORKDIR /build

COPY react-frontend-app/ ./
RUN npm install
RUN npm run build


FROM node:22-alpine

WORKDIR /app

COPY package.json .
RUN npm install
COPY index.js .
RUN mkdir static

WORKDIR /app/public

COPY --from=build-stage /build/dist/ ./

WORKDIR /app

CMD ["node", "index.js"]
