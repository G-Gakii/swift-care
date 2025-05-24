from django.db import models
from user_app.models import CustomUser
from doctors_app.models import Doctor

# Create your models here.
class Patient(models.Model):
    identification_number=models.CharField(primary_key=True,max_length=15)
    user=models.OneToOneField(CustomUser,on_delete=models.CASCADE)
    full_name=models.CharField(max_length=255)
    phone_number=models.CharField(max_length=15)
    date_of_birth = models.DateField()
    insurance_provider = models.CharField(max_length=255)
    created_at=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.identification_number
    
    
class Appointment(models.Model):
    STATUS_CHOICE=(
        ("scheduled","scheduled"),
        ("completed","completed"),
        ("cancelled","cancelled")
                   )
    patient=models.ForeignKey(Patient,on_delete=models.CASCADE,related_name="appointments")
    doctor=models.ForeignKey(Doctor,on_delete=models.CASCADE,related_name="appointments")
    appointment_time=models.DateTimeField()
    status=models.CharField(max_length=9,choices=STATUS_CHOICE,default="scheduled")
    created_at=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Appointment with {self.doctor.full_name} for {self.patient.full_name} on {self.appointment_time}"