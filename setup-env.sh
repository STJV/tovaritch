#!/bin/bash
echo "Setting up python virtual environment"
pip3 install virtualenv
source .env/bin/activate
pip install -r requirements.txt > /dev/null

echo "Setting up nodeenv..."
pip install nodeenv > /dev/null

echo "Installing node modules"
pushd kileed/ui > /dev/null
npm install
popd > /dev/null

