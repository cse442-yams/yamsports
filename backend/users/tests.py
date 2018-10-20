import json
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient

from .models import CustomUser


class UserAuthTest(APITestCase):
    client = APIClient()

    def setUp(self):
        self.user = CustomUser.objects.create_user(username="test", email="test@gmail.com", password="testing")

    def test_valid_login(self):
        url = reverse("rest_login")

        response = self.client.post(
            url,
            data=json.dumps({"username": "test", "password": "testing"}),
            content_type="application/json"
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("key", response.data)

    def test_invalid_login(self):
        url = reverse("rest_login")

        response = self.client.post(
            url,
            data=json.dumps({"username": "test", "password": "testing wrong"}),
            content_type="application/json"
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertNotIn("key", response.data)

