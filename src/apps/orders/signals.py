# -*- coding: utf-8 -*-

from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import OrderGoods


import logging
log = logging.getLogger(__name__)


@receiver([post_save,], dispatch_uid="signal_update_stock_count_post_save", sender=OrderGoods)
def signal_update_stock_count_post_save(sender, instance, created, **kwargs):
    pass
    # TODO
