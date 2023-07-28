# -*- coding: utf-8 -*-

from rest_framework import serializers

from orders.models import Order


import logging
log = logging.getLogger(__name__)


class OrderSerializer(serializers.ModelSerializer):
    good_name = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = '__all__'

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        return ret

    def get_good_name(self, obj):
        if obj.good:
            return obj.good.name
        return None
