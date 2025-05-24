from django.urls import path
from user_app.api.views import EmailLoginView


urlpatterns = [
    path("auth/login/",EmailLoginView.as_view(),name="login")
]
