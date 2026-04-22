FROM node:24.14.0-slim

# Install OS dependencies as root
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    openssh-client \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install Mint CLI globally as root (required for global npm installs in this image)
RUN npm install -g mint

# Switch to the non-root 'node' user
USER node

# postinstall adds opencode cli, see .devcontainer.json
