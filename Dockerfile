FROM oven/bun:canary-distroless AS base

WORKDIR /app 
COPY package.json bun.lock ./
RUN bun --bun install --production --frozen-lockfile


FROM base AS build

RUN bun --bun install --frozen-lockfile
COPY . .
RUN bun --bun bake


FROM base AS serve

COPY --from=build /app/build ./
EXPOSE 3000
CMD ["bun", "--bun", "run", "index.js"]
