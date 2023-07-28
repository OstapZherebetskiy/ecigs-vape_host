# -*- coding: utf-8 -*-

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from orders.models import Order

from .serializers import OrderSerializer



class OrderViewSet(viewsets.ViewSet):

    def get(self, request):
        if not request.user.is_authenticated:
            return Response({"error": "Authentication required."}, status=status.HTTP_401_UNAUTHORIZED)

        if request.user.is_admin or request.user.admin_access:
            orders = Order.objects.all()
        else:
            orders = Order.objects.filter(user=request.user)

        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        order = get_object_or_404(Order, pk=pk)
        if not request.user.is_authenticated or not (request.user.is_admin or request.user.admin_access or order.user == request.user):
            return Response({"error": "Permission denied."}, status=status.HTTP_403_FORBIDDEN)

        serializer = OrderSerializer(order)
        return Response(serializer.data)

    def put(self, request, pk=None):
        order = get_object_or_404(Order, pk=pk)
        if not request.user.is_authenticated or not (request.user.is_admin or order.user == request.user):
            return Response({"error": "Permission denied."}, status=status.HTTP_403_FORBIDDEN)

        serializer = OrderSerializer(order, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk=None):
        order = get_object_or_404(Order, pk=pk)
        if not request.user.is_authenticated or not (request.user.is_admin or order.user == request.user):
            return Response({"error": "Permission denied."}, status=status.HTTP_403_FORBIDDEN)

        serializer = OrderSerializer(order, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
