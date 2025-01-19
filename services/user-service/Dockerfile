# Use Node.js 18 Alpine as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY dist ./dist

# Copy the .env file into the container
COPY .env .env

# Expose the application port
EXPOSE 5001

# Set environment variables
ENV NODE_ENV=production

# Command to run the application
CMD ["npm", "start"]
