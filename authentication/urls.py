from django.urls import path
from authentication.views import RegisterView, LoginView


urlpatterns = [
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('login/', LoginView.as_view(), name='auth_login'),
]