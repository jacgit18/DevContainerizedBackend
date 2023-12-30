# Stage 1: Build the TypeScript application
FROM node:latest AS builder

WORKDIR /backend

# Copy package.json and package-lock.json from backend folder to the container
COPY backend/package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code from backend folder to the container
COPY backend .

# Build the TypeScript project
RUN npm run build

# Stage 2: Create a lightweight container with only the necessary files and the built JavaScript files
FROM node:slim

WORKDIR /backend

# Copy only the necessary files from the builder stage
COPY --from=builder /backend/build /backend/build
COPY --from=builder /backend/package*.json ./

# Install production dependencies
RUN npm install --only=production

# Expose the port the app runs on
EXPOSE 3000

# Define the default command to run your application
CMD ["node", "/backend/build/src/serve.js"]


# docker build -t backendserver:0.1 .
# docker run -p 8080:80 backendserver:0.1


# next build
# docker build -t backendserver:0.2 .
