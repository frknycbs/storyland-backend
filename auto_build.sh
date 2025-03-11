#!/bin/bash

REPO_DIR="/root/storyland-backend"
LOG_FILE="$REPO_DIR/logs/output.log"
NODE_SCRIPT="$REPO_DIR/dist/index.js"

cd "$REPO_DIR"

while true; do
    GIT_OUTPUT=$(git pull)
    
    if [[ "$GIT_OUTPUT" != *"Already up to date."* ]]; then
        echo "Changes detected. Rebuilding..."
        npm run build
        pkill node
        nohup node "$NODE_SCRIPT" &> "$LOG_FILE" &
    fi
    
    sleep 5
done