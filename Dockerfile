# Use an official Node.js runtime as a base image
FROM node:latest

# Set the working directory in the container
WORKDIR /backend

# Copy package.json and package-lock.json from backend folder to the container
COPY backend/package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code from backend folder to the container
COPY backend .

# Expose the port the app runs on
EXPOSE 3000

# Define the default command to run your application
CMD ["node", "/backend/src/serve.js"]


# docker build -t backendserver:0.1 .
# docker run -p 8080:80 backendserver:0.1


# next build
# docker build -t backendserver:0.2 .
