FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set the working directory inside the container
WORKDIR /app

# Copy the package files to the working directory
COPY package.json pnpm-lock.yaml ./

# Copy the rest of the application code
COPY . .

# Install project dependencies using PNPM
# Set PUPPETEER_SKIP_DOWNLOAD to skip Chromium download
RUN PUPPETEER_SKIP_DOWNLOAD=true pnpm install --recursive --ignore-scripts puppeteer

# Build the Next.js application
RUN pnpm run build

# Expose the port on which the application will run
EXPOSE 3000

# Start the Next.js application
CMD ["pnpm", "start"]
