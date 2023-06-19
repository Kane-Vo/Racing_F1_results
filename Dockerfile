FROM node:16-alpine3.14

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN mkdir /app
WORKDIR /app
ADD . /app

RUN npm install

CMD ["npm", "run", "dev"]
