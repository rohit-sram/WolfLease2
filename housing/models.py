'''
    This is the database strcuture of the models.
    Create your models here.

'''

from enum import unique
from ssl import OP_ENABLE_MIDDLEBOX_COMPAT
from django.db import models
import uuid


class Owner(models.Model):
    """
    This is a Owner database structure.
    """
    contact_number = models.CharField(max_length=12)
    '''Contact number of Owner'''
    contact_email = models.EmailField(unique=True, max_length=30)
    '''Contact email of Owner'''
    password = models.CharField(max_length=50)
    '''Password of Owner'''


class Apartment(models.Model):
    """
    This is Apartment database structure.
    """
    address = models.CharField(max_length=256)
    '''Address of Apartment'''
    facilities = models.CharField(max_length=512)
    '''Facilities of Apartment'''
    owner_id = models.ForeignKey(to=Owner, on_delete=models.DO_NOTHING)
    '''Owner ID of respective Apartment'''
    owner_id = models.ForeignKey(to=Owner,
                                 null=True,
                                 on_delete=models.SET_NULL)


class Lease(models.Model):
    """
    This is Lease database structure.
    """
    lease_start_date = models.DateField()
    '''Start of lease date'''
    lease_end_date = models.DateField()
    '''End of lease date'''


class Flat(models.Model):
    """
    This is Flat database structure.
    """
    availability = models.BooleanField(default=False)
    '''Availibility of Flat'''
    associated_apt_id = models.ForeignKey(to=Apartment,
                                          on_delete=models.DO_NOTHING)
    '''Associated ID of respective Flat'''
    lease_id = models.ForeignKey(to=Lease, on_delete=models.DO_NOTHING)
    '''Lease ID of respective Flat'''
    associated_apt_id = models.ForeignKey(to=Apartment,
                                          on_delete=models.CASCADE)
    lease_id = models.ForeignKey(to=Lease,
                                 null=True,
                                 on_delete=models.SET_NULL)
    rent_per_room = models.IntegerField()
    '''Rent per room of Flat'''
    floor_number = models.IntegerField()
    '''Floor number of Flat'''


class UserPreference(models.Model):
    """
    This model represents the dietary preferences for a User.
    """
    preference_type = models.CharField(max_length=20, unique=True)
    '''Dietary preference of the user (e.g., "veg", "non-veg", etc.)'''

    def __str__(self):
        return self.preference_type


class User(models.Model):
    """
    This is User database structure.
    """
    flat_id = models.ForeignKey(to=Flat, null=True, on_delete=models.SET_NULL)
    '''Flat ID of User'''
    contact_number = models.CharField(max_length=12)
    '''Contact number of User'''
    contact_email = models.EmailField(unique=True, max_length=30)
    '''Contact email of User'''
    password = models.CharField(max_length=50)
    '''Password of User'''
    user_type = models.CharField(max_length=20, default="Guest")
    '''Type of User'''
    dob = models.DateField()
    '''Date of Birth of User'''
    gender = models.CharField(default="M", max_length=2)
    '''Gender of User'''
    pref_smoking = models.CharField(default="N", max_length=2)
    '''Smoking preference of User'''
    pref_drinking = models.CharField(default="N", max_length=2)
    '''Drinking preference of User'''
    pref_veg = models.CharField(default="N", max_length=2)
    '''Vegetarian preference of User'''
    user_preferences = models.ManyToManyField(UserPreference, blank=True)
    '''Dietary preferences of the user'''

    def __str__(self):
        """
        This is used for login using email.
        """
        return self.contact_email


class Interested(models.Model):
    """
    This is Interested database structure.
    """
    apartment_id = models.ForeignKey(to=Apartment, on_delete=models.DO_NOTHING)
    '''Generated ID of respective Apartment'''
    flat_id = models.ForeignKey(to=Flat, on_delete=models.CASCADE)
    '''Flat ID of respective Flat'''
    user_id = models.ForeignKey(to=User, on_delete=models.DO_NOTHING)
    '''User ID of respective User'''
