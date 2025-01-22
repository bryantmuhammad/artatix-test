# Example Dockerfile
FROM node

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

# Install Drizzle CLI globally (if used globally)
RUN npm install -g drizzle-kit

RUN npm run build

EXPOSE 8080

# Set the entry point
CMD ["npm", "start"]