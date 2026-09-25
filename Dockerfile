# Stage 1: Build application
FROM node:20-alpine AS builder

WORKDIR /app

# Accept build arguments for environment variables
ARG VITE_WHATSAPP_NUMBER
ARG VITE_SHEET_API_URL
ARG VITE_ADMIN_USER
ARG VITE_ADMIN_PASS

ENV VITE_WHATSAPP_NUMBER=$VITE_WHATSAPP_NUMBER
ENV VITE_SHEET_API_URL=$VITE_SHEET_API_URL
ENV VITE_ADMIN_USER=$VITE_ADMIN_USER
ENV VITE_ADMIN_PASS=$VITE_ADMIN_PASS

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

# Expose HTTP port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]

