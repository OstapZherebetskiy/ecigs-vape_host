# -*- coding: utf-8 -*-

from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from .serializers import UserSerializer

from account.tasks import task_send_email_verification_code



class UserAPI(generics.RetrieveUpdateDestroyAPIView, generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user

    def get(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_object())
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        return self.update_with_email_verification(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update_with_email_verification(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        if 'email' in serializer.validated_data:
            task_send_email_verification_code(self.request.user.id)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny(),]
        return super().get_permissions()

    def update_with_email_verification(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        if 'email' in serializer.validated_data:
            task_send_email_verification_code(self.request.user.id)

        self.request.user.refresh_from_db()
        return Response(UserSerializer(self.request.user).data)

    def partial_update_with_email_verification(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update_with_email_verification(request, *args, **kwargs)
