from django.urls import path

from nba_profile import views

urlpatterns = [
    path('players/', views.NBAPlayersList.as_view()),
    path('players/<int:pk>/', views.NBAPlayerDetail.as_view()),
    path('teams/', views.UserTeamsList.as_view()),
    path('teams/<int:pk>', views.UserTeamUpdate.as_view())
]
