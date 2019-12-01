#!/bin/bash
source .env/bin/activate

pushd kileed/ui
    npm run test:unit
popd

