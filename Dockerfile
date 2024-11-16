# Use an official Node.js image as the base
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Set yarn network timeout and retries
ENV YARN_NETWORK_TIMEOUT=300000
ENV YARN_NETWORK_CONCURRENCY=1

# Copy package files
COPY package.json .
COPY .yarnrc.yml .
COPY .npmrc .

# Install dependencies with increased network timeout and retries
RUN yarn install --network-timeout 300000 --network-concurrency 1 --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the application
RUN yarn build

# Production image
FROM node:18-alpine

WORKDIR /app

# Install curl for healthcheck
RUN apk add --no-cache curl

# Copy only necessary files from builder
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=builder /app/.npmrc ./.npmrc
COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Verify build files exist
RUN ls -la build/ && echo "Build files exist"

# Set environment variables
ENV ATP_SERVICE="https://pds.skiddle.id"
ENV ATP_IDENTIFIER="skiddle.id"
ENV ATP_DID="did:plc:kbpcqituf5ku6xorxo2wzdee"
ENV REDIS_URL="redis://redis:6379"
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port on which the app will run
EXPOSE 3000

# Add health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/ || exit 1

# Command to run the app
CMD ["yarn", "remix-serve", "build/index.js"]