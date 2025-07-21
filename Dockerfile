# Dockerfile
FROM node:20-alpine

# Fix DNS issue and update packages
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories \
  && apk update && apk upgrade --no-cache

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./

# Install TypeScript globally (IMPORTANT)
RUN npm install -g typescript

# Install local dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Build the TypeScript code
RUN tsc

# Expose port
EXPOSE 5000

# Start app
CMD ["npm", "start"]
