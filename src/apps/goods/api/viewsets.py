# -*- coding: utf-8 -*-

from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from project.permissions_classes.permissions_clases import GoodsPermission

from .serializers import CategorySerializer, GoodSerializer

from goods.models import Category, Good


class CategoryListCreateView(ListCreateAPIView):
    serializer_class = CategorySerializer
    permission_classes = [GoodsPermission]

    def get_queryset(self):
        qs = Category.objects.all()
        query_params = self.request.query_params
        if name_segment := query_params.get('name_segment'):
            qs = qs.filter(name__icontains=name_segment)
        if name_full := query_params.get('name_full'):
            qs = qs.filter(name=name_full)
        return qs


class CategoryRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = CategorySerializer
    permission_classes = [GoodsPermission]
    queryset = Category.objects.all()


class GoodListCreateAPIView(ListCreateAPIView):
    permission_classes = [GoodsPermission]
    serializer_class = GoodSerializer

    def get_queryset(self):
        qs = Good.objects.all()
        query_params = self.request.query_params
        if category_id := query_params.get('category_id'):
            qs = qs.filter(category_id=category_id)
        if name_segment := query_params.get('name_segment'):
            qs = qs.filter(name__icontains=name_segment)
        if name_full := query_params.get('name_full'):
            qs = qs.filter(name=name_full)
        if price_up := query_params.get('price_up'):
            qs = qs.filter(price__lte=price_up)
        if price_bottom := query_params.get('price_bottom'):
            qs = qs.filter(price__gte=price_bottom)
        if activity_status := query_params.get('activity_status'):
            if activity_status == 'in_stock':
                qs = qs.filter(in_stock=True)
            if activity_status == 'out_of_stock':
                qs = qs.filter(in_stock=False)
        return qs


class GoodsRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    permission_classes = [GoodsPermission]
    serializer_class = GoodSerializer
    queryset = Good.objects.all()
