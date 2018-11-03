from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework import views
from rest_framework.response import Response
from rest_framework import permissions

from nba_profile.models import NBAPlayer, UserTeam
from nba_profile.serializers import NBAPlayerBasicSerializer, NBAPlayerDetailSerializer, UserTeamSerializer


class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user_id == request.user


class NBAPlayersList(generics.ListAPIView):
    queryset = NBAPlayer.objects.all()
    serializer_class = NBAPlayerBasicSerializer


class NBAPlayerDetail(generics.RetrieveAPIView):
    queryset = NBAPlayer.objects.all()
    serializer_class = NBAPlayerDetailSerializer


class UserTeamsList(views.APIView):

    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user = request.user
        user_teams = UserTeam.objects.all().filter(user=user)
        serializer = UserTeamSerializer(user_teams, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserTeamSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserTeamUpdate(views.APIView):

    permission_classes = (permissions.IsAuthenticated, IsOwner)

    def patch(self, request, pk):
        team = get_object_or_404(UserTeam, pk=pk)
        self.check_object_permissions(request, team)
        serializer = UserTeamSerializer(team, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)


