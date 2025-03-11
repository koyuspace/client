FROM oven/bun:latest AS builder

WORKDIR /app

RUN apt update && apt install -y python3 build-essential sqlite3 libsqlite3-dev

COPY package.json bun.lock ./

RUN bun install

COPY . .

RUN cd node_modules/better-sqlite3 && \
    bun run install

RUN bun run build

FROM oven/bun:latest AS runner

WORKDIR /app

RUN apt update && apt install -y sqlite3 libsqlite3-dev

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

EXPOSE 3030
ENV HOSTNAME="0.0.0.0"
ENV PORT=3030

CMD ["bun", "run", "start"]
