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


class CharacteristicsType(models.Model):
    name = models.CharField(max_length=100)
    comment = models.CharField(max_length=150)

    def __str__(self):
        return self.name


class Characteristics(models.Model):
    type = models.ForeignKey(CharacteristicsType, on_delete=models.SET_NULL, verbose_name='CharacteristicsType', blank=True, null=True)
    value = models.CharField(max_length=100)
    comment = models.CharField(max_length=150)

    def __str__(self):
        return f'{self.type} = {self.value}'


class Good(models.Model, DirtyFieldsMixin):

    PHOTO_1 = '1'
    PHOTO_2 = '2'
    PHOTO_3 = '3'
    PHOTO_4 = '4'
    PHOTO_5 = '5'

    PHOTO_CHOICES = (
        (PHOTO_1, _(u'1')),
        (PHOTO_2, _(u'2')),
        (PHOTO_3, _(u'3')),
        (PHOTO_4, _(u'4')),
        (PHOTO_5, _(u'5')),
    )

    category = models.ForeignKey(Category, on_delete=models.SET_NULL, verbose_name='Category', blank=True, null=True)
    name = models.CharField(_(u'Name'), max_length=128)
    price = models.DecimalField(_('Price'), max_digits=10, decimal_places=2, blank=True, null=True)
    description = models.TextField(_(u'Description'), blank=True, null=True)
    in_stock = models.BooleanField(_(u'In stock'), default=True)
    stock_count = models.IntegerField(_('Stock count'), default=0)
    characteristics = models.ManyToManyField(Characteristics, blank=True)

    photo_1 = models.ImageField(_('Photo 1'), upload_to='goods/photos/%Y/%m/%d', blank=True, null=True)
    photo_2 = models.ImageField(_('Photo 2'), upload_to='goods/photos/%Y/%m/%d', blank=True, null=True)
    photo_3 = models.ImageField(_('Photo 3'), upload_to='goods/photos/%Y/%m/%d', blank=True, null=True)
    photo_4 = models.ImageField(_('Photo 4'), upload_to='goods/photos/%Y/%m/%d', blank=True, null=True)
    photo_5 = models.ImageField(_('Photo 5'), upload_to='goods/photos/%Y/%m/%d', blank=True, null=True)
    main_photo = models.CharField(_('Main photo'), max_length=20, choices=PHOTO_CHOICES, blank=True, null=True)

    class Meta:
        verbose_name = _(u'Good')
        verbose_name_plural = _(u'Goods')

    def __str__(self):
        return self.name

    @staticmethod
    def available():
        return Good.objects.filter(in_stock=True)

    def save(self, *args, **kwargs):
        if self.stock_count == 0:
            self.in_stock = False
        elif self.stock_count > 0:
            self.in_stock = True
        super().save(*args, **kwargs)
