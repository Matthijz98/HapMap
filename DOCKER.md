# Docker Setup for HapMap

This document describes the Docker setup for the HapMap application.

## Architecture

The application uses a hybrid architecture:
- **Astro SSR** with Node.js for dynamic content and Keystatic CMS admin
- **nginx** as a reverse proxy for efficient static asset serving
- **Pre-compression** (gzip and brotli) for optimal bundle sizes

## Docker Image

The Docker image is built in two stages:

### Build Stage
1. Uses `node:22-alpine` as the base image
2. Enables corepack for pnpm package management
3. Installs dependencies with `pnpm install --frozen-lockfile`
4. Builds the application with `pnpm run build`
5. Compresses static assets (HTML, CSS, JS, JSON, SVG, XML) using gzip and brotli

### Production Stage
1. Uses `node:22-alpine` as the base image
2. Installs nginx and enables corepack
3. Copies built files from the build stage
4. Installs only production dependencies
5. Configures nginx as a reverse proxy
6. Sets up health checks

## nginx Configuration

The nginx configuration (`nginx-proxy.conf`) optimizes performance by:
- Serving static assets directly with aggressive caching (1 year)
- Using pre-compressed files (gzip and brotli)
- Proxying dynamic requests to the Node.js server
- Adding security headers
- Disabling cache for HTML files

## Building the Docker Image

```bash
docker build -t hapmap .
```

## Running the Container

```bash
docker run -p 80:80 hapmap
```

## GitHub Container Registry

The Docker image is automatically built and pushed to GitHub Container Registry (ghcr.io) on every push to the main branch via GitHub Actions.

Pull the latest image:
```bash
docker pull ghcr.io/matthijz98/hapmap:latest
```

## Environment Variables

- `HOST`: The host for the Node.js server (default: 127.0.0.1)
- `PORT`: The port for the Node.js server (default: 4321)

## Health Check

The container includes a health check that pings `http://localhost/` every 30 seconds.

## Size Optimization

The Docker image is optimized for size by:
- Using Alpine Linux base image
- Multi-stage build to exclude build dependencies
- Installing only production dependencies in the final stage
- Pre-compressing static assets
- Excluding unnecessary files via `.dockerignore`
