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
    type_name = serializers.SerializerMethodField()

    class Meta:
        model = Characteristics
        fields = '__all__'

    def get_type_name(self, obj):
        return obj.type.name


class GoodSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    characteristics = CharacteristicsSerializer(many=True)

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
