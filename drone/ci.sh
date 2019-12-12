#!/bin/bash
set -eou pipefail

ui-setup-command() {
    npm install
}

ui-build-command() {
    npm run build -- --mode production
    python3 manage.py collectstatic --clear
}

api-lint-command() {
    pylint tovaritch
    pydocstyle
}

ui-lint-command() {
    npm run lint -- --max-warnings 0
}

api-tests-command() {
    python3 manage.py test -v 3 --parallel 4 tovaritch.core.tests.unit
}

ui-tests-command() {
    npm run test:unit
}

e2e-tests-command() {
    python3 manage.py test -v 3 --parallel 4 tovaritch.core.tests.e2e
}

$1-command