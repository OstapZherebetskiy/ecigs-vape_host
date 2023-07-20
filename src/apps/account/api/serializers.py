# -*- coding: utf-8 -*-

import re
from django.utils.translation import gettext as _
from rest_framework import serializers

from account.models import User


import logging
log = logging.getLogger(__name__)



class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'
        read_only_fields = ['email_verified', 'is_active', 'is_admin', 'admin_access']

    def validate(self, data):

        if 'phone' in data:
            log.debug(f"Validate phone: {data['phone']}")
            if re.match(r"^\+?1?\d{8,15}$", data['phone'].replace(' ', '')) is None:
                log.debug(re.match(r"^\+?1?\d{8,15}$", data['phone'].replace(' ', '')))
                raise serializers.ValidationError({'phone': _(u'Incorrect phone number')})

            data['phone'] = re.sub('[^0-9]', '', data['phone'])

            if User.objects.filter(phone=data['phone']).exclude(id=self.instance.id).exists():
                raise serializers.ValidationError({'phone': _(u'Phone already registered')})

            if self.instance.phone == data['phone']:
                del data['phone']

        if 'email' in data:
            if User.objects.filter(email=data['email']).exclude(id=self.instance.id).exists():
                raise serializers.ValidationError({'email': _(u'Email already registered')})

            if self.instance.email == data['email']:
                del data['email']

        return data
