# -*- coding: utf-8 -*-

from rest_framework import serializers

from goods.models import Category, Good, Characteristics, CharacteristicsType
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

    main_photo = serializers.SerializerMethodField()

    class Meta:
        model = Good
        fields = ['id', 'name', 'price', 'description', 'in_stock', 'main_photo']

    def get_main_photo(self, obj):
        photo_number = obj.main_photo
        photo_attr = f'photo_{photo_number}'
        photo = getattr(obj, photo_attr, None)
        if photo and hasattr(photo, 'url'):
            return photo.url
        return None

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        return ret
