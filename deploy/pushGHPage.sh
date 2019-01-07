#!/bin/bash
cp -rf dist/dress/* dist/ghpages/
cd dist/ghpages
pwd
ls
git status
git add --all
git commit -m "Update build"
git push
git status
cd ../..
