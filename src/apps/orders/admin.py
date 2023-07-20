# -*- coding: utf-8 -*-

from django.contrib import admin
from .models import Order


class OrderAdmin(admin.ModelAdmin):
    list_display = ('good', 'goods_count', 'status', 'department')
    list_filter = ('status', 'created_at')
    search_fields = ('good', 'status')


admin.site.register(Order, OrderAdmin)
