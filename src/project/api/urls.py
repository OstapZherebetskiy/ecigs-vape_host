# -*- coding: utf-8 -*-

from django.conf import settings
from django.urls import re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from drf_yasg.generators import OpenAPISchemaGenerator
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView)



class BothHttpAndHttpsSchemaGenerator(OpenAPISchemaGenerator):
    def get_schema(self, request=None, public=False):
        schema = super().get_schema(request, public)
        schema.schemes = ["http", "https"]
        return schema

schema_view = get_schema_view(
   openapi.Info(
      title="Ecigs API",
      default_version='v1',
      description="Ecigs-vape",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="salitrunskyy@gmail.com"),
   ),
   public=True if settings.DEBUG is True else False,
    generator_class=BothHttpAndHttpsSchemaGenerator,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    re_path(r'^token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    re_path(r'^token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
