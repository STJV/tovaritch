#!/bin/bash
add-apt-repository main
add-apt-repository 'deb http://fr.archive.ubuntu.com/ubuntu/ bionic-updates main restricted'
apt update
apt install -y firefox firefox-gecko-driver python3

source .env/bin/activate
python manage.py test kileed.tests.e2e
cat geckodriver.log
