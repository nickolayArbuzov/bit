FROM node:18-alpine

WORKDIR /app

RUN npm install -g @nestjs/cli

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start:dev"]

