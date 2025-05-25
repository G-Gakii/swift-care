from django.db import models
from user_app.models import CustomUser
from doctors_app.models import Doctor
from django.core.validators import MinLengthValidator,RegexValidator
from django.core.exceptions import ValidationError
from datetime import date,timezone

#Validate phone format to ensure only digits are allowed.
phone_regex = RegexValidator(
    regex=r'^\d{10,15}$', 
    message="Phone number must be between 10 and 15 digits."
)
def validate_date_of_birth(value):
    if value > date.today():
        raise ValidationError("Date of birth cannot be in the future.")
 
#Ensure the appointment is not scheduled in the past.   
def validate_appointment_time(value):
    if value < timezone.now():
        raise ValidationError("Appointment time cannot be in the past.")





# Create your models here.
class Patient(models.Model):
    identification_number=models.CharField(primary_key=True,max_length=15, 
    unique=True, 
    validators=[MinLengthValidator(5)])
    user=models.OneToOneField(CustomUser,on_delete=models.CASCADE)
    full_name=models.CharField(max_length=255,blank=False)
    phone_number=models.CharField(max_length=15,validators=[phone_regex], 
    unique=True)
    date_of_birth = models.DateField(validators=[validate_date_of_birth])
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
    appointment_time = models.DateTimeField(validators=[validate_appointment_time])
    status=models.CharField(max_length=9,choices=STATUS_CHOICE,default="scheduled")
    created_at=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Appointment with {self.doctor.full_name} for {self.patient.full_name} on {self.appointment_time}"