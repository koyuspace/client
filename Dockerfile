FROM oven/bun:latest AS builder

WORKDIR /app

COPY package.json bun.lock .

RUN bun install

COPY . .

RUN bun run build


FROM oven/bun:latest AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["bun", "run", "start"]