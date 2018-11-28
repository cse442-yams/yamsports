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
    nba_game_id = models.CharField(max_length=16, unique=True, db_index=True)
    start_time_utc = models.DateTimeField()
    nugget = models.TextField(blank=True)
    home_team = models.ForeignKey(NBATeam, on_delete=models.CASCADE, related_name='home_games')
    visitor_team = models.ForeignKey(NBATeam, on_delete=models.CASCADE, related_name='away_games')


class UserTeam(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    players = models.ManyToManyField(NBAPlayer)
    name = models.CharField(max_length=64, default="My Team")


class TeamGameStats(models.Model):
    team = models.ForeignKey(NBATeam, on_delete=models.PROTECT)
    game = models.ForeignKey(NBAGame, on_delete=models.PROTECT)
    is_home = models.BooleanField()

    points = models.PositiveSmallIntegerField()
    fgm = models.PositiveSmallIntegerField()
    fga = models.PositiveSmallIntegerField()
    ftm = models.PositiveSmallIntegerField()
    fta = models.PositiveSmallIntegerField()
    tpm = models.PositiveSmallIntegerField()
    tpa = models.PositiveSmallIntegerField()
    off_reb = models.PositiveSmallIntegerField()
    def_reb = models.PositiveSmallIntegerField()
    tot_reb = models.PositiveSmallIntegerField()
    assists = models.PositiveSmallIntegerField()
    pf = models.PositiveSmallIntegerField()
    steals = models.PositiveSmallIntegerField()
    turnovers = models.PositiveSmallIntegerField()
    blocks = models.PositiveSmallIntegerField()
    plusMinus = models.FloatField()

    fast_break_points = models.PositiveSmallIntegerField(null=True)
    points_in_paint = models.PositiveSmallIntegerField(null=True)
    biggest_lead = models.PositiveSmallIntegerField(null=True)
    second_chance_points = models.PositiveSmallIntegerField(null=True)
    points_off_turnovers = models.PositiveSmallIntegerField(null=True)
    longest_run = models.PositiveSmallIntegerField(null=True)


class PlayerGameStats(models.Model):
    player = models.ForeignKey(NBAPlayer, on_delete=models.PROTECT)
    team = models.ForeignKey(NBATeam, on_delete=models.PROTECT)
    game = models.ForeignKey(NBAGame, on_delete=models.PROTECT)

    position = models.CharField(max_length=4, blank=True)
    dnp = models.BooleanField(default=False)
    dnp_text = models.CharField(max_length=64, blank=True)

    points = models.PositiveSmallIntegerField(null=True)
    fgm = models.PositiveSmallIntegerField(null=True)
    fga = models.PositiveSmallIntegerField(null=True)
    ftm = models.PositiveSmallIntegerField(null=True)
    fta = models.PositiveSmallIntegerField(null=True)
    tpm = models.PositiveSmallIntegerField(null=True)
    tpa = models.PositiveSmallIntegerField(null=True)
    off_reb = models.PositiveSmallIntegerField(null=True)
    def_reb = models.PositiveSmallIntegerField(null=True)
    tot_reb = models.PositiveSmallIntegerField(null=True)
    assists = models.PositiveSmallIntegerField(null=True)
    pf = models.PositiveSmallIntegerField(null=True)
    steals = models.PositiveSmallIntegerField(null=True)
    turnovers = models.PositiveSmallIntegerField(null=True)
    blocks = models.PositiveSmallIntegerField(null=True)
    plusMinus = models.FloatField(null=True)


