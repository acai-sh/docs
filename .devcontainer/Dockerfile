FROM node:24.14.0-slim

# Install OS dependencies as root
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install Mint CLI globally as root (required for global npm installs in this image)
RUN npm install -g mint

# Switch to the non-root 'node' user
USER node

# Install OpenCode AS the 'node' user so it updates /home/node/.bashrc and installs locally
RUN curl -fsSL https://opencode.ai/install | bash
