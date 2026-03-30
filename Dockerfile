# Build step

FROM oven/bun:latest AS build-node

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY \
  src \
  static \
  scripts \
  svelte.config.js \
  vite.config.ts \
  tsconfig.json \
  tailwind.config.ts \
  biome.json \
  bunfig.toml \
  ./

RUN bun lint
RUN bun check:18n
RUN bun posts
RUN bun compress:images
RUN vite build

# Serve step

FROM nginx:alpine AS serve-node

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build-node /app/build /usr/share/nginx/html

EXPOSE 80
