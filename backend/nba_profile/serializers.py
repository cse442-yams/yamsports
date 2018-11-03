from rest_framework import serializers

from nba_profile.models import NBATeam, NBAPlayer, UserTeam


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


class UserTeamSerializer(serializers.ModelSerializer):

    # https://github.com/encode/django-rest-framework/issues/5206#issuecomment-307047199
    players = NBAPlayerDetailSerializer(many=True, read_only=True)
    player_ids = serializers.PrimaryKeyRelatedField(source='players', queryset=NBAPlayer.objects.all(), many=True, write_only=True)

    class Meta:
        model = UserTeam
        fields = ('id', 'players', 'player_ids')

    def create(self, validated_data):
        user = validated_data['user']
        team = UserTeam(user=user)
        team.save()
        team.players.set(validated_data['players'])
        team.save()
        return team

    def update(self, instance: UserTeam, validated_data):
        instance.players.set(validated_data['players'])
        return instance

