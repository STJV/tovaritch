#!/bin/bash
echo "Setting up python environment"
pip3 install virtualenv > /dev/null

if [ -d .env ]; then
	rm -fr .env
fi

virtualenv -p python3 .env
source .env/bin/activate

echo "Installing python packages"
pip install -r requirements.txt > /dev/null
pip install pylint pylint-django pydocstyle splinter > /dev/null

echo "Setting up nodeenv..."
pip install nodeenv > /dev/null
nodeenv -p

echo "Installing node modules"
pushd kileed/ui > /dev/null
npm install
popd > /dev/null

echo "Setting up Splinter test environment..."
mkdir -p .env/opt > /dev/null
pushd .env/opt
wget -qO- 'https://download.mozilla.org/?product=firefox-latest&os=linux64&lang=en-US' | tar xj
popd
ln -s $PWD/.env/opt/firefox/firefox .env/bin/firefox

pushd .env/bin
wget -qO- https://github.com/mozilla/geckodriver/releases/download/v0.26.0/geckodriver-v0.26.0-linux64.tar.gz\
	| tar xz
chmod +x geckodriver
popd
