FROM nginx:1.23.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
RUN mkdir /app
COPY ./public /app

EXPOSE 80
