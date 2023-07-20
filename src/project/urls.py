# -*- coding: utf-8 -*-

from django.conf import settings
from django.urls import path, re_path, include
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls.i18n import i18n_patterns
from django.contrib import admin
from django.views.generic import RedirectView



urlpatterns = i18n_patterns(
    re_path(r'^%s/' % settings.ADMIN_LOCATION_URL, admin.site.urls),
    re_path(r'^account/', include('account.urls')),
    re_path(r'^i18n/', include('django.conf.urls.i18n')),

    re_path(r'^$', RedirectView.as_view(url='/%s/' % settings.ADMIN_LOCATION_URL)),
    prefix_default_language=False
)

if settings.DEBUG is True:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + staticfiles_urlpatterns()
