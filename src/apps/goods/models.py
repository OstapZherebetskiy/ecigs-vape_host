# -*- coding: utf-8 -*-

from django.db import models
from django.utils.translation import gettext_lazy as _

from dirtyfields import DirtyFieldsMixin


import logging
log = logging.getLogger(__name__)



class Category(models.Model, DirtyFieldsMixin):
    name = models.CharField(_(u'Name'), max_length=128)
    title = models.CharField(_(u'Title'), max_length=128, blank=True, null=True)
    is_enabled = models.BooleanField(_(u'Enabled'), default=True)

    class Meta:
        verbose_name = _(u'Category')
        verbose_name_plural = _(u'Categories')

    def __str__(self):
        return self.name
    
    @staticmethod
    def active():
        return Category.objects.filter(is_enabled=True)
    


class Good(models.Model, DirtyFieldsMixin):
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, verbose_name='Category', blank=True, null=True)
    name = models.CharField(_(u'Name'), max_length=128)
    price = models.DecimalField(_('Price'), max_digits=10, decimal_places=2, blank=True, null=True)
    photo = models.ImageField(_('Photo'), upload_to='goods/photos/%Y/%m/%d', blank=True, null=True)
    description = models.TextField(_(u'Description'), blank=True, null=True)
    in_stock = models.BooleanField(_(u'In stock'), default=True)
    stock_count = models.IntegerField(_('Stock count'), default=0)

    class Meta:
        verbose_name = _(u'Good')
        verbose_name_plural = _(u'Goods')

    def __str__(self):
        return self.name
    
    @staticmethod
    def available():
        return Good.objects.filter(in_stock=True)
