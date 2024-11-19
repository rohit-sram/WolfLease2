"""
    This is url file to add urls for respective models.
"""

from django.urls import path
from authentication.views import RegisterView, LoginView, LogoutView, GetUserView
"""
Authentication urls
"""
urlpatterns = [
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('login/', LoginView.as_view(), name='auth_login'),
    path('logout/', LogoutView.as_view(), name='auth_logout'),
    path('get-user/', GetUserView.as_view(), name='get_user'),
]
