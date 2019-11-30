#!/bin/bash

apt install -y firefox firefox-geckodriver

source .env/bin/activate
python manage.py test kileed.tests.e2e