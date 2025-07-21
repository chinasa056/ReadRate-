# Use official Node.js Alpine image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy dependency files and install
COPY package*.json ./
RUN npm install

# Copy the rest of the app code
COPY . .

# Build TypeScript -> JavaScript
RUN npm run build

# Expose the port your app runs on
EXPOSE 5000

# Start the app
CMD ["npm", "run", "start"]
