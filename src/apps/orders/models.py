# -*- coding: utf-8 -*-

from django.db import models
from django.core.validators import MinValueValidator
from django.utils.translation import gettext_lazy as _

from dirtyfields import DirtyFieldsMixin
from project.ecigs_exceptions import raise_ecigs_exception

import logging

from goods.models import Good
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

    goods = models.ManyToManyField(Good, through='orders.OrderGoods')
    user = models.ForeignKey('account.User', on_delete=models.SET_NULL, verbose_name='User', blank=True, null=True)
    order_phone = models.CharField(_(u'Order Phone'), max_length=16, blank=True, null=True)
    order_email = models.EmailField(verbose_name=_(u'Order E-mail'), max_length=255, blank=True, null=True)
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


class OrderGoods(models.Model, DirtyFieldsMixin):
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, blank=True, null=True)
    good = models.ForeignKey(Good, on_delete=models.SET_NULL, blank=True, null=True)
    count = models.PositiveIntegerField(validators=[MinValueValidator(1)])

    class Meta:
        verbose_name = _(u'Good for Order')
        verbose_name_plural = _(u'Goods for Orders')

    def __str__(self):
        return f'{self.count} {self.good.name} for Order {self.order}'

    def save(self, *args, **kwargs):
        if self.good.in_stock and self.good.stock_count >= self.count:
            self.good.stock_count -= self.count
            self.good.save()
            super().save(*args, **kwargs)
        else:
            raise_ecigs_exception(status_code=400, detail=f"You want to buy more goods than we have. There are only {self.good.stock_count} pieces of {self.good.name} left",
                                  error_type='Goods count error', extra={"good_id": self.good.id})
