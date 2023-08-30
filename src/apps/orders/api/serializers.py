# -*- coding: utf-8 -*-

from rest_framework import serializers

from orders.models import Order, OrderGoods
from goods.api.serializers import GoodSerializer
from project.ecigs_exceptions import raise_ecigs_exception


import logging
log = logging.getLogger(__name__)


class OrderGoodsSerializer(serializers.ModelSerializer):
    def validate(self, attrs):
        resp = super().validate(attrs)
        good = attrs['good']
        if good.in_stock and good.stock_count >= attrs['count']:
            return resp
        else:
            raise_ecigs_exception(status_code=404, detail=f"You want to buy more goods than we have. There are only {good.stock_count} pieces of {good.name} left",
                                  error_type='Goods count error', extra={"good_id": good.id})

    class Meta:
        model = OrderGoods
        fields = ['count', 'good', 'id']


class OrderSerializer(serializers.ModelSerializer):
    ordergoods_set = OrderGoodsSerializer(read_only=True, many=True)
    goods = GoodSerializer(read_only=True, many=True)

    class Meta:
        model = Order
        fields = '__all__'
