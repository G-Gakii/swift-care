from rest_framework.permissions import BasePermission

class IsPatientorAdmin(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False  # Prevents AnonymousUser errors
        
        return request.user.role in ["patient", "admin"]
    
    
class IsDoctororAdmin(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False  # Prevents AnonymousUser errors
        
        return request.user.role in ["doctor", "admin"]