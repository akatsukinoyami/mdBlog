# Build step

FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lock ./

RUN bun --bun install --frozen-lockfile

COPY . .

RUN bun --bun bake

# Serve step

FROM cgr.dev/chainguard/nginx

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 8080
