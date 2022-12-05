"""
    This is the application starting point where you can register different modules.
"""


from django.apps import AppConfig


class AuthenticationConfig(AppConfig):
    """
    Authentication app config
    """
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'authentication'
