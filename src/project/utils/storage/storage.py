# -*- coding: utf-8 -*-

from django.core.files.storage import FileSystemStorage
from django.urls import reverse

import logging
log = logging.getLogger(__name__)


class ProtectedStorage(FileSystemStorage):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def url(self, name):
        return reverse('account:preview_media_file', args=[name])

    def media_path(self, name):
        log.debug(name)
        return reverse('account:preview_media_file', args=[name])
