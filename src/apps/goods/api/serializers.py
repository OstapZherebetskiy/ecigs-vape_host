# -*- coding: utf-8 -*-

from rest_framework import serializers

from goods.models import Category


import logging
log = logging.getLogger(__name__)




class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        return ret
