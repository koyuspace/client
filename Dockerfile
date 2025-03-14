FROM oven/bun:latest AS builder

# Add build arguments
ARG BUN_PLATFORM
ARG NODE_ARCH
ARG BUILDPLATFORM

WORKDIR /app

# Install Node.js and build dependencies
RUN apt update && apt install -y \
    python3 \
    build-essential \
    sqlite3 \
    libsqlite3-dev \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt install -y nodejs \
    && npm install -g node-gyp

# Copy package files
COPY package.json bun.lock ./

# Install dependencies with platform-specific flags
RUN BUN_PLATFORM=${BUN_PLATFORM} bun install

# Copy source files
COPY . .

# Rebuild native modules with correct architecture
RUN cd node_modules/better-sqlite3 && \
    BUN_PLATFORM=${BUN_PLATFORM} npm rebuild --target_arch=${NODE_ARCH} && \
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
ENV BUN_PLATFORM=${BUN_PLATFORM}

CMD ["bun", "run", "start"]
