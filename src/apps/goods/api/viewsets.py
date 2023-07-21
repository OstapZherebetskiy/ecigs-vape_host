# -*- coding: utf-8 -*-

from rest_framework import generics
from rest_framework.permissions import AllowAny

from .serializers import CategorySerializer

from goods.models import Category


class CategoryListCreateView(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Category.objects.all()
        return queryset
