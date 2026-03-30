# Build step

FROM oven/bun:latest AS build-node

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY . .

RUN bun bake

# Serve step

FROM nginx:alpine AS serve-node

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build-node /app/build /usr/share/nginx/html

EXPOSE 80
