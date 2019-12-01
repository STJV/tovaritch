#!/bin/bash
apt update > /dev/null
apt install -y firefox firefox-geckodriver python3 python3-virtualenv

source .env/bin/activate
python manage.py test kileed.tests.e2e
cat geckodriver.log
