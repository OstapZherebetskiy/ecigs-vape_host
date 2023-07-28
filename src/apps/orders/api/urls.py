# -*- coding: utf-8 -*-

from django.urls import path, re_path
from .viewsets import OrderViewSet


urlpatterns = [
    path('', OrderViewSet.as_view({'get': 'get', 'post': 'post'}), name='order-list'),
    re_path(r'^(?P<pk>\d+)/$', OrderViewSet.as_view({'get': 'retrieve', 'put': 'put', 'patch': 'patch'}), name='order-detail'),
]
