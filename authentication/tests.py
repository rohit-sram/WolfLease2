"""
    This is a file to add test cases for different models.
"""

from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from rest_framework import status


class AuthenticationTests(APITestCase):
    def setUp(self):
        self.register_url = reverse("auth_register")
        self.login_url = reverse("auth_login")
        self.logout_url = reverse("auth_logout")
        self.user_url = reverse("get_user")

        # Create test user
        self.test_user = User.objects.create_user(
            username="existinguser",
            password="testpass123",
            email="existing@test.com",
            first_name="Existing",
            last_name="User",
        )

    ## Registration Tests
    def test_successful_registration(self):
        data = {
            "username": "testuser",
            "email": "test@test.com",
            "password": "testpass123",
            "password2": "testpass123",
            "first_name": "Test",
            "last_name": "User",
        }
        response = self.client.post(self.register_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username="testuser").exists())

    def test_registration_password_mismatch(self):
        data = {
            "username": "testuser",
            "email": "test@test.com",
            "password": "testpass123",
            "password2": "testpass456",
            "first_name": "Test",
            "last_name": "User",
        }
        response = self.client.post(self.register_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("error", response.data)

    def test_registration_duplicate_username(self):
        data = {
            "username": "existinguser",
            "email": "new@test.com",
            "password": "testpass123",
            "password2": "testpass123",
            "first_name": "Test",
            "last_name": "User",
        }
        response = self.client.post(self.register_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    ## Login Tests
    def test_successful_login(self):
        data = {"username": "existinguser", "password": "testpass123"}
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("token", response.data)
        self.assertEqual(response.data["message"], "Login successfull")

    def test_login_invalid_credentials(self):
        data = {"username": "existinguser", "password": "wrongpass"}
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    ## Logout Tests
    def test_successful_logout(self):
        # First login to get token
        token = Token.objects.create(user=self.test_user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + token.key)

        response = self.client.get(self.logout_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["message"], "Logout successfull")

    ## User Details Tests
    def test_get_user_details(self):
        token = Token.objects.create(user=self.test_user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + token.key)

        response = self.client.get(self.user_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["username"], "existinguser")
        self.assertEqual(response.data["email"], "existing@test.com")
        self.assertEqual(response.data["first_name"], "Existing")
        self.assertEqual(response.data["last_name"], "User")

    def test_get_user_unauthorized(self):
        response = self.client.get(self.user_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
