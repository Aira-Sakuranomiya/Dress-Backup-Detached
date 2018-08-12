#!/usr/bin/env bash

cd src
if [ ! -d Dress ]; then
  git clone https://github.com/komeiji-satori/Dress
fi

GIT_DIR=Dress/.git build/git-log2json.sh --name-only > commits.json
node build/photos.js
node build/albums.js
rm commits.json
