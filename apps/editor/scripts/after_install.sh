#!/bin/bash
NVM_BIN_PATH="/home/ubuntu/.nvm/versions/node/v22.21.0/bin"

export PATH="$NVM_BIN_PATH:$PATH"

pnpm install --production