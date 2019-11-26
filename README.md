# Kileed

## Overview

Kileed is a login frontend / portal that provides usefull services for community
organization.

## Production

### Production prerequisites

- python3 virtualenv
- python3-dev & pgsql adapter

## Production setup

- Apache2 / mod_wsgi

## Development

### Development prerequisites

You'll need virtualenv & python3 in order to run the development environment.

- On debian / ubuntu :

``` bash
  apt install python3 virtualenv
```

- On windows :

  You'll find pyton3 installation here :
 <https://www.python.org/ftp/python/3.8.0/python-3.8.0-amd64.exe>
  Once python is installed, you can run :

```bash
  pip install virtualenv
```

  In an administrator console.

### Setup

Run the setup.sh script on Linux, setup.bat on windows. It will install python
dependencies, nodeenv (virtualenv equivalent for node.js) and install the ui
node modules. It will also setup the development database and update the schemas
of the database, so you can run this script every time you update the repository
to be sure your database is up to date.

You'll then need to create an administrator for the development database :

```bash
    python manage.py createsuperuser
```

Then follow the instructions to create the local admin.

## Running the development servers

### Backend server

Either if you do backend or frontend development, you need to run the backend
development server, in a console, first activate the virtual environment. On
linux :

```bash
  source .env/bin/activate
```

on Windows :

```powershell
  .env\bin\activate.ps1
```

then run the server :

```bash
  python manage.py runserver 0.0.0.0:8000
```

### Frontend server

Node.js and wepack provides a hot-reload development server, proxied by the
backend server thanks to the webpack-loader Django module. In order to run the
frontend server, open a command line in the kileed/ui subdirectory, activate the
virtualenv (see [backend_server]) and run :

```bash
  npm run serve
```

After compiling the frontend, you should be able to access it via the backend
server at localhost:8000
