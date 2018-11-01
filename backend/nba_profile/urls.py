from django.urls import path

from nba_profile import views

urlpatterns = [
    path('players/', views.NBAPlayersList.as_view())
]
