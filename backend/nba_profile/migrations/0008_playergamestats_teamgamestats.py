# Generated by Django 2.1.3 on 2018-11-28 07:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('nba_profile', '0007_load_schedule'),
    ]

    operations = [
        migrations.CreateModel(
            name='PlayerGameStats',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('position', models.CharField(blank=True, max_length=4)),
                ('dnp', models.BooleanField(default=False)),
                ('dnp_text', models.CharField(blank=True, max_length=64)),
                ('points', models.PositiveSmallIntegerField(null=True)),
                ('fgm', models.PositiveSmallIntegerField(null=True)),
                ('fga', models.PositiveSmallIntegerField(null=True)),
                ('ftm', models.PositiveSmallIntegerField(null=True)),
                ('fta', models.PositiveSmallIntegerField(null=True)),
                ('tpm', models.PositiveSmallIntegerField(null=True)),
                ('tpa', models.PositiveSmallIntegerField(null=True)),
                ('off_reb', models.PositiveSmallIntegerField(null=True)),
                ('def_reb', models.PositiveSmallIntegerField(null=True)),
                ('tot_reb', models.PositiveSmallIntegerField(null=True)),
                ('assists', models.PositiveSmallIntegerField(null=True)),
                ('pf', models.PositiveSmallIntegerField(null=True)),
                ('steals', models.PositiveSmallIntegerField(null=True)),
                ('turnovers', models.PositiveSmallIntegerField(null=True)),
                ('blocks', models.PositiveSmallIntegerField(null=True)),
                ('plusMinus', models.FloatField(null=True)),
                ('game', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='nba_profile.NBAGame')),
                ('player', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='nba_profile.NBAPlayer')),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='nba_profile.NBATeam')),
            ],
        ),
        migrations.CreateModel(
            name='TeamGameStats',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_home', models.BooleanField()),
                ('points', models.PositiveSmallIntegerField()),
                ('fgm', models.PositiveSmallIntegerField()),
                ('fga', models.PositiveSmallIntegerField()),
                ('ftm', models.PositiveSmallIntegerField()),
                ('fta', models.PositiveSmallIntegerField()),
                ('tpm', models.PositiveSmallIntegerField()),
                ('tpa', models.PositiveSmallIntegerField()),
                ('off_reb', models.PositiveSmallIntegerField()),
                ('def_reb', models.PositiveSmallIntegerField()),
                ('tot_reb', models.PositiveSmallIntegerField()),
                ('assists', models.PositiveSmallIntegerField()),
                ('pf', models.PositiveSmallIntegerField()),
                ('steals', models.PositiveSmallIntegerField()),
                ('turnovers', models.PositiveSmallIntegerField()),
                ('blocks', models.PositiveSmallIntegerField()),
                ('plusMinus', models.FloatField()),
                ('fast_break_points', models.PositiveSmallIntegerField(null=True)),
                ('points_in_paint', models.PositiveSmallIntegerField(null=True)),
                ('biggest_lead', models.PositiveSmallIntegerField(null=True)),
                ('second_chance_points', models.PositiveSmallIntegerField(null=True)),
                ('points_off_turnovers', models.PositiveSmallIntegerField(null=True)),
                ('longest_run', models.PositiveSmallIntegerField(null=True)),
                ('game', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='nba_profile.NBAGame')),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='nba_profile.NBATeam')),
            ],
        ),
    ]
