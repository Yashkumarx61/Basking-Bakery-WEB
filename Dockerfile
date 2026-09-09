# Stage 1: Build application
FROM node:20-alpine AS builder

WORKDIR /app

# Accept build arguments for environment variables
ARG VITE_WHATSAPP_NUMBER
ARG VITE_SHEET_API_URL

ENV VITE_WHATSAPP_NUMBER=$VITE_WHATSAPP_NUMBER
ENV VITE_SHEET_API_URL=$VITE_SHEET_API_URL

# Copy package manifests and install dependencies
COPY package*.json ./
RUN npm ci

# Copy application source files and build production bundle
COPY . .
RUN npm run build

# Stage 2: Serve production assets with Nginx
FROM nginx:alpine AS runner

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
