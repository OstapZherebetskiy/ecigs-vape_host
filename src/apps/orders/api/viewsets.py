# -*- coding: utf-8 -*-

from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework import status

from orders.models import Order

from .serializers import OrderSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated


class OrderListCreateAPIView(ListCreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = OrderSerializer

    def get_queryset(self):
        qs = Order.objects.none()
        # breakpoint()
        query_params = self.request.query_params
        # create qs with user orders or all for admin
        if bool(self.request.user and self.request.user.is_authenticated):
            user = self.request.user
            if getattr(user, "is_admin", False):
                qs = Order.objects.all()
            else:
                qs = Order.objects.filter(user=user)

        if order_id := query_params.get('order_id'):
            qs = qs.filter(id=order_id)
        if good_id := query_params.get('good_id'):
            qs = qs.filter(good__id=good_id)
        if user_id := query_params.get('user_id'):
            qs = qs.filter(user_id=user_id)
        if order_status := query_params.get('order_status'):
            qs = qs.filter(status=order_status)
        if created_at := query_params.get('created_at_date'):
            qs = qs.filter(created_at__date=created_at)
        return qs


class OrderRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    def patch(self, request, *args, **kwargs):
        user = request.user
        if self.get_object().user == user or user.is_admin:
            if self.get_object().status != 'new':
                return Response("Orders with this status can't be edited", status=status.HTTP_405_METHOD_NOT_ALLOWED)
            return super().patch(request, *args, **kwargs)
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
