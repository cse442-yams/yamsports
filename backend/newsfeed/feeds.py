from functools import reduce
from operator import ior

from django.contrib.syndication.views import Feed
from django.core.exceptions import PermissionDenied
from django.db.models import Q
from django.http import HttpResponse
from rest_framework import status

from nba_profile.models import UserTeam
from nba_profile.views import IsOwner
from newsfeed.models import NewsItem


def get_team_newsitems_query(team: UserTeam):
    players = team.players.all()
    player_queries = []
    for player in players:
        name = "{} {}".format(player.first_name, player.last_name)
        q = Q(title__icontains=name) | Q(summary__icontains=name)
        query = NewsItem.objects.all().filter(q)
        player_queries.append(query)

    query = reduce(ior, player_queries)
    return query.order_by('-pub_date')


class UserTeamNews(Feed):

    # def __call__(self, request, *args, **kwargs):
    #     if not request.user.is_authenticated:
    #         return HttpResponse(status=status.HTTP_401_UNAUTHORIZED)
    #     else:
    #         return super().__call__(request, *args, **kwargs)

    def get_object(self, request, team_id):
        team = UserTeam.objects.get(pk=team_id)
        # if team is not None and team.user != request.user:
        #     raise PermissionDenied

        return team

    def title(self, obj):
        return 'Custom news for your fantasy team'

    def link(self, obj):
        return ''

    def description(self, obj):
        return 'description here'

    def items(self, obj):
        return get_team_newsitems_query(obj)

    def item_title(self, item):
        return item.title

    def item_description(self, item):
        return item.summary

    def item_link(self, item):
        return item.link


