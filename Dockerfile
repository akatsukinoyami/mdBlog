FROM oven/bun:1-alpine AS base

WORKDIR /app 
COPY package.json bun.lock ./
RUN bun install --production --frozen-lockfile


FROM base AS build

RUN bun install --frozen-lockfile
COPY . .
RUN bun bake


FROM base AS serve

COPY --from=build /app/build ./
EXPOSE 3000
CMD ["bun", "run", "index.js"]
