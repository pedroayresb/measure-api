FROM node:20-alpine3.19

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 80

CMD [ "npm", "run", "start" ]
