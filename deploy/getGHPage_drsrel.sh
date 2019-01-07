#!/bin/bash
rm -f ~/.ssh/id_rsa
openssl aes-256-cbc -K $encrypted_796608c44ed4_key -iv $encrypted_796608c44ed4_iv -in deploy/id_rsa_drsrel.enc -out ~/.ssh/id_rsa -d
chmod 600 ~/.ssh/id_rsa
eval $(ssh-agent)
ssh-add ~/.ssh/id_rsa
cp deploy/ssh_config ~/.ssh/config
cp deploy/ssh_config ~/.ssh/ssh_config
ssh -vT git@github.com
git config --global user.name 'dress'
git config --global user.email 'dress'
rm -rf dist/ghpages
git clone git@github.com:drsrel/drsrel.github.io.git --depth 1 dist/ghpages
