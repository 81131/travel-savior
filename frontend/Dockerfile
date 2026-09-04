# Stage 1: Build the React app
FROM node:20-alpine AS build
WORKDIR /app

# Accept the API URL as a build-time argument so Vite can bake it in
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Serve the built app
FROM node:20-alpine AS runtime
WORKDIR /app

# Install 'serve' globally
RUN npm install -g serve

# Copy the built dist from the build stage
COPY --from=build /app/dist ./dist

# Railway injects $PORT at runtime; pass it to serve via -l
CMD ["sh", "-c", "serve -s dist -l tcp://0.0.0.0:${PORT:-3000}"]
