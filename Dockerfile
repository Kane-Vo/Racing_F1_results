FROM node:16-alpine3.14

EXPOSE 3000

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN mkdir /app
WORKDIR /app
ADD package.json package-lock.json .env /app/
ADD . /app

RUN npm install
RUN npx prisma generate

CMD ["npm", "run", "dev"]
