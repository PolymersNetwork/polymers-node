# Use Node.js 18 LTS
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json & package-lock.json first for caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY src ./src

# Copy .env if needed
# COPY .env .env

# Build TypeScript (optional if using ts-node-dev)
# RUN npm run build

# Expose ports
EXPOSE 4000  # Backend API
EXPOSE 4001  # WebSocket server

# Start the backend with ts-node-dev
CMD ["npm", "run", "dev"]
