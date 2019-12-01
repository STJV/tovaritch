#!/bin/bash
source .env/bin/activate

add-apt-repository main
apt update
apt install -y firefox firefox-gecko-driver python3

python manage.py test kileed.tests.e2e
cat geckodriver.log
