from rest_framework.permissions import BasePermission,SAFE_METHODS

class IsPatientorAdmin(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False  # Prevents AnonymousUser errors
        
        if request.user.role in ["patient", "admin"]:
            return True  # Full access
        return request.method in SAFE_METHODS 
    
    
class IsDoctororAdmin(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False  # Prevents AnonymousUser errors
        
        if request.user.role in ["doctor", "admin"]:
            return True
    
        return request.method in SAFE_METHODS 