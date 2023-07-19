SHELL := /bin/bash
CURRENT_DIR = $(shell pwd)

var:
	mkdir -p var var/htdocs/static var/htdocs/media var/htdocs/protected var/logs var/backup;

requirements:
	poetry install;

pull:
	git pull

run:
	poetry run python src/manage.py runserver 127.0.0.1:8000;

commit:
	poetry run python src/manage.py makemigrations ${app}

migrate:
	poetry run python src/manage.py migrate ${app}

adduser:
	poetry run python src/manage.py createsuperuser ${user}

shell:
	poetry run python src/manage.py shell
