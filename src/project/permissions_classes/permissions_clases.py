from rest_framework.permissions import BasePermission, SAFE_METHODS


class GoodsPermission(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        elif bool(request.user and request.user.is_authenticated):
            return getattr(request.user, "is_admin", False)
        return False
