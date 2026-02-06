FROM nginx:alpine

# Enable gzip compression in nginx.conf
RUN sed -i 's/gzip off;/gzip on;/' /etc/nginx/nginx.conf

# Copy static files to /usr/share/nginx/html
COPY /dist /usr/share/nginx/html

# Copy nginx config file to /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80