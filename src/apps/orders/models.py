# -*- coding: utf-8 -*-

from django.db import models
from django.utils.translation import gettext_lazy as _

from dirtyfields import DirtyFieldsMixin


import logging
log = logging.getLogger(__name__)


class Order(DirtyFieldsMixin, models.Model):

    STATUS_NEW = 'new'
    STATUS_ACTIVE = 'active'
    STATUS_COMPLETED = 'completed'
    STATUS_CANCELED = 'canceled'

    STATUS_CHOICES = (
        (STATUS_NEW, _(u'New')),
        (STATUS_ACTIVE, _(u'Active')),
        (STATUS_COMPLETED, _(u'Completed')),
        (STATUS_CANCELED, _(u'Canceled'))
    )

    good = models.ForeignKey('goods.Good', on_delete=models.PROTECT, verbose_name='Good')
    user = models.ForeignKey('account.User', on_delete=models.SET_NULL, verbose_name='User', blank=True, null=True)
    order_phone = models.CharField(_(u'Order Phone'), max_length=16, blank=True, null=True)
    order_email = models.EmailField(verbose_name=_(u'Order E-mail'), max_length=255, blank=True, null=True)
    goods_count = models.IntegerField(_('Goods count'), default=0)
    status = models.CharField(_('Status'), max_length=20, choices=STATUS_CHOICES, blank=True, null=True)
    department = models.CharField(_(u'Department'), max_length=50, blank=True, null=True)
    invoice = models.CharField(_(u'Invoice'), max_length=50, blank=True, null=True)

    created_at = models.DateTimeField(_(u'Date'), auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=False)

    class Meta:
        verbose_name = _(u'Order')
        verbose_name_plural = _(u'Orders')

    def __str__(self):
        return f'Order {self.id}'

    def save(self, *args, **kwargs):
        if self.goods_count <= 0:
            raise ValueError("Goods count must be positive number")
        if self.good.stock_count < self.goods_count:
            super().save(*args, **kwargs)
        else:
            raise ValueError("You want to buy more goods than we have")
