from django.urls import path

from newsfeed.feeds import UserTeamNews

urlpatterns = [
    path('teams/<int:team_id>/rss/', UserTeamNews())
]
