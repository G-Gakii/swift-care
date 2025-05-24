from django.urls import path
from doctors_app.api.views import DoctorList,DoctorDetail

urlpatterns = [
    path("doctor",DoctorList.as_view(),name="doctor"),
    path("doctor/<str:pk>",DoctorDetail.as_view(),name="doctors_details")
]
