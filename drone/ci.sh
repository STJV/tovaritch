#!/bin/bash
set -eou pipefail

ui-setup-command() {
    npm install
}

ui-build-command() {
    npm run build -- --mode production
}

api-lint-command() {
    pylint tovaritch
    pydocstyle
}

ui-lint-command() {
    npm run lint
}

api-tests-command() {
    python3 manage.py test tovaritch.core.tests.unit
}

ui-tests-command() {
    npm run test:unit
}

e2e-tests-command() {
    python3 manage.py test tovaritch.tests.e2e
}

$1-command