from django.db import models
from django.utils.timezone import now
import pytz

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

    def stats_prev_game(self):
        return self.playergamestats_set.filter(
            game__start_time_utc__lte=now(), game__gamemeta__status_num=3
        ).order_by('-game__start_time_utc')[0]


class NBAGame(models.Model):
    nba_game_id = models.CharField(max_length=16, unique=True, db_index=True)
    start_time_utc = models.DateTimeField()
    nugget = models.TextField(blank=True)
    home_team = models.ForeignKey(NBATeam, on_delete=models.CASCADE, related_name='home_games')
    visitor_team = models.ForeignKey(NBATeam, on_delete=models.CASCADE, related_name='away_games')

    def start_date_eastern_str(self):
        # Needed in url for game detail apis
        # TODO: this might not be robust, change to use string from league schedule api
        return self.start_time_utc.astimezone(tz=pytz.timezone('US/Eastern')).strftime('%Y%m%d')


class GameMeta(models.Model):
    game = models.OneToOneField(NBAGame, on_delete=models.PROTECT)
    status_num = models.IntegerField()  # 3 -> finished, 1 -> not started ?


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
    offReb = models.PositiveSmallIntegerField()
    defReb = models.PositiveSmallIntegerField()
    totReb = models.PositiveSmallIntegerField()
    assists = models.PositiveSmallIntegerField()
    pFouls = models.PositiveSmallIntegerField()
    steals = models.PositiveSmallIntegerField()
    turnovers = models.PositiveSmallIntegerField()
    blocks = models.PositiveSmallIntegerField()
    plusMinus = models.FloatField()

    fastBreakPoints = models.PositiveSmallIntegerField(null=True)
    pointsInPaint = models.PositiveSmallIntegerField(null=True)
    biggestLead = models.PositiveSmallIntegerField(null=True)
    secondChancePoints = models.PositiveSmallIntegerField(null=True)
    pointsOffTurnovers = models.PositiveSmallIntegerField(null=True)
    longestRun = models.PositiveSmallIntegerField(null=True)


class PlayerGameStats(models.Model):
    player = models.ForeignKey(NBAPlayer, on_delete=models.PROTECT)
    team = models.ForeignKey(NBATeam, on_delete=models.PROTECT)
    game = models.ForeignKey(NBAGame, on_delete=models.PROTECT)

    position = models.CharField(max_length=4, blank=True)
    time_played = models.DurationField()
    dnp = models.BooleanField(default=False)
    dnp_text = models.CharField(max_length=64, blank=True)

    points = models.PositiveSmallIntegerField(null=True)
    fgm = models.PositiveSmallIntegerField(null=True)
    fga = models.PositiveSmallIntegerField(null=True)
    ftm = models.PositiveSmallIntegerField(null=True)
    fta = models.PositiveSmallIntegerField(null=True)
    tpm = models.PositiveSmallIntegerField(null=True)
    tpa = models.PositiveSmallIntegerField(null=True)
    offReb = models.PositiveSmallIntegerField(null=True)
    defReb = models.PositiveSmallIntegerField(null=True)
    totReb = models.PositiveSmallIntegerField(null=True)
    assists = models.PositiveSmallIntegerField(null=True)
    pFouls = models.PositiveSmallIntegerField(null=True)
    steals = models.PositiveSmallIntegerField(null=True)
    turnovers = models.PositiveSmallIntegerField(null=True)
    blocks = models.PositiveSmallIntegerField(null=True)
    plusMinus = models.FloatField(null=True)


