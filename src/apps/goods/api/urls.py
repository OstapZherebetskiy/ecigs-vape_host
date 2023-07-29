# -*- coding: utf-8 -*-

from django.urls import path
from .viewsets import CategoryListCreateView, GoodListCreateAPIView, GoodsRetrieveUpdateDestroyAPIView, CategoryRetrieveUpdateDestroyAPIView


urlpatterns = [
    path('category/', CategoryListCreateView.as_view()),
    path('category/<int:pk>/', CategoryRetrieveUpdateDestroyAPIView.as_view()),
    path('', GoodListCreateAPIView.as_view()),
    path('<int:pk>/', GoodsRetrieveUpdateDestroyAPIView.as_view()),
]
