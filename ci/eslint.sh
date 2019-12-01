#!/bin/bash
source .env/bin/activate

pushd kileed/ui > /dev/null
    ./node_modules/.bin/eslint src/**/*.{vue,js}
popd > /dev/null
