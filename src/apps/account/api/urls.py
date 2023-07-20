# -*- coding: utf-8 -*-


from django.urls import path
from .viewsets import UserDetail, UserUpdate


urlpatterns = [
    path('profile/', UserDetail.as_view()),
    path('profile/update/', UserUpdate.as_view()),
]
