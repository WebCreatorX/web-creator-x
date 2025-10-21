#!/bin/bash

NVM_BIN_PATH="/home/ubuntu/.nvm/versions/node/v22.21.0/bin"

export PATH="$NVM_BIN_PATH:$PATH"

if [ ! -f /tmp/green_port.txt ]; then
   echo  ">>> [Error]Could not find port file. The start_server step may have failed."
   exit 1
fi

GREEN_PORT=$(cat /tmp/green_port.txt)

echo ">>> [Step 1] Health check for New Green Server on port $GREEN_PORT"

for i in {1..10}; do
    RESPONSE_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:"$GREEN_PORT"/health)
    echo ">>> [debug] current code is $RESPONSE_CODE"

    if [ "$RESPONSE_CODE" -eq 200 ]; then
        echo ">>> [Success] Health check successful."

        IDLE_PORT=$(grep -oP '(?<=:)\d+' /etc/nginx/conf.d/proxy_pass.inc)

        echo ">>> [Step 2] Switching Nginx to Green Port: $GREEN_PORT"
        echo "proxy_pass http://127.0.0.1:$GREEN_PORT;" | sudo tee /etc/nginx/conf.d/proxy_pass.inc

        sudo systemctl reload nginx
        echo ">>> [Success] Nginx reloaded. Traffic is now served by Green server."

        echo ">>> [Step 3] Stopping Old Blue server on port $IDLE_PORT"
        pm2 stop "app-$IDLE_PORT"
        pm2 delete "app-$IDLE_PORT"
        pm2 save

        exit 0

    fi

    echo ">>> Health check failed. Retrying ... ($i/10)"
    sleep 1
done

echo ">>> [Error] Health check failed after all retries. Rolling back to Blue server. GREEN_PORT is $GREEN_PORT"
pm2 stop "app-$GREEN_PORT"
pm2 delete "app-$GREEN_PORT"
pm2 save
exit 1


