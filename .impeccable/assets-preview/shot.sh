#!/bin/bash
# usage: shot.sh <name> [extra capture args]
cd "/c/Users/David/Documents/Landing page David"
export PATH="/c/Users/David/AppData/Roaming/nvm/v22.23.4:$PATH"
name=$1; shift
node .impeccable/assets-preview/build.mjs >/dev/null && node /c/Users/David/.agents/skills/anatomy-asset/scripts/capture.mjs .impeccable/assets-preview/preview.html --wait 300 --out .impeccable/assets-preview/shots/$name.png "$@" 2>&1 | tail -4
