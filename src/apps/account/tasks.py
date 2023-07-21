# -*- coding: utf-8 -*-

from django.core.mail import send_mail

from account.models import User


from logging import getLogger
log = getLogger(__name__)



def task_send_email_verification_code(user_id):
    user = User.objects.filter(pk=user_id).first()
    if user:
        code = user.generate_new_verification_code(request_mail_verification=True)
        subject, message, recipient_list = 'Email Verification', \
                                           f'Your verification code is {code}', \
                                           [user.email]
        send_mail(subject, message, recipient_list)
        log.debug(f"Sent mail verification code to user {user}")
        user.verification_code = code
        user.save()
