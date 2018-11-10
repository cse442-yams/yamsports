from django.urls import path, include

from nba_profile import views

urlpatterns = [
    path('players/', views.NBAPlayersList.as_view(), name='nba-players-list'),
    path('players/<int:pk>/', views.NBAPlayerDetail.as_view(), name='nba-player-detail'),
    path('teams/', views.UserTeamsList.as_view(), name='user-teams-list'),
    path('teams/<int:pk>/', views.UserTeamUpdate.as_view(), name='user-teams-update'),
    path('', include('newsfeed.urls'))
]
