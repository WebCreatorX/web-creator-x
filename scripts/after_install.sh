#!/bin/bash
NVM_BIN_PATH="/home/ubuntu/.nvm/versions/node/v22.21.0/bin"

export PATH="$NVM_BIN_PATH:$PATH"

cd /home/ubuntu/application || exit 1

npm install