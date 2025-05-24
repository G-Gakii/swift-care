from rest_framework import serializers
from user_app.models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["email", "password"]  
        extra_kwargs = {"password": {"write_only": True}}  # Ensure password isn't exposed