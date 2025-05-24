from django.urls import path
from patients_app.api.views import PatientList,PatientDetail,AppointmentList,AppointmentDetail

urlpatterns = [
    path("patient",PatientList.as_view(),name="patient"),
    path("patient/<str:pk>",PatientDetail.as_view(),name="patient-details"),
    path("appointment",AppointmentList.as_view(),name="appointment"),
    path("appointment/<int:pk>",AppointmentDetail.as_view(),name="appointment_details")
]
