#!/bin/bash
echo "Setting up python environment"
pip3 install virtualenv > /dev/null

if [ -d .env ]; then
	rm -fr .env
fi

virtualenv -p python3 .env
source .env/bin/activate

echo "Installing python packages"
pip install -r requirements-dev.txt > /dev/null

echo "Setting up nodeenv..."
nodeenv -p

echo "Installing node modules"
pushd kileed/ui > /dev/null
	npm install
popd > /dev/null
