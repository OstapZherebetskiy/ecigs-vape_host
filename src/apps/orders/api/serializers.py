# -*- coding: utf-8 -*-

from rest_framework import serializers

from orders.models import Order, OrderGoods
from goods.api.serializers import GoodSerializer


import logging
log = logging.getLogger(__name__)


class OrderGoodsSerializer(serializers.ModelSerializer):
    def validate(self, attrs):
        resp = super().validate(attrs)
        if attrs['good'].in_stock and attrs['good'].stock_count >= attrs['count']:
            return resp
        else:
            raise ValueError("You want to buy more goods than we have")

    class Meta:
        model = OrderGoods
        fields = ['count', 'good', 'id']


class OrderSerializer(serializers.ModelSerializer):
    ordergoods_set = OrderGoodsSerializer(read_only=True, many=True)
    goods = GoodSerializer(read_only=True, many=True)

    class Meta:
        model = Order
        fields = '__all__'

