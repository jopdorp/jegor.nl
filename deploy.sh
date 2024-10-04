#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Build the Next.js project
echo "Building the Next.js project..."
npm run build

# Rsync the build to the remote NAS location
echo "Deploying to NAS..."
rsync -avz --delete --exclude='wiki' ./out/ admin@10.8.0.1:/share/CE_CACHEDEV1_DATA/Web/

echo "Deployment complete."
