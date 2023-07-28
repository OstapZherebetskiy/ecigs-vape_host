# -*- coding: utf-8 -*-

from rest_framework import serializers

from orders.models import Order


import logging
log = logging.getLogger(__name__)



class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = '__all__'
    
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        return ret
