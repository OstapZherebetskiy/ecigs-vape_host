# -*- coding: utf-8 -*-

from django.contrib import admin
from .models import Category, Good, Characteristics, CharacteristicsType


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'is_enabled')
    list_filter = ('is_enabled',)


class GoodsAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'in_stock')
    list_filter = ('in_stock',)
    search_fields = ('name', 'category')


admin.site.register(Category, CategoryAdmin)
admin.site.register(Good, GoodsAdmin)
admin.site.register(Characteristics)
admin.site.register(CharacteristicsType)
