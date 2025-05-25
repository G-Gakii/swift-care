from rest_framework import serializers
from doctors_app.models import Doctor
from user_app.api.serializers import CustomUserSerializer
from user_app.models import CustomUser
from rest_framework import serializers


class DoctorSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True)  # Instead of nested user object
    password = serializers.CharField(write_only=True)
    role = serializers.CharField(read_only=True, source="user.role")
    class Meta:
        model=Doctor
        fields = ["email", "password", "identification_number", "full_name","availability", "specialization", "phone_number","role"]
        
    def create(self, validated_data):
        # Extract email & password separately
            email = validated_data.pop("email")
            password = validated_data.pop("password")

        # Create doctor instance with linked user
            user = CustomUser.objects.create_user(email=email, password=password, role="doctor")
            doctor = Doctor.objects.create(user=user, **validated_data)
            return doctor

       