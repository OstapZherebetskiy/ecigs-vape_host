# -*- coding: utf-8 -*-

from django.urls import path, re_path
from .viewsets import CategoryListCreateView, GoodViewSet


urlpatterns = [
    path('category/', CategoryListCreateView.as_view()),
    path('', GoodViewSet.as_view({'get': 'get', 'post': 'post'}), name='good-list'),
    re_path(r'^(?P<pk>\d+)/$', GoodViewSet.as_view({'get': 'retrieve', 'put': 'put', 'patch': 'patch', 'delete': 'delete'}), name='good-detail'),
]
