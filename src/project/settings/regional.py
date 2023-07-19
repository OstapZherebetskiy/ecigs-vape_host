# -*- coding: utf-8 -*-

from decouple import config

LANGUAGE_CODE = 'en'
LANGUAGES = [
    ('en', 'English'),
]

LANGUAGES_CODES = []
for lang in LANGUAGES:
    LANGUAGES_CODES.append(lang[0])

TIME_ZONE = config("TIME_ZONE", cast=str)
USE_I18N = True
USE_L10N = True
USE_TZ = True

DATE_FORMAT = 'Y-m-d'
DATETIME_FORMAT = 'Y-m-d H:i:s'
