# -*- coding: utf-8 -*-

from django.contrib import admin
from .models import Order, OrderGoods


class OrderAdmin(admin.ModelAdmin):
    list_display = ('status', 'department', "order_phone")
    list_filter = ('status', 'created_at')
    search_fields = ('status', )


admin.site.register(Order, OrderAdmin)
admin.site.register(OrderGoods)
