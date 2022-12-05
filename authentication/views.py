"""
    This is a file to add views for models.
"""

from .serializers import RegisterSerializer, LoginSerializer
from rest_framework import generics
from rest_framework.authtoken.models import Token
from rest_framework import permissions, views
from rest_framework.response import Response
from django.contrib.auth import login


class RegisterView(generics.CreateAPIView):
    """
    Register a new user.
    """
    permission_classes = (permissions.AllowAny, )
    serializer_class = RegisterSerializer


class LoginView(views.APIView):
    """
    Login a user.
    """
    permission_classes = (permissions.AllowAny, )

    def post(self, request):
        """
        Login a user.
        Arguments:
        request {[type]} -- [description]
        Returns:
        [type] -- [description]
        """
        serializer = LoginSerializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        token, _ = Token.objects.get_or_create(user=user)
        token = str(token)

        login(request, user)
        content = {'message': 'Login successfull', 'token': token}
        return Response(content)


class LogoutView(views.APIView):
    """
    Logout a user.
    """

    def get(self, request):
        """
        Logout a user.
        Arguments:
        request {[type]} -- [description]
        Returns:
        [type] -- [description]
        """
        request.user.auth_token.delete()
        content = {'message': 'Logout successfull'}
        return Response(content)
