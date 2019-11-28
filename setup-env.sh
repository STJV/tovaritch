#!/bin/bash
echo "Installing python requirements..."
pip install -r requirements.txt > /dev/null

echo "Setting up nodeenv..."
pip install nodeenv > /dev/null

echo "Installing node modules"
pushd kileed/ui > /dev/null
npm install
popd > /dev/null

