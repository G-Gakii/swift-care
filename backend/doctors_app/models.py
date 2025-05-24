from django.db import models
from user_app.models import CustomUser

# Create your models here.

    
class Doctor(models.Model):
    user=models.OneToOneField(CustomUser,on_delete=models.CASCADE)
    identification_number=models.CharField(primary_key=True,max_length=15)
    full_name=models.CharField(max_length=255)
    specialization=models.CharField(max_length=255)
    phone_number=models.CharField(max_length=15)
    availability=models.JSONField()
    created_at=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.indentification_number