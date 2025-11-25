#!/bin/bash
NVM_BIN_PATH="/home/ubuntu/.nvm/versions/node/v22.21.0/bin"

export PATH="$NVM_BIN_PATH:$PATH"

cd /home/ubuntu/application || exit 1

# 🚨 [디버깅] 현재 폴더에 뭐가 있는지 확인
echo ">>> Current Directory: $(pwd)"
echo ">>> File Structure (Depth 3):"
find . -maxdepth 3 -not -path '*/.*'

# 2. package.json이 어디 있는지 찾아서 이동 (자동 감지 로직)
if [ -f "apps/editor/package.json" ]; then
    echo ">>> Found package.json inside apps/editor! Moving there..."
    cd apps/editor
elif [ -f "package.json" ]; then
    echo ">>> Found package.json in root."
else
    echo ">>> ERROR: Cannot find package.json anywhere!"
    exit 1
fi


# echo ">>> Installing dependencies in $(pwd)..."
# pnpm install --production



echo ">>> Skipping install (Standalone build includes dependencies)."