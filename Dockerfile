FROM node:12.18.3

RUN apt-get update
RUN apt-get install -y libudev-dev

WORKDIR /app
ARG CHAIN=mainnet

COPY ./package.json /app/package.json 
COPY ./yarn.lock /app/yarn.lock
COPY ./.npmrc /app/.npmrc

RUN yarn

COPY . .
COPY ./src/config.${CHAIN}.ts ./src/config.ts

ENV NODE_ENV "production"
RUN yarn build

EXPOSE 80
EXPOSE 443

CMD ["node", "./server.js"]
