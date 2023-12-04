FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set the working directory inside the container
WORKDIR /app

# Copy the package files to the working directory
COPY package.json pnpm-lock.yaml /app/

# Install project dependencies using PNPM
RUN pnpm install --ignore-scripts puppeteer
# To check why lossless-json is not installed by jellyfishsdk
RUN pnpm install lossless-json@1.0.5

# Copy the rest of the application code
COPY . /app

# Build the Next.js application
RUN pnpm run build

# Expose the port on which the application will run
EXPOSE 3000

# Start the Next.js application
CMD ["pnpm", "start"]
