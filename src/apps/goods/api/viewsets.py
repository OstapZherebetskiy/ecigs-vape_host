# -*- coding: utf-8 -*-

from rest_framework import generics, viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .serializers import CategorySerializer, GoodSerializer

from goods.models import Category, Good



class CategoryListCreateView(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Category.objects.all()
        return queryset


class GoodViewSet(viewsets.ViewSet):

    def get(self, request):
        goods = Good.objects.all()
        serializer = GoodSerializer(goods, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = GoodSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        try:
            good = Good.objects.get(pk=pk)
            serializer = GoodSerializer(good)
            return Response(serializer.data)
        except Good.DoesNotExist:
            return Response({"error": "Good not found."}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk=None):
        try:
            good = Good.objects.get(pk=pk)
            serializer = GoodSerializer(good, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Good.DoesNotExist:
            return Response({"error": "Good not found."}, status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, pk=None):
        try:
            good = Good.objects.get(pk=pk)
            serializer = GoodSerializer(good, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Good.DoesNotExist:
            return Response({"error": "Good not found."}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk=None):
        try:
            good = Good.objects.get(pk=pk)
            good.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Good.DoesNotExist:
            return Response({"error": "Good not found."}, status=status.HTTP_404_NOT_FOUND)
