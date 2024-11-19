"""
    This is a file to add views for models. 
"""

from django.shortcuts import render
from rest_framework import filters, viewsets, generics, status
from housing import serializers
from housing import models
from .models import User, UserPreference
from .serializers import UserSerializer, UserPreferenceSerializer
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view  # Ensure this import is here


# Create your views here.
class UserPreferenceListCreateView(generics.ListCreateAPIView):
    queryset = UserPreference.objects.all()
    serializer_class = UserPreferenceSerializer


class UserPreferenceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserPreference.objects.all()
    serializer_class = UserPreferenceSerializer


class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        user_preferences_data = request.data.pop('user_preferences', [])

        # Check if a user with this email already exists
        if User.objects.filter(
                contact_email=request.data.get("contact_email")).exists():
            return Response({"error": "User with this email already exists."},
                            status=status.HTTP_400_BAD_REQUEST)

        user_serializer = self.get_serializer(data=request.data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()

        # Add user preferences
        for preference_data in user_preferences_data:
            preference, created = UserPreference.objects.get_or_create(
                **preference_data)
            user.user_preferences.add(preference)

        headers = self.get_success_headers(user_serializer.data)
        return Response(user_serializer.data,
                        status=status.HTTP_201_CREATED,
                        headers=headers)


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


@api_view(['POST'])
def add_preferences(request, pk):
    """
    Adds preferences to a user by user ID.
    """
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response({"error": "User not found."},
                        status=status.HTTP_404_NOT_FOUND)

    serializer = UserPreferenceSerializer(data=request.data, many=True)
    if serializer.is_valid():
        for pref_data in serializer.validated_data:
            preference, created = UserPreference.objects.get_or_create(
                **pref_data)
            user.user_preferences.add(preference)
        return Response(UserSerializer(user).data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # class UserViewSet(generics.ListCreateAPIView,generics.RetrieveUpdateDestroyAPIView):
    """
    This viewset automatically provides CRUD actions for User model.
    """

    # Add search fields to the user view set
    search_fields = ['contact_email', 'contact_number']
    '''Search fields for Userviewset'''
    filter_backends = (filters.SearchFilter, )
    '''This is used for filtering Userviewset'''
    queryset = models.User.objects.all()
    '''Database query parameters Userviewset'''
    serializer_class = serializers.UserSerializer


class FlatViewSet(generics.ListCreateAPIView,
                  generics.RetrieveUpdateDestroyAPIView):
    """
    This viewset automatically provides CRUD actions for Flat model.
    """
    search_fields = ['availability', 'rent_per_room']
    '''Search fields for Flatviewset'''
    filter_backends = (filters.SearchFilter, )
    '''This is used for filtering Flatviewset'''
    queryset = models.Flat.objects.all()
    '''Database query parameters Flatviewset'''
    serializer_class = serializers.FlatSerializer


class OwnerViewSet(generics.ListCreateAPIView,
                   generics.RetrieveUpdateDestroyAPIView):
    """
    This viewset automatically provides CRUD actions for Owner model.
    """
    search_fields = ['contact_email', 'contact_number', 'id']
    '''Search fields for Ownerviewset'''
    filter_backends = (filters.SearchFilter, )
    '''This is used for filtering Ownerviewset'''
    queryset = models.Owner.objects.all()
    '''Database query parameters Ownerviewset'''
    serializer_class = serializers.OwnerSerializer


class InterestedViewSet(generics.ListCreateAPIView,
                        generics.RetrieveUpdateDestroyAPIView):
    """
    This viewset automatically provides CRUD actions for Interested model.
    """
    search_fields = ['apartment_id', 'flat_id', 'user_id']
    '''Search fields for Interestedviewset'''
    filter_backends = (filters.SearchFilter, )
    '''This is used for filtering Interestedviewset'''
    queryset = models.Interested.objects.all()
    '''Database query parameters Interestedviewset'''
    serializer_class = serializers.InterestedSerializer


class LeaseViewSet(generics.ListCreateAPIView,
                   generics.RetrieveUpdateDestroyAPIView):
    """
    This viewset automatically provides CRUD actions for Lease model.
    """
    search_fields = ['lease_start_date', 'lease_end_date']
    '''Search fields for Leaseviewset'''
    filter_backends = (filters.SearchFilter, )
    '''This is used for filtering Leaseviewset'''
    queryset = models.Lease.objects.all()
    '''Database query parameters Leaseviewset'''
    serializer_class = serializers.LeaseSerializer


class ApartmentViewSet(generics.ListCreateAPIView,
                       generics.RetrieveUpdateDestroyAPIView):
    """
    This viewset automatically provides CRUD actions for Apartment model.
    """

    search_fields = ['address', 'facilities', 'owner_id']
    '''Search fields for Apartmentviewset'''
    search_fields = ['address', 'facilities']
    filter_backends = (filters.SearchFilter, )
    '''This is used for filtering Apartmentviewset'''
    queryset = models.Apartment.objects.all()
    '''Database query parameters Apartmentviewset'''
    serializer_class = serializers.ApartmentSerializer
