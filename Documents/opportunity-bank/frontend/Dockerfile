# Base Image
FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Copy project files
COPY package*.json ./
COPY ./.next ./.next
COPY ./public ./public

# install node packages
RUN npm set progress=false && npm config set depth 0
RUN npm install ci --only=production --ignore-scripts

# expose port and define CMD
EXPOSE 3000
CMD ["npm", "run", "start"]
