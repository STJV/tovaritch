#!/bin/bash
echo "Setting up python environment"
pip3 install virtualenv > /dev/null

virtualenv -p python3 .env
source .env/bin/activate

echo "Installing python packages"
pip install -r requirements.txt > /dev/null
pip install pydocstyle splinter pylint pylint-django

echo "Setting up nodeenv..."
    pip install nodeenv > /dev/null
nodeenv -p

echo "Installing node modules"
pushd kileed/ui > /dev/null
npm install
popd > /dev/null

