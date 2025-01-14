#----------------------------------------------------------------------------------------------
# Base image
#----------------------------------------------------------------------------------------------
FROM node:22-alpine AS base

ARG PORT=3000
ENV PORT=${PORT}

# Install global dependencies
RUN npm install -g npm@latest

# Create app directory
WORKDIR /home/node/app

# ----------------------------------------------------------------------------------------------
# Production image
# ----------------------------------------------------------------------------------------------
FROM base AS prod

# Install app dependencies
COPY package*.json ./
RUN npm ci

# Build app
COPY . .
RUN npm run build

# EXPOSE PORT
EXPOSE ${PORT}

# Run app
CMD [ "npm", "run", "prod" ]
