FROM node:22

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY backend/ .

# Create .env file
RUN echo "DB_HOST=${DB_HOST:-mysql}" > .env && \
    echo "DB_USER=${DB_USER:-root}" >> .env && \
    echo "DB_PASSWORD=${DB_PASSWORD:-root}" >> .env && \
    echo "DB_NAME=${DB_NAME:-todo_app}" >> .env && \
    echo "PORT=${PORT:-3000}" >> .env

EXPOSE 3000

CMD ["npm", "run", "dev"]