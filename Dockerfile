# Use the Node.js 22 base image with Alpine for a lightweight container
FROM node:22-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package files to install dependencies
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy remaining source code
COPY . .

# Build the Next.js application
RUN npm run build

# Second stage: use a fresh image for serving the app
FROM node:22-alpine

# Set working directory again
WORKDIR /app

# Copy built app from builder stage
COPY --from=builder /app ./

# Expose port 3000 for the app
ENV PORT=80

EXPOSE 80

# Start the Next.js application
CMD ["npm", "start"]
