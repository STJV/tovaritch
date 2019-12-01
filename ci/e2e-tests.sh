#!/bin/bash
source .env/bin/activate

apt install -y firefox

python manage.py test kileed.tests.e2e
cat geckodriver.log
