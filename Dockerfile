# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files for the client (React Vite app)
COPY client/package*.json ./client/

# Install dependencies for the client
RUN cd client && npm install

# Copy the rest of the client app files
COPY client/ ./client/

# Copy the package.json and package-lock.json files for the server (Node.js backend)
COPY server/package*.json ./server/

# Install dependencies for the server
RUN cd server && npm install

# Copy the rest of the server app files
COPY server/ ./server/

# Expose the port that your server runs on (assuming your server runs on port 3000)
EXPOSE 3000

# Set the default command to run your app
CMD ["sh", "-c", "cd client && npm run dev & cd ../server && npm start"]
