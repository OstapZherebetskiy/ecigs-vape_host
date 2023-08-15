# -*- coding: utf-8 -*-

from django.conf import settings
from django.core.mail import send_mail


import logging
log = logging.getLogger(__name__)


def task_new_order_sendmail(order):
    try:
        subject = f'New order #{order.id} has been created'
        message = f'Order #{order.id}\n'

        if order.user:
            if order.user.first_name:
                message += f'User: {order.user.first_name}\n'
            else:
                message += f'User: Noname\n'
            if order.user.phone:
                message += f'Phone: {order.user.phone}\n'
            message += f'Email: {order.user.email}\n'
        else:
            message += f'User: Anonymous\n'
            if order.order_phone:
                message += f'Phone: {order.order_phone}\n'
            if order.order_email:
                message += f'Email: {order.order_email}\n'

        message += f'Department: {order.department}\n'
        message += 'Goods:\n'

        order_goods = order.ordergoods_set.all()
        for og in order_goods:
            message += f'- {og.count} x {og.good.name}\n'

        send_mail(
            subject,
            message,
            None,
            [settings.DEFAULT_EMAIL],
            fail_silently=False,
        )
        log.debug('New order received')
    except Exception as e:
        log.error(e)
