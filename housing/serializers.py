"""
    This is a serializer file to add different serializers for the database.
"""

from rest_framework import serializers
from housing import models
from rest_framework.authtoken.models import Token
from rest_framework.validators import ValidationError
from django.contrib.auth.hashers import make_password
from .models import User, UserPreference


class UserPreferenceSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.UserPreference
        fields = ['id', 'preference_type']


class UserSerializer(serializers.ModelSerializer):
    """
        This is UserSerializer for User model.
    """

    class Meta:
        """
            This class contains fields to be serialized.
        """
        model = models.User
        '''User model '''
        fields = '__all__'
        '''User field '''

    def create(self, validated_data):
        user_preferences_data = validated_data.pop('user_preferences', [])
        user = User.objects.create(**validated_data)
        for preference_data in user_preferences_data:
            preference, created = UserPreference.objects.get_or_create(
                **preference_data)
            user.user_preferences.add(preference)
        return user


class FlatSerializer(serializers.ModelSerializer):
    """
        This is FlatSerializer for Flat model.
    """

    class Meta:
        """
            This class contains fields to be serialized.
        """
        model = models.Flat
        '''Flat model'''
        fields = '__all__'
        '''Flat fields'''


class OwnerSerializer(serializers.ModelSerializer):
    """
        This is OwnerSerializer for Owner model.
    """

    class Meta:
        """
            This class contains fields to be serialized.
        """
        model = models.Owner
        '''Owner model'''
        fields = '__all__'
        '''Owner fields'''


class InterestedSerializer(serializers.ModelSerializer):
    """
        This is InterestedSerializer for Interested model.
    """

    class Meta:
        """
            This class contains fields to be serialized.
        """
        model = models.Interested
        '''Interested model'''
        fields = '__all__'
        '''Interested fields'''


class LeaseSerializer(serializers.ModelSerializer):
    """
        This is LeaseSerializer for Lease model.
    """

    class Meta:
        """
            This class contains fields to be serialized.
        """
        model = models.Lease
        '''Lease model'''
        fields = '__all__'
        '''Lease fields'''


class ApartmentSerializer(serializers.ModelSerializer):
    """
        This is ApartmentSerializer for Apartment model.
    """

    class Meta:
        """
            This class contains fields to be serialized.
        """
        model = models.Apartment
        '''Apartment model'''
        fields = '__all__'
        '''Apartment fields'''
