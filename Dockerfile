FROM node:22-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

COPY ./dist .
COPY package.json .
COPY pnpm-lock.yaml .
COPY src/content ./src/content

RUN pnpm install --prod

ENV HOST=0.0.0.0
ENV PORT=80
EXPOSE 80

CMD node ./server/entry.mjs
