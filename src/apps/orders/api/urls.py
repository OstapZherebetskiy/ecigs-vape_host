# -*- coding: utf-8 -*-

from django.urls import path
from .viewsets import OrderListCreateAPIView, OrderRetrieveUpdateDestroyAPIView


urlpatterns = [
    path('', OrderListCreateAPIView.as_view(), name='order-list'),
    path('<int:pk>/', OrderRetrieveUpdateDestroyAPIView.as_view(), name='order-list'),
]
