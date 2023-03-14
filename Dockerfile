FROM node:latest

RUN mkdir -p /usr/node/app

WORKDIR /usr/node/app

COPY . .

RUN yarn

RUN yarn webpack

EXPOSE 80:80

CMD [ "node", "server.js" ]
