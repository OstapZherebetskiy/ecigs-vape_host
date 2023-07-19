# -*- coding: utf-8 -*-

from django.urls import path
from .views import account_media_preview


app_name = 'account'

urlpatterns = [
    path('preview/<path:path>', account_media_preview, name='preview_media_file'),
]
