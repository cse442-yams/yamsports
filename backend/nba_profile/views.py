from rest_framework import generics

from nba_profile.models import NBAPlayer
from nba_profile.serializers import NBAPlayerBasicSerializer


class NBAPlayersList(generics.ListAPIView):
    queryset = NBAPlayer.objects.all()
    serializer_class = NBAPlayerBasicSerializer
