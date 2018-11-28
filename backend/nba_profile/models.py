from django.db import models
from django.utils.timezone import now

from users.models import CustomUser


class NBATeam(models.Model):
    nba_id = models.PositiveIntegerField(unique=True, db_index=True)
    city = models.CharField(max_length=64)
    name = models.CharField(max_length=64)
    abbr = models.CharField(max_length=4)
    conference = models.CharField(max_length=32)
    division = models.CharField(max_length=32)
    code = models.CharField(max_length=32)
    min_year = models.PositiveSmallIntegerField()

    def all_games(self):
        return self.home_games.all() | self.away_games.all()


class NBAPlayer(models.Model):
    nba_id = models.PositiveIntegerField(unique=True, db_index=True)
    first_name = models.CharField(max_length=128)
    last_name = models.CharField(max_length=128)
    current_team = models.ForeignKey(NBATeam, on_delete=models.PROTECT, to_field='nba_id')
    jersey = models.PositiveSmallIntegerField(null=True)
    is_active = models.BooleanField()
    position = models.CharField(max_length=32)
    height = models.DecimalField(verbose_name="height in meters", max_digits=3, decimal_places=2, null=True)
    weight = models.DecimalField(verbose_name="weight in kilograms", max_digits=5, decimal_places=2, null=True)
    birth_date = models.DateField(verbose_name="UTC birth date", null=True)
    nba_debut_year = models.PositiveSmallIntegerField(null=True)
    college_name = models.CharField(max_length=128, null=True)
    last_affiliation = models.CharField(max_length=128, null=True)
    country = models.CharField(max_length=256, null=True)

    def next_game(self):
        # TODO: handle when there isn't a next game
        return self.current_team.all_games().filter(start_time_utc__gte=now()).order_by('start_time_utc')[0]


class NBAGame(models.Model):
    nba_game_id = models.PositiveIntegerField(unique=True, db_index=True)
    start_time_utc = models.DateTimeField()
    nugget = models.TextField(blank=True)
    home_team = models.ForeignKey(NBATeam, on_delete=models.CASCADE, related_name='home_games')
    visitor_team = models.ForeignKey(NBATeam, on_delete=models.CASCADE, related_name='away_games')


class UserTeam(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    players = models.ManyToManyField(NBAPlayer)
    name = models.CharField(max_length=64, default="My Team")


