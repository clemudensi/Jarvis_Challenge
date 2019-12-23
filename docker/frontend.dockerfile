FROM node:12.12

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

CMD ["yarn", "run", "serve"]
