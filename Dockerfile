FROM oven/bun:latest AS base
WORKDIR /app

FROM base AS build
COPY package.json bun.lock ./
RUN bun --bun install --frozen-lockfile
COPY . .
RUN bun --bun bake

FROM base AS serve
COPY package.json bun.lock ./
RUN bun --bun install --production --frozen-lockfile
COPY --from=build /app/build ./
EXPOSE 3000
CMD ["bun", "--bun", "run", "index.js"]