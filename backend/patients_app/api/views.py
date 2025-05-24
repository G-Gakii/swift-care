from patients_app.models import Patient,Appointment
from patients_app.api.serializers import PatientSerializer,AppointmentSerializer
from doctors_app.models import Doctor
from rest_framework import generics
from patients_app.api.permissions import IsPatientorAdmin,IsDoctororAdmin
from rest_framework.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import ValidationError
from datetime import timedelta



class PatientList(generics.ListCreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


class PatientDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Patient.objects.all()
    serializer_class =PatientSerializer
    
    
class AppointmentList(generics.ListCreateAPIView):
    permission_classes=[IsPatientorAdmin]
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    def perform_create(self, serializer):
        if self.request.user.role != "patient":
            raise PermissionDenied("Only patients can create appointments.")
         # Retrieve the Patient instance linked to the logged-in user
        try:
            patient = Patient.objects.get(user=self.request.user)
        except Patient.DoesNotExist:
            raise PermissionDenied("No patient profile found for this user.")
        # Retrieve doctor instance from request data
        doctor_id = self.request.data.get("doctor")
        doctor = get_object_or_404(Doctor, identification_number=doctor_id)  # ✅ Ensures doctor exists before saving
        
        # Extract appointment details
        appointment_time = serializer.validated_data["appointment_time"]
        appointment_day = appointment_time.strftime("%A")  # Get the day of the week

    # Validate availability
        doctor_availability = doctor.availability.get(appointment_day)
        if not doctor_availability:
            raise ValidationError(f"{doctor.full_name} is not available on {appointment_day}.")

        start_time, end_time = doctor_availability.split(" - ")
        if not (start_time <= appointment_time.strftime("%H:%M") <= end_time):
            raise ValidationError(f"{doctor.full_name} is only available between {start_time} and {end_time} on {appointment_day}.")
        
         #prevent double booking
        existing_appointment=Appointment.objects.filter(doctor=doctor,patient=patient,status="scheduled").exists()
        if existing_appointment:
            raise ValidationError(f"You  have already booked appointment with this doctor")
        
        buffer_duration = timedelta(minutes=60)
        # Check if the doctor is already booked within the buffer period
        conflicting_appointment = Appointment.objects.filter(
        doctor=doctor,
        appointment_time__gte=appointment_time - buffer_duration,
        appointment_time__lte=appointment_time + buffer_duration
    ).exists()

        if conflicting_appointment:
            raise ValidationError(f"{doctor.full_name} is **already booked** around {appointment_time}. Please choose another time.")
        
       
        

        serializer.save(patient=patient,doctor=doctor)  
    
        


class AppointmentDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes=[IsDoctororAdmin] #Ensures only doctors/admins can modify appointments
    queryset = Appointment.objects.all()
    serializer_class =AppointmentSerializer