FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN apt-get update && apt-get install -y curl
COPY . .
EXPOSE 5000
CMD ["npm", "start"]