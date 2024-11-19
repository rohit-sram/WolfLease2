"""
    This is url file to add urls for respective models.
"""

from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import (
    UserListCreateView,
    UserDetailView,
    UserPreferenceListCreateView,
    UserPreferenceDetailView,
    add_preferences,
)

router = DefaultRouter()
'''This is default Router'''

urlpatterns = [
    path('', include(router.urls)),
    path('owners', views.OwnerViewSet.as_view()),
    path('owners/<str:pk>', views.OwnerViewSet.as_view()),
    path('flats', views.FlatViewSet.as_view()),
    path('flats/<str:pk>', views.FlatViewSet.as_view()),
    path('lease', views.LeaseViewSet.as_view()),
    path('lease/<str:pk>', views.LeaseViewSet.as_view()),
    path('interests', views.InterestedViewSet.as_view()),
    path('interests/<str:pk>', views.InterestedViewSet.as_view()),
    path('apartments', views.ApartmentViewSet.as_view()),
    path('apartments/<str:pk>', views.ApartmentViewSet.as_view()),
    # path('users', views.UserViewSet.as_view()),
    # path('users/<str:pk>', views.UserViewSet.as_view()),
    path('userpreferences/',
         UserPreferenceListCreateView.as_view(),
         name='user-preference-list-create'),
    path('userpreferences/<int:pk>/',
         UserPreferenceDetailView.as_view(),
         name='user-preference-detail'),
    path('users/', UserListCreateView.as_view(), name='user-list-create'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('users/<int:pk>/add_preferences/',
         add_preferences,
         name='user-add-preferences'),
]
'''Rest API endpoints'''
