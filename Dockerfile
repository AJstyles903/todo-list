FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm install

WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install

WORKDIR /app/client
COPY client/package*.json ./
RUN npm install

WORKDIR /app
COPY . .

EXPOSE 3000 5000

CMD ["npm", "run", "dev"]