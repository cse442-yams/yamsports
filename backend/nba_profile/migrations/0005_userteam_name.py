# Generated by Django 2.1.3 on 2018-11-16 17:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nba_profile', '0004_auto_20181103_0301'),
    ]

    operations = [
        migrations.AddField(
            model_name='userteam',
            name='name',
            field=models.CharField(default='My Team', max_length=64),
        ),
    ]