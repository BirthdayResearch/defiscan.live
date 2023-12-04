FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set the working directory
WORKDIR /app

# Copy package files to the working directory
COPY package*.json pnpm-lock.yaml ./

# Copy the rest of the application code
COPY . .

# Install dependencies
RUN PUPPETEER_SKIP_DOWNLOAD=true pnpm install --recursive --ignore-scripts puppeteer

# Debugging with shell (temporary)
RUN sh

# Display the content of the directory before the build
RUN ls -l /app

# Build the Next.js application
RUN pnpm run build

# Use a smaller base image for the production environment
FROM node:20-slim

# Set the working directory in the new stage
WORKDIR /app

# Copy only necessary files from the base stage
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/package.json .
COPY --from=base /app/pnpm-lock.yaml .
COPY --from=base /app/node_modules ./node_modules

# Expose the port on which the application will run
EXPOSE 3000

# Run the Next.js application in production mode
CMD ["pnpm", "start"]



# # Set the working directory inside the container
# WORKDIR /app

# # Copy the package files to the working directory
# COPY package.json pnpm-lock.yaml ./

# # Install project dependencies using PNPM
# # Set PUPPETEER_SKIP_DOWNLOAD to skip Chromium download
# RUN PUPPETEER_SKIP_DOWNLOAD=true pnpm install --ignore-scripts puppeteer
# # To check why lossless-json is not installed by jellyfishsdk
# # RUN pnpm install lossless-json@1.0.5

# # Copy the rest of the application code
# COPY . .

# # Build the Next.js application
# RUN pnpm run build

# # Expose the port on which the application will run
# EXPOSE 3000

# # Start the Next.js application
# CMD ["pnpm", "start"]
