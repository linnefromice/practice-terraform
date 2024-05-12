# FROM node:22-slim
FROM node:22-alpine

RUN apk add --no-cache python3 make g++
# RUN apt-get update && apt-get install -y python3 make

WORKDIR /usr/app

COPY ../../package.json ./
COPY ../../yarn.lock ./
RUN yarn

COPY ../../credentials.json ./
COPY ../../tsconfig.json ./
COPY ../../src ./src
COPY ../../prisma ./prisma
COPY .env.docker ./.env
COPY start.sh ./
RUN ls -al

RUN chmod +x ./start.sh
CMD ["sh", "-c", "cd /usr/app && ./start.sh"]