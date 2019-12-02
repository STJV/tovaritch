FROM ubuntu
RUN apt-get update
RUN apt-get install -y\
    firefox\
    firefox-geckodriver\
    python3-pip\
    python3-virtualenv\
    virtualenv
RUN pip3 install pylint pylint-django pydocstyle splinter
