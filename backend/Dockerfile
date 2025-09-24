FROM node:22

WORKDIR /app

# Copy package.json and install dependencies
COPY backend/package*.json ./
RUN npm install

# Copy backend source code
COPY backend/ .

# Create .env file from environment variables
RUN echo "DB_HOST=${DB_HOST:-mysql}" > .env && \
    echo "DB_USER=${DB_USER:-root}" >> .env && \
    echo "DB_PASSWORD=${DB_PASSWORD:-root}" >> .env && \
    echo "DB_NAME=${DB_NAME:-todo_app}" >> .env && \
    echo "PORT=${PORT:-3000}" >> .env && \
    echo "NODE_ENV=${NODE_ENV:-development}" >> .env

# Verify .env file was created
RUN ls -la && cat .env

EXPOSE 3000

CMD ["npm", "run", "dev"]