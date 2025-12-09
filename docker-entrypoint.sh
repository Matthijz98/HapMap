#!/bin/sh

# Start the Node.js server in the background
node /app/dist/server/entry.mjs &
NODE_PID=$!

# Start nginx in the foreground
nginx -g 'daemon off;' &
NGINX_PID=$!

# Function to handle signals
cleanup() {
    echo "Shutting down..."
    kill $NODE_PID $NGINX_PID 2>/dev/null
    exit 0
}

# Trap signals
trap cleanup SIGTERM SIGINT

# Wait for processes - loop to handle both processes
while kill -0 $NODE_PID 2>/dev/null && kill -0 $NGINX_PID 2>/dev/null; do
    sleep 1
done

# If we get here, one of the processes died
echo "A process died, shutting down..."
cleanup
