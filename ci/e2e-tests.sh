#!/bin/bash
source .env/bin/activate

echo "deb http://fr.archive.ubuntu.com/ubuntu/ bionic main restricted" > /etc/apt/sources.list
ap-get update
apt install -y firefox

python manage.py test kileed.tests.e2e
cat geckodriver.log
