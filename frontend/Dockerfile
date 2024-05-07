# Stage 1: Build the Next.js application
FROM node:latest AS builder

WORKDIR /frontend

# Copy package.json and package-lock.json from frontend folder to the container
COPY frontend/package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code from frontend folder to the container
COPY frontend .

# Build the Next.js project
RUN npm run build

# Stage 2: Create a lightweight container with only the necessary files and the built JavaScript files
FROM node:slim

WORKDIR /frontend

# Copy only the necessary files from the builder stage
COPY --from=builder /frontend/.next ./.next
COPY --from=builder /frontend/public ./public
COPY --from=builder /frontend/package*.json ./package.json

# Install production dependencies
RUN npm install --only=production

# Expose the port the app runs on (if needed)
EXPOSE 3000

# Health check (if needed)
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -fs http://localhost:3000/health || exit 1

# Command to run the Next.js application
CMD ["npm", "start"]
