# Use Node.js as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy the package.json files and install dependencies for backend and frontend
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Install dependencies for the backend and frontend
RUN cd backend && npm install
RUN cd frontend && npm install

# Install concurrently as a devDependency in the root directory
RUN npm install concurrently

# Copy the rest of the backend and frontend code into the container
COPY backend ./backend
COPY frontend ./frontend

# Expose the ports for both frontend (8080) and backend (3000)
EXPOSE 8080
EXPOSE 3000

# Run both frontend and backend using the concurrently script
CMD ["npm", "start"]
