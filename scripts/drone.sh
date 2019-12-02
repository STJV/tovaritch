#!/bin/bash


api-unit-tests() {
    source .env/bin/activate
    python manage.py test kileed.tests.unit
}

build-ui() {
    source .env/bin/activate
    pushd kileed/ui > /dev/null
        npm run build
    popd > /dev/null
}

e2e-tests() {
    source .env/bin/activate
    python manage.py test kileed.tests.e2e
}

eslint() {
    source .env/bin/activate
    pushd kileed/ui > /dev/null
        ./node_modules/.bin/eslint src/**/*.{vue,js}
    popd > /dev/null
}

pydocstyle() {
    source .env/bin/activate
    pydocstyle
}

pylint() {
    source .env/bin/activate
    pylint kileed
}

setup-workspace() {
    echo "Setting up python environment"
    pip3 install virtualenv > /dev/null

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
}

ui-unit-tests() {
    source .env/bin/activate
    pushd kileed/ui > /dev/null
        npm run test:unit
    popd > /dev/null
}

$1