from patients_app.models import Patient,Appointment
from rest_framework import serializers
from user_app.models import CustomUser

class PatientSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True) 
    password = serializers.CharField(write_only=True)
    role = serializers.CharField(read_only=True, source="user.role")
    class Meta:
        model=Patient
        fields = ["email", "password", "identification_number", "full_name", "date_of_birth", "phone_number", "insurance_provider", "role"]
        
    def create(self, validated_data):
        # Extract email & password separately
        email = validated_data.pop("email")
        password = validated_data.pop("password")

        # Create user with patient role
        user = CustomUser.objects.create_user(email=email, password=password, role="patient")

        # Create doctor instance linked to the new user
        patient = Patient.objects.create(user=user, **validated_data)

        return patient
    
class AppointmentSerializer(serializers.ModelSerializer):
    patient = serializers.PrimaryKeyRelatedField(read_only=True)  # ✅ Prevent direct patient object modification
    doctor = serializers.PrimaryKeyRelatedField(read_only=True)   # ✅ Prevent direct doctor object modification
    class Meta:
        model=Appointment
        fields="__all__"
        