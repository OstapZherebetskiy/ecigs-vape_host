# -*- coding: utf-8 -*-

from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Order, OrderGoods

from .tasks import task_new_order_sendmail


import logging
log = logging.getLogger(__name__)



@receiver([post_save,], dispatch_uid="signal_update_stock_count_post_save", sender=OrderGoods)
def signal_update_stock_count_post_save(sender, instance, created, **kwargs):
    pass
    # TODO


@receiver([post_save,], dispatch_uid="signal_new_order_sendmail_post_save", sender=Order)
def signal_new_order_sendmail_post_save(sender, instance, created, **kwargs):
    if created:
        task_new_order_sendmail(instance)
        log.debug('New order recieved')
