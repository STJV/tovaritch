#!/bin/bash
source .env/bin/activate

apt install -y libgtk-3-0

python manage.py test kileed.tests.e2e
cat geckodriver.log
