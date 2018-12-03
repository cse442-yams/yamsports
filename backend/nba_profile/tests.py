from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from django.urls import reverse
from django.utils.timezone import now

from nba_profile.models import *
from users.models import CustomUser


class UserTeamsTest(APITestCase):
    client = APIClient()

    def setUp(self):
        self.user = CustomUser.objects.create_user(username='test', password='testing')

    def test_list_teams(self):
        team = UserTeam.objects.create(user=self.user)
        team.players.set(NBAPlayer.objects.all()[:5])

        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse('user-teams-list'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.data
        self.assertEqual(len(data), 1)
        self.assertEqual(len(data[0]['players']), 5)
        self.assertIn('first_name', data[0]['players'][0])

    def test_user_only_gets_own_teams(self):
        team = UserTeam.objects.create(user=self.user)
        team.players.set(NBAPlayer.objects.all()[:5])

        # Create another user with their own team
        otheruser = CustomUser.objects.create_user(username='other', password='otherpass')
        otherteam = UserTeam.objects.create(user=otheruser)
        otherteam.players.set(NBAPlayer.objects.all()[5:10])

        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse('user-teams-list'))
        data = response.data

        # Assert that otheruser's team is not in the list
        self.assertEqual(len(data), 1)
        self.assertNotEqual(data[0]['id'], otherteam.id)

    def test_create_team(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(reverse('user-teams-list'), data={'player_ids': [1, 2, 3], "name": "new team"})

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_team(self):
        team = UserTeam.objects.create(user=self.user)
        team.players.set(NBAPlayer.objects.all()[:5])

        self.client.force_authenticate(user=self.user)
        response = self.client.patch(reverse('user-teams-update', args=[1]), data={'player_ids': [10], "name": team.name})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        team.refresh_from_db()
        self.assertEqual(team.players.count(), 1)
        self.assertEqual(team.players.get().id, 10)

    def test_update_name(self):
        team = UserTeam.objects.create(user=self.user)
        team.players.set(NBAPlayer.objects.all()[:5])

        self.client.force_authenticate(user=self.user)
        response = self.client.patch(reverse('user-teams-update', args=[1]), data={'name': 'newname', 'player_ids': [1, 2, 3, 4, 5]})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        team.refresh_from_db()
        self.assertEqual(team.name, 'newname')
        self.assertEqual(team.players.count(), 5)


class PlayerStatsTest(APITestCase):
    client = APIClient()

    fixtures = ['stats.json']

    def setUp(self):
        self.player = NBAPlayer.objects.first()

    def test_next_game(self):
        next_game = self.player.next_game()
        self.assertGreater(next_game.start_time_utc, now())
