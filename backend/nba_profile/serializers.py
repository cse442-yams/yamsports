from rest_framework import serializers

from nba_profile.models import NBATeam, NBAPlayer


class NBATeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = NBATeam
        fields = ('id', 'city', 'name', 'abbr')


class NBAPlayerBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = NBAPlayer
        fields = ('id', 'first_name', 'last_name', 'position')


class NBAPlayerDetailSerializer(serializers.ModelSerializer):
    current_team = NBATeamSerializer(read_only=True)

    class Meta:
        model = NBAPlayer
        fields = '__all__'
        depth = 1
