"""
    This is a serializer file to add different serializers for the database.
"""

from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth import authenticate


class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for user object.
    """
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())])

    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())])

    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        """
        Meta class to map serializer's fields with the model fields.
        """
        model = User
        fields = ('username', 'password', 'password2', 'email', 'first_name',
                  'last_name')
        extra_kwargs = {
            'first_name': {
                'required': True
            },
            'last_name': {
                'required': True
            }
        }

    def validate(self, validated_data):
        """
        Validate password and password2 fields match.
        Arguments:
        validated_data {[type]} -- [description]
        Raises:
        serializers.ValidationError -- [description]
        Returns:
        [type] -- [description]
        """
        if validated_data['password'] != validated_data['password2']:
            raise serializers.ValidationError(
                {"error": "Password fields didn't match."})

        return validated_data

    def create(self, validated_data):
        """
        Create a new user with encrypted password and return it.
        Arguments:
        validated_data {[type]} -- [description]
        Returns:
        [type] -- [description]
        """
        user = User.objects.create(username=validated_data['username'],
                                   email=validated_data['email'],
                                   first_name=validated_data['first_name'],
                                   last_name=validated_data['last_name'])

        user.set_password(validated_data['password'])
        user.save()

        return user


class LoginSerializer(serializers.Serializer):
    """
    Serializer for user login object.
    """
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    class Meta:
        """
        Meta class to map serializer's fields with the model fields.
        """
        model = User
        fields = ('username', 'password')

    def validate(self, validated_data):
        """
        Validate username and password fields match.
        Arguments:
        validated_data {[type]} -- [description]
        Raises:
        serializers.ValidationError -- [description]
        Returns:
        [type] -- [description]
        """
        user = authenticate(username=validated_data['username'],
                            password=validated_data['password'])

        if not user:
            raise serializers.ValidationError({"error": "User not found"})
        else:
            validated_data['user'] = user
            return validated_data
