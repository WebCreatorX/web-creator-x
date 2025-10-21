#!/bin/bash

NVM_BIN_PATH="/home/ubuntu/.nvm/versions/node/v22.21.0/bin"

export PATH="$NVM_BIN_PATH:$PATH"

cd /home/ubuntu/application || exit 1


if [ ! -f /etc/nginx/conf.d/proxy_pass.inc ]; then
    CURRENT_BLUE_PORT=3001
else
    CURRENT_BLUE_PORT=$(grep -oP '(?<=:)\d+' /etc/nginx/conf.d/proxy_pass.inc)
fi

if [ "$CURRENT_BLUE_PORT" -eq 3001 ]; then
    GREEN_PORT=3002
else
    GREEN_PORT=3001
fi

echo ">>> Blue Port: $CURRENT_BLUE_PORT"
echo ">>> Green Port (New Server): $GREEN_PORT"

PORT=$GREEN_PORT pm2 start "npm run start" --name "app-$GREEN_PORT"

pm2 save

echo $GREEN_PORT > /tmp/green_port.txt