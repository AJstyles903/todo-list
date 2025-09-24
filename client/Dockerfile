FROM node:22

WORKDIR /app

# Copy package files
COPY client/package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY client/ .

EXPOSE 5173

CMD ["npm", "run", "dev"]