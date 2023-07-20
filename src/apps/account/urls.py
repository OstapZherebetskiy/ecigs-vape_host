# -*- coding: utf-8 -*-

from django.urls import path
from .views import account_media_preview, account_media_view


app_name = 'account'

urlpatterns = [
    path('preview/<path:path>', account_media_preview, name='preview_media_file'),
    path('media/<slug:field>/', account_media_view, name='protected_media_file'),
]
