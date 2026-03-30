# Build step

FROM oven/bun:latest as build

WORKDIR /app

COPY package.json bun.lock ./

RUN bun --bun install --frozen-lockfile

COPY . .

RUN bun --bun bake

# Serve step

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
