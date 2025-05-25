from rest_framework.permissions import BasePermission

class IsOwnerOrAdmin(BasePermission):
    
    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated:
            return request.user == obj.user or request.user.role == "admin"  # Owner or Admin
        return False
