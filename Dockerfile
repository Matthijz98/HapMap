# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Enable corepack for pnpm
RUN corepack enable

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# Compress static assets for better performance
RUN apk add --no-cache gzip brotli && \
    find dist/client -type f \( -name '*.html' -o -name '*.css' -o -name '*.js' -o -name '*.json' -o -name '*.svg' -o -name '*.xml' \) \
    -exec sh -c 'gzip -9 -k "$1" && brotli -9 -k "$1"' sh {} \;

# Production stage
FROM node:22-alpine

WORKDIR /app

# Install nginx and enable corepack for pnpm
RUN apk add --no-cache nginx && \
    corepack enable

# Copy built application from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/src/content ./src/content

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Copy nginx configuration and entrypoint script
COPY nginx-proxy.conf /etc/nginx/http.d/default.conf
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Create nginx directories and set permissions
RUN mkdir -p /var/cache/nginx /var/log/nginx /run/nginx && \
    chown -R nginx:nginx /var/cache/nginx /var/log/nginx /run/nginx

# Expose port 80
EXPOSE 80

# Set environment variables for Node.js server
ENV HOST=127.0.0.1
ENV PORT=4321

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Use the entrypoint script
CMD ["/usr/local/bin/docker-entrypoint.sh"]
