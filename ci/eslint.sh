#!/bin/bash
source .env/bin/activate

pushd kileed/ui
    ./node_modules/.bin/eslint src/**/*.{vue,js}
popd
