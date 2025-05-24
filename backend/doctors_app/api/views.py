from doctors_app.models import Doctor
from doctors_app.api.serializers import DoctorSerializer
from rest_framework import generics


class DoctorList(generics.ListCreateAPIView):
    queryset = Doctor.objects.all()
    serializer_class =DoctorSerializer


class DoctorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Doctor.objects.all()
    serializer_class =DoctorSerializer