# -*- coding: utf-8 -*-
__author__ = 'Vadim Kravciuk, vadim@kravciuk.com'

from django.contrib import admin
from django.utils.translation import gettext as _
from django.contrib.auth.models import Group as DjangoGroup
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.admin import GroupAdmin as BaseGroupAdmin

from account.models import User


import logging
log = logging.getLogger(__name__)



class UserAdmin(BaseUserAdmin):

    ordering = ('id',)
    list_display = ('id', 'email', 'first_name', 'last_name')
    list_filter = ('is_admin', 'is_active')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': (
            ('first_name', 'last_name'),
            ('photo',),
        )}),
        ('Verification', {
            'fields': (
                ('email_verified',),
                ('verification_code',),
            )
        }),
        ('Permissions', {'fields': (
            ('is_active', 'is_admin', 'admin_access', 'newsletter'),
        )}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    search_fields = ('last_name', 'first_name', 'email')
    filter_horizontal = ()


admin.site.register(User, UserAdmin)
admin.site.unregister(DjangoGroup)
