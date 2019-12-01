#!/bin/bash
source .env/bin/activate

pushd kileed/ui > /dev/null
    npm run test:unit
popd > /dev/null

