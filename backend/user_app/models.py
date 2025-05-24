from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

# Create your models here.

class CustomUserManager(BaseUserManager):
    def create_user(self,email,password=None,role=None):
        if not email:
            raise ValueError("User must have email address")
         # Check if email already exists
        if CustomUser.objects.filter(email=email).exists():
            raise ValueError("A user with this email already exists")
        user=self.model(email=self.normalize_email(email),role=role)
        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(self,email,password=None):
        user=self.create_user(email,password,role="admin")
        user.is_admin=True
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser):
    ROLE_CHOICES=(
        ('patient','patient'),
        ('doctor','doctor'),
        ('admin', 'Admin'),
    )
    email=models.EmailField(unique=True)
    role=models.CharField(max_length=10,choices=ROLE_CHOICES)
    is_admin=models.BooleanField(default=False)
    
    objects=CustomUserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['role']
    
    def __str__(self):
        return self.email 