# -*- coding: utf-8 -*-

from random import randint

from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, PermissionsMixin
)

from project.utils.storage import ProtectedStorage
from dirtyfields import DirtyFieldsMixin


from logging import getLogger
log = getLogger(__name__)



class UserManager(BaseUserManager):
    def create_user(self, email=None, password=None):
        """
        Creates and saves a User with the given email and password.
        """
        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(
            email,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin, DirtyFieldsMixin):

    username = models.CharField(_(u'Username'), max_length=32, blank=True, null=True)
    email = models.EmailField(verbose_name=_(u'E-mail'), max_length=255, unique=True, 
                                help_text=_(u'We\'ll never share your email with anyone else.'))
    phone = models.CharField(_(u'Phone'), max_length=16, blank=True, null=True, unique=True)
    first_name = models.CharField(_(u'First name'), max_length=32, blank=True, null=True)
    last_name = models.CharField(_(u'Last name'), max_length=32, blank=True, null=True)
    photo = models.ImageField(_(u'Photo'), storage=ProtectedStorage, upload_to='protected/profile/photo/%Y/%m/%d', blank=True, null=True)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    admin_access = models.BooleanField(
        _(u'Is staff'),
        default=False
    )
    deleted = models.BooleanField(default=False)

    email_verified = models.BooleanField(_(u'E-mail verified'), default=False)
    verification_code = models.CharField(_(u'Verification code'), blank=True, null=True, max_length=16)

    newsletter = models.BooleanField(_(u'Newsletter'), default=False)
    about = models.TextField(_(u'About me'), blank=True, null=True)
    default_department = models.CharField(_(u'Nova poshta department'), max_length=50, blank=True, null=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    @property
    def is_staff(self):
        if self.is_admin is True or self.admin_access is True:
            return True
        return False

    @property
    def is_superuser(self):
        return self.is_admin
    
    @staticmethod
    def get_user(email):
        rs = User.objects.filter(email=email)
        if rs:
            return rs[0]
        return None
    
    def generate_new_verification_code(self, request_mail_verification=False):
        data = {'verification_code': randint(10000, 99999)}
        if request_mail_verification is True:
            data['email_verified'] = False
        User.objects.filter(id=self.pk).update(**data)
        log.debug("Set new verification code %s for user %s" % (data['verification_code'], self))

        return data['verification_code']
