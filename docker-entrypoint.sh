#!/bin/sh

# Start the Node.js server in the background
node /app/dist/server/entry.mjs &
NODE_PID=$!

# Start nginx in the foreground
nginx -g 'daemon off;' &
NGINX_PID=$!

# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $?
