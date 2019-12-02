#!/bin/bash

api-unit-tests-command() {
    python manage.py test kileed.tests.unit
}

build-ui-command() {
    pushd kileed/ui > /dev/null
        npm run build
    popd > /dev/null
}

e2e-tests-command() {
    python manage.py test kileed.tests.e2e
}

eslint-command() {
    pushd kileed/ui > /dev/null
        ./node_modules/.bin/eslint src/**/*.{vue,js}
    popd > /dev/null
}

pydocstyle-command() {
    pydocstyle
}

pylint-command() {
    pylint kileed
}

ui-unit-tests-command() {
    source .env/bin/activate
    pushd kileed/ui > /dev/null
        npm run test:unit
    popd > /dev/null
}

$1-command