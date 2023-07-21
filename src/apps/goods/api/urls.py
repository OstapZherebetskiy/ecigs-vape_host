# -*- coding: utf-8 -*-

from django.urls import path
from .viewsets import CategoryListCreateView


urlpatterns = [
    path('category/', CategoryListCreateView.as_view()),
]
