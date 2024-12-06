# Use Node.js as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json files and install dependencies
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Install backend and frontend dependencies
RUN cd backend && npm install
RUN cd frontend && npm install

# Copy the rest of the backend and frontend code into the container
COPY backend ./backend
COPY frontend ./frontend

# Install concurrently as devDependency
RUN cd frontend && npm install concurrently

# Expose ports for frontend and backend
EXPOSE 8080  # Expose only frontend port (backend will not be exposed outside the container)

# Run both frontend and backend using the concurrently script
CMD ["npm", "start"]
