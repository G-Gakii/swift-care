from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.contrib.auth import authenticate

class EmailLoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(email=email, password=password)  #  Authenticate using email

        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"token": token.key, "role": user.role})
        
        return Response({"error": "Invalid credentials"}, status=400)
