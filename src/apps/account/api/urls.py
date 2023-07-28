# -*- coding: utf-8 -*-


from django.urls import path
from .viewsets import UserAPI


urlpatterns = [
    path('', UserAPI.as_view()),
]
