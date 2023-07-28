# -*- coding: utf-8 -*-

from rest_framework import serializers

from goods.models import Category, Good


import logging
log = logging.getLogger(__name__)


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        return ret


class GoodSerializer(serializers.ModelSerializer):
    category_name = serializers.SerializerMethodField()

    class Meta:
        model = Good
        fields = '__all__'

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        return ret

    def get_category_name(self, obj):
        if obj.category:
            return obj.category.name
        return None
