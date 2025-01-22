# Use Node.js 22 as the base image for building the app
FROM node:22 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use Nginx as a lightweight production server
FROM nginx:alpine

# Copy the build output to Nginx's static files directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
