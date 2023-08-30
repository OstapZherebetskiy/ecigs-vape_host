from rest_framework.views import exception_handler
from rest_framework import status

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response:
        if response.status_code == 400:
            response.status_code = 404

    return response
