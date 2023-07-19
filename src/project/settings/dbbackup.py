# -*- coding: utf-8 -*-

import os
from .base import VAR_DIR

DBBACKUP_STORAGE = 'django.core.files.storage.FileSystemStorage'
DBBACKUP_STORAGE_OPTIONS = {'location': os.path.join(VAR_DIR, 'backup')}
