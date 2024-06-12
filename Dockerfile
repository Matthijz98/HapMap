FROM node:22-alpine

WORKDIR /app

COPY ./dist .
COPY package.json .
COPY package-lock.json .
COPY src/content ./src/content

RUN npm install

ENV HOST=0.0.0.0
ENV PORT=80
EXPOSE 80

CMD node ./server/entry.mjs
