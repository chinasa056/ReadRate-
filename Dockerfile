# Dockerfile
FROM node:20-alpine

# Fix DNS issue and update packages
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories \
  && apk update && apk upgrade --no-cache

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Expose port and start app
EXPOSE 5000
CMD ["npm", "run", "start:dev"]
