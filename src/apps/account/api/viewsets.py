# -*- coding: utf-8 -*-

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import UserSerializer

from account.tasks import task_send_email_verification_code



class UserDetail(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class UserUpdate(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        if self.request.method == 'PATCH':
            partial = True
        else:
            partial = False
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        if 'email' in serializer.validated_data:
            task_send_email_verification_code(self.request.user.id)

        self.request.user.refresh_from_db()
        return Response(UserSerializer(self.request.user).data)
