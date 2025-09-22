FROM node:22

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

EXPOSE 3000 5173

CMD ["npm", "run", "dev"]