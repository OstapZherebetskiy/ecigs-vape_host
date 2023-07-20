# -*- coding: utf-8 -*-

from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Order


import logging
log = logging.getLogger(__name__)



@receiver([post_save,], dispatch_uid="signal_update_stock_count_post_save", sender=Order)
def signal_update_stock_count_post_save(sender, instance, created, **kwargs):
    if created and instance.goods_count > 0:
        good = instance.good
        good.stock_count -= instance.goods_count
        good.save()
        log.debug("Signal: goods count on stock changed")
