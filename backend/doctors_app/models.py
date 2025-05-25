from django.db import models
from user_app.models import CustomUser
from django.core.validators import MinLengthValidator,RegexValidator
from django.core.validators import RegexValidator
import json
from django.core.exceptions import ValidationError

#Validate phone format to ensure only digits are allowed.
phone_regex = RegexValidator(
    regex=r'^\d{10,15}$', 
    message="Phone number must be between 10 and 15 digits."
)
#ensures that the availability field contains a valid JSON object
def validate_availability(value):
    if isinstance(value, str):  # Convert only if it's a string
        try:
            value = json.loads(value)
        except json.JSONDecodeError:
            raise ValidationError("Invalid JSON format.")

    if not isinstance(value, dict):  # Final check
        raise ValidationError("Availability must be a JSON object.")

    
class Doctor(models.Model):
    user=models.OneToOneField(CustomUser,on_delete=models.CASCADE)
    identification_number=models.CharField(primary_key=True,max_length=15,unique=True,validators=[MinLengthValidator(5)])
    full_name=models.CharField(max_length=255,blank=False)
    specialization=models.CharField(max_length=255,blank=False)
    phone_number=models.CharField(max_length=15,validators=[phone_regex],unique=True)
    availability=models.JSONField(validators=[validate_availability])
    created_at=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.indentification_number