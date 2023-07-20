# -*- coding: utf-8 -*-

import mimetypes
from django.conf import settings
from django.http import Http404, HttpResponse
from django.contrib.auth.decorators import login_required
from django.views.static import serve


from logging import getLogger
log = getLogger(__name__)



@login_required
def account_media_preview(request, path):
    """ ADMIN ONLY """
    if request.user.has_perm('account.view_user') is True:
        if settings.PROTECTED_MEDIA_SERVER == 'django':
            response = serve(
                request, path, document_root=f'{settings.VAR_DIR}/htdocs/media',
                show_indexes=False
            )
            return response
        else:
            mimetype, encoding = mimetypes.guess_type(f'{settings.VAR_DIR}/htdocs/media/{path}')
            response = HttpResponse()
            response["Content-Type"] = mimetype
            response['X-Accel-Redirect'] = f'/media/{path}'
            return response
    else:
        raise Http404()


@login_required
def account_media_view(request, field):
    if value := getattr(request.user, field):
        if settings.PROTECTED_MEDIA_SERVER == 'django':
            response = serve(
                request, value.name, document_root=f'{settings.VAR_DIR}/htdocs/media',
                show_indexes=False
            )
            return response
        else:
            mimetype, encoding = mimetypes.guess_type(f'{value.path}')
            response = HttpResponse()
            response["Content-Type"] = mimetype
            response['X-Accel-Redirect'] = f'{value.path.split("htdocs")[1]}'
            return response
    else:
        raise Http404()
