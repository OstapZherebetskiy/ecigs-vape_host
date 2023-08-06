from rest_framework.response import Response


class BaseECIGSException(Exception):
    def __init__(self, status_code=None, detail=None, error_type=None, extra=None, **kwargs):

        super().__init__(self, detail)
        self.atidls_status_code = status_code
        self.extra = extra
        self.error_type = error_type

        self.detail = detail
        # Easily convert a list to a string for display
        if isinstance(self.detail, list):
            self.detail = ', '.join(map(str, self.detail))

    def __str__(self):
        return f"{self.detail}"


# raise exception function
def raise_ecigs_exception(status_code: int, detail=None, error_type=None, extra=None, **kwargs):
    raise BaseECIGSException(status_code=status_code, detail=detail, extra=extra,
                             error_type=error_type, **kwargs)


def _handle_ecigs_exceptions(func):
    ''' Decorator for functions to catch atidls exceptions and return proper responses '''
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except BaseECIGSException as e:
            error_body = {
                'detail': e.detail,
                'extra': e.extra,
                'error_type': e.error_type,
            }
            return Response(error_body, e.atidls_status_code)
    return wrapper


def handle_ecigs_exceptions(cls):
    class NewCls(cls):
        ''' Decorator for view classed to manage allowed and not allowed methods and return proper responses '''
        METHODS = {'get', 'post', 'put', 'patch', 'delete'}

        def __init__(self, *args, **kwargs):
            super(cls, self).__init__(*args, **kwargs)  # init parent class

            @_handle_ecigs_exceptions  # decorator to catch thrown atidls exception and return proper response
            def raise_method_not_allowed_exception(self, request, pk=None):  # will be called for not allowed methods
                raise_ecigs_exception(400, 'Cannot perform this action', 'method_not_allowed', f'allowed methods {self.included_methods}')

            self.included_methods = {
                method for method in self.METHODS if method in dir(self) and callable(getattr(self, method))
            }   # set of methods allowed in this view
            self.excluded_methods = self.METHODS - self.included_methods  # set of methods not allowed in this view

            for method in self.included_methods:    # for each allowed method catch atidls exceptions
                if callable(getattr(self, method)):
                    setattr(self, method, _handle_ecigs_exceptions(getattr(self, method)))

            for excluded_method in self.excluded_methods:  # for each not allowed method throw atidls exception
                setattr(cls, excluded_method, raise_method_not_allowed_exception)

    return NewCls
