# -*- coding: utf-8 -*-

from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework import status

from orders.models import Order, OrderGoods, Good
from project.permissions_classes.permissions_clases import AdminPermission

from .serializers import OrderSerializer, OrderGoodsSerializer
from rest_framework.permissions import AllowAny
from project.ecigs_exceptions import handle_ecigs_exceptions

import logging
log = logging.getLogger(__name__)


@handle_ecigs_exceptions
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
            serializer = OrderGoodsSerializer(data=goods, many=True)
            try:
                serializer.is_valid(raise_exception=True)
            except Exception as ex:
                instance.delete()
                log.error(ex)
                raise ex
            serializer.save()

        ordergoods_ids = [el['id'] for el in serializer.data]
        instance.ordergoods_set.add(*[obj for obj in OrderGoods.objects.filter(id__in=ordergoods_ids)])

        return Response(self.serializer_class(instance).data, status=status.HTTP_200_OK)


@handle_ecigs_exceptions
class OrderRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    permission_classes = [AdminPermission]
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    def update(self, request, *args, **kwargs):
        kwargs['partial'] = False  # allow only full update
        goods = request.data.pop('goods')
        instance = self.get_object()
        goods_instance_list = []
        order_goods_instance_list = []
        order_goods_serializers_list = []
        add_to_order = []
        for good in goods:
            good_instance = Good.objects.get(id=good['good'])
            order_good = instance.ordergoods_set.filter(good=good_instance.id)
            if order_good.exists():
                order_good = order_good.first()
                good_instance.stock_count += order_good.count
                goods_instance_list.append(good_instance)
                order_good.count = good['count']
                order_goods_instance_list.append(order_good)
            else:
                serializer = OrderGoodsSerializer(data=good)
                serializer.is_valid(raise_exception=True)
                order_goods_serializers_list.append(serializer)

        for el in goods_instance_list:
            el.save()

        for el in order_goods_serializers_list:
            el.save()
            add_to_order.append(OrderGoods.objects.get(id=el.data['id']))

        for el in order_goods_instance_list:
            el.save()
            add_to_order.append(el)

        old_goods = instance.ordergoods_set.all().exclude(id__in=[el.id for el in add_to_order])
        for old_good in old_goods:
            good_instance = old_good.good
            good_instance.stock_count += old_good.count
            good_instance.save()
            old_good.delete()

        for obj in add_to_order:
            instance.ordergoods_set.add(obj)
        return super().update(request, *args, **kwargs)
