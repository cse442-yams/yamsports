from django.db import models

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


class UserTeam(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    players = models.ManyToManyField(NBAPlayer)


