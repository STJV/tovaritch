#!/bin/bash

build-command() {
    pushd kileed/ui > /dev/null
        npm install
        npm build
    popd > /dev/null
}

api-lint-command() {
    pylint kileed
    pydocstyle
}

ui-lint-command() {
    pushd kileed/ui > /dev/null
        ./node_modules/.bin/eslint src/**/*.{vue,js}
    popd > /dev/null
}

api-tests-command() {
    python3 manage.py test kileed.tests.unit
}

ui-tests-command() {
    pushd kileed/ui > /dev/null
        npm run test:unit
    popd > /dev/null
}

e2e-tests-command() {
    python3 manage.py test kileed.tests.e2e
}

$1-command