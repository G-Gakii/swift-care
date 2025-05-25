from doctors_app.models import Doctor
from doctors_app.api.serializers import DoctorSerializer
from rest_framework import generics
from doctors_app.api.permissions import IsOwnerOrAdmin
from rest_framework.permissions import IsAuthenticated



class DoctorList(generics.ListCreateAPIView):
    queryset = Doctor.objects.all()
    serializer_class =DoctorSerializer


class DoctorDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsOwnerOrAdmin]
    queryset = Doctor.objects.all()
    serializer_class =DoctorSerializer