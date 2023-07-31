# -*- coding: utf-8 -*-

from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework import status

from orders.models import Order, OrderGoods

from .serializers import OrderSerializer, OrderGoodsSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated

import logging
log = logging.getLogger(__name__)


class OrderListCreateAPIView(ListCreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = OrderSerializer

    def get_queryset(self):
        qs = Order.objects.none()
        # breakpoint()
        query_params = self.request.query_params
        # create qs with user orders or all for admin
        if bool(self.request.user and self.request.user.is_authenticated):
            user = self.request.user
            if getattr(user, "is_admin", False):
                qs = Order.objects.all()
            else:
                qs = Order.objects.filter(user=user)

        if order_id := query_params.get('order_id'):
            qs = qs.filter(id=order_id)
        if user_id := query_params.get('user_id'):
            qs = qs.filter(user_id=user_id)
        if order_status := query_params.get('order_status'):
            qs = qs.filter(status=order_status)
        if created_at := query_params.get('created_at_date'):
            qs = qs.filter(created_at__date=created_at)
        return qs

    def create(self, request, *args, **kwargs):
        goods = request.data.get('goods')
        resp = super().create(request, *args, **kwargs)
        instance = Order.objects.get(id=resp.data['id'])
        if goods:
            for good in goods:
                good['order_id'] = resp.data['id']
            serializer = OrderGoodsSerializer(data=goods, many=True)
            try:
                serializer.is_valid(raise_exception=True)
            except Exception as ex:
                instance.delete()
                log.error(ex)
                return Response(ex.args, status=status.HTTP_400_BAD_REQUEST)
            serializer.save()

        ordergoods_ids = [el['id'] for el in serializer.data]
        instance.ordergoods_set.add(*[obj for obj in OrderGoods.objects.filter(id__in=ordergoods_ids)])

        return Response(self.serializer_class(instance).data, status=status.HTTP_200_OK)


class OrderRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    def patch(self, request, *args, **kwargs):
        user = request.user
        if self.get_object().user == user or user.is_admin:
            if self.get_object().status != 'new' and not user.is_admin:
                return Response("Orders with this status can't be edited", status=status.HTTP_405_METHOD_NOT_ALLOWED)
            return super().patch(request, *args, **kwargs)
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
