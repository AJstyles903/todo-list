FROM node:22

WORKDIR /app

# Copy package.json and install dependencies
COPY client/package*.json ./
RUN npm install

# Copy client source code
COPY client/ .

# Create .env file for client (if needed)
RUN echo "VITE_API_URL=http://localhost:3000/api" > .env

EXPOSE 5173

CMD ["npm", "run", "dev"]