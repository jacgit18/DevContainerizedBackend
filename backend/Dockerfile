# Stage 1: Build the TypeScript application
FROM node:latest AS builder

WORKDIR /backend

# Copy package.json and package-lock.json from backend folder to the container
COPY backend/package*.json ./

# Install project dependencies
RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

RUN npm install -g knex

RUN npm install -g typescript

# Copy the rest of the application code from backend folder to the container
COPY backend .

# Build the TypeScript project
RUN npm run build

RUN npx knex migrate:latest


# Stage 2: Create a lightweight container with only the necessary files and the built JavaScript files
FROM node:slim

WORKDIR /backend

# Copy only the necessary files from the builder stage
COPY --from=builder /backend/build /backend/build
COPY --from=builder /backend/package*.json /backend/tsconfig.json ./

# Install production dependencies
RUN npm install
# Proably excludes dev dependcies and typescript is included in that
# RUN npm install --only=production
# RUN npx knex migrate:latest


# Expose the port the app runs on
EXPOSE 8081

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -fs http://localhost:8081/health || exit 1

# Define the default command to run your application
CMD ["npx", "nodemon", "./build/src/serve.js"]




# CMD ["npx", "nodemon", "./build/src/serve.js", "&&", "npm", "run" "migrate-up"]




# RUN npm run migrate-up




# # Copy migration files
# COPY backend/migrations /usr/src/app/migrations

# # Install dependencies for migration script
# RUN npm install --production

# # Run migration script
# CMD ["npm", "run", "migrate"]


# CMD ["npm", "run", "migrate-up","&&","npx", "nodemon", "./build/src/serve.js"]



# docker build -t backendserver:0.1 .
# docker run -p 8080:80 backendserver:0.1


# next build
# docker build -t backendserver:0.2 .

# Access container 
# docker exec -it container-id /bin/bash


