from django.urls import path
from patients_app.api.views import PatientList,PatientDetail,AppointmentDetail,AppointmentList,AppointmentCreate

urlpatterns = [
    path("patient",PatientList.as_view(),name="patient-list"),
    path("patient/<str:pk>",PatientDetail.as_view(),name="patient-detail"),
    path("appointment",AppointmentList.as_view(),name="appointment-list"),
    path("book/appointment",AppointmentCreate.as_view(),name="bookappointment"),
    path("appointment/<int:pk>",AppointmentDetail.as_view(),name="appointment-detail")
]
