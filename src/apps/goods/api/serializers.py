# -*- coding: utf-8 -*-

from rest_framework import serializers

from goods.models import Category, Good, Characteristics, CharacteristicsType


import logging
log = logging.getLogger(__name__)


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        return ret


class CharacteristicsTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = CharacteristicsType
        fields = '__all__'


class CharacteristicsSerializer(serializers.ModelSerializer):
    type_info = CharacteristicsTypeSerializer(source='type')

    class Meta:
        model = Characteristics
        fields = '__all__'


class GoodSerializer(serializers.ModelSerializer):
    category_info = CategorySerializer(source='category')
    characteristics_info = CharacteristicsSerializer(many=True, source='characteristics')

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
