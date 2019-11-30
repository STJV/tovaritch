#!/bin/bash
source .env/bin/activate

pushd kileed/ui
    npm run build
popd