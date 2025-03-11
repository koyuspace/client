FROM oven/bun:latest AS builder

WORKDIR /app

# Install build dependencies with specific versions
RUN apt update && apt install -y \
    python3 \
    build-essential \
    sqlite3 \
    libsqlite3-dev \
    node-gyp

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install

# Copy source files
COPY . .

# Force rebuild of better-sqlite3 with node-gyp
RUN cd node_modules/better-sqlite3 && \
    npm run build-release

# Build the application
RUN bun run build

FROM oven/bun:latest AS runner

WORKDIR /app

# Install runtime dependencies
RUN apt update && apt install -y \
    sqlite3 \
    libsqlite3-dev

# Copy only necessary files
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

EXPOSE 3030
ENV HOSTNAME="0.0.0.0"
ENV PORT=3030

CMD ["bun", "run", "start"]
