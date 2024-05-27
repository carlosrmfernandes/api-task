FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install ts-node-dev@latest ts-node@latest

RUN npm install cors --save

RUN npm install @types/cors --save-dev

COPY app/prisma/schema.prisma ./app/prisma/schema.prisma

COPY . /app

EXPOSE 3000

CMD ["npm", "start"]
