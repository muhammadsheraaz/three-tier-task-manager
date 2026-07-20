FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

RUN apk add --no-cache curl

COPY . .

EXPOSE 5000

CMD ["npm","start"]