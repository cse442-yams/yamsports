import time
from datetime import timedelta

import requests

from django.core.management import BaseCommand
from django.utils.timezone import now

from nba_profile.models import NBAGame, GameMeta, TeamGameStats, NBATeam, PlayerGameStats, NBAPlayer


def parse_duration(dur):
    if dur == '':
        return timedelta(0)

    minutes, sec = dur.split(':')
    return timedelta(minutes=int(minutes), seconds=int(sec))


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument(
            '--force-all',
            action='store_true',
            dest='force',
            help='Fetch all games even if they are marked as completed'
        )

    def handle(self, *args, **options):
        games_to_fetch = NBAGame.objects.all().filter(start_time_utc__lte=now())
        if not options['force']:
            games_to_fetch = games_to_fetch.exclude(gamemeta__status_num__exact=3)

        self.stdout.write("Fetching {} games".format(games_to_fetch.count()))

        for game in games_to_fetch:
            url = "https://data.nba.net/prod/v1/{}/{}_boxscore.json".format(game.start_date_eastern_str(),
                                                                            game.nba_game_id)

            if options['verbosity'] >= 1:
                self.stdout.write('Fetching {}'.format(url))
            resp = requests.get(url)
            if not resp.ok:
                self.stdout.write(self.style.ERROR("Could not fetch {}".format(url)))
                continue

            data = resp.json()

            for kind in ('hTeam', 'vTeam'):
                team_id = data['basicGameData'][kind]['teamId']
                stats = data['stats'][kind]
                defaults = {k: v for k, v in stats['totals'].items() if k not in ('fgp', 'ftp', 'tpp', 'min')}
                defaults.update(
                    [(k, stats[k]) for k in
                     ('fastBreakPoints', 'pointsInPaint', 'biggestLead', 'secondChancePoints', 'pointsOffTurnovers',
                      'longestRun')]
                )
                defaults['is_home'] = kind == 'hTeam'
                TeamGameStats.objects.update_or_create(team=NBATeam.objects.get(nba_id=team_id), game=game, defaults=defaults)

            for player in data['stats']['activePlayers']:
                player_id = player['personId']
                defaults = {k: v if v else None for k, v in player.items()
                            if k not in ('fgp', 'ftp', 'tpp', 'min', 'personId', 'teamId', 'isOnCourt', 'pos', 'min', 'dnp', 'sortKey')}

                defaults['position'] = player['pos']
                defaults['dnp'] = player['dnp'] != ''
                defaults['dnp_text'] = player['dnp']
                defaults['time_played'] = parse_duration(player['min'])

                try:
                    p = NBAPlayer.objects.get(nba_id=player_id)
                except NBAPlayer.DoesNotExist:
                    self.stdout.write(self.style.ERROR('Skipping unknown player {}'.format(player_id)))
                    continue

                team = NBATeam.objects.get(nba_id=player['teamId'])
                PlayerGameStats.objects.update_or_create(player=p, team=team, game=game, defaults=defaults)

            GameMeta.objects.update_or_create(game=game, defaults={'status_num': data['basicGameData']['statusNum']})

            time.sleep(0.1)
