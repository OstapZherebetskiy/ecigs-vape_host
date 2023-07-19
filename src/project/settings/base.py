# -*- coding: utf-8 -*-
import os
import sys
from decouple import config


BASE_DIR = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../'))
VAR_DIR = os.path.normpath(os.path.join(BASE_DIR, '../var'))
sys.path.insert(0, os.path.join(BASE_DIR, 'apps'))

SECRET_KEY = config("SECRET_KEY", cast=str)

SITE_ID = 1
DEBUG = config("DEBUG", cast=bool)

ALLOWED_HOSTS = config("ALLOWED_HOSTS", cast=lambda v: [s.strip() for s in v.split(',')])
ALLOWED_IPS = config("ALLOWED_IPS", cast=lambda v: [s.strip() for s in v.split(',')])

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'project',
    'account',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'project.urls'
AUTH_USER_MODEL = 'account.User'

STATIC_ROOT = os.path.join(VAR_DIR, 'htdocs/static')
STATIC_URL = '/static/'

MEDIA_ROOT = os.path.join(VAR_DIR, 'htdocs/media')
MEDIA_URL = '/media/'

PROTECTED_MEDIA_SERVER = 'django'

ADMIN_LOCATION_URL = 'admin'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

from .logging import *
from .database import *
from .regional import *
from .dbbackup import *
from .templates import *

LOCAL_MIDDLEWARE = ()
LOCAL_APPS = ()

MIDDLEWARE += LOCAL_MIDDLEWARE
INSTALLED_APPS += LOCAL_APPS
