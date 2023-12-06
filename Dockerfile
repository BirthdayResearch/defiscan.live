FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# Set the working directory inside the container
WORKDIR /app

# Copy the package files to the working directory
COPY package.json pnpm-lock.yaml /app/

# Install project dependencies using PNPM
# To check why lossless-json is not installed by jellyfishsdk
RUN yarn global add pnpm && pnpm i --ignore-scripts

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Next.js application
RUN yarn global add pnpm && pnpm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

# Copy build files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose the port on which the application will run
EXPOSE 3000
ENV PORT 3000

# Start the Next.js application
CMD ["node", "server.js"]
