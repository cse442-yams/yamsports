import numpy as numpy
import sys 
import pandas as pd


# DATA IMPORT ############################# DATA IMPORT ############################## DATA IMPORT ############################## DATA IMPORT ####

Miscellaneous_Stats = pd.ExcelFile('C:\Users\Workstation 21\Desktop\UB\python\NBA Data\17_18 Miscellaneous Stats')
Miscellaneous_Stats = ms

Opponent_Shooting_Stats = pd.ExcelFile('C:\Users\Workstation 21\Desktop\UB\python\NBA Data\17_18 Opponent Shooting Stats')
Opponent_Shooting_Stats = oss 

Opponent_Stats = pd.ExcelFile('C:\Users\Workstation 21\Desktop\UB\python\NBA Data\17_18 Opponent Stats')
Opponent_Stats = os

Player_Per_Game_Stats = pd.ExcelFile('C:\Users\Workstation 21\Desktop\UB\python\NBA Data\17_18 Player Per Game Stats')
Player_Per_Game_Stats = ppgs 

Player_Total_Stats = pd.ExcelFile('C:\Users\Workstation 21\Desktop\UB\python\NBA Data\17_18 Player Total Stats')
Player_Total_Stats = pts

Team_Opponent_Per_Game_Stats = pd.ExcelFile('C:\Users\Workstation 21\Desktop\UB\python\NBA Data\17_18 Team Opponent Per Game Stats')
Team_Opponent_Per_Game_Stats = topgs 

Team_Per_Game_Stats = pd.ExcelFile('C:\Users\Workstation 21\Desktop\UB\python\NBA Data\17_18 Team Per Game Stats')
Team_Per_Game_Stats = tpgs 

Team_Shooting_Stats = pd.ExcelFile('C:\Users\Workstation 21\Desktop\UB\python\NBA Data\17_18 Team Shooting Stats')
Team_Shooting_Stats = tss 

Team_Stats = pd.ExcelFile('C:\Users\Workstation 21\Desktop\UB\python\NBA Data\17_18 Team Stats')
Team_Stats = ts 

Height_Weight_College = pd.ExcelFile('C:\Users\Workstation 21\Desktop\UB\python\NBA Data\Height Weight and College')
Height_Weight_College = hwc 

Height_Weight_City_State = pd.ExcelFile('C:\Users\Workstation 21\Desktop\UB\python\NBA Data\Height Weight City and State')
Height_Weight_City_State = hwcs 

League_Averages = pd.ExcelFile('C:\Users\Workstation 21\Desktop\UB\python\NBA Data\League Averages')
League_Averages = la 

Player_Performance_Per_Season = pd.ExcelFile('C:\Users\Workstation 21\Desktop\UB\python\NBA Data\Player Performance Per Season')
Player_Performance_Per_Season = ppps


# GLOSSARY ############################## GLOSSARY ############################## GLOSSARY ############################## GLOSSARY ###############
#
#
# Rk   -- Rank
# Age  -- Age of Player at the start of February 1st of that season.
# W    -- Wins
# L    -- Losses
# PW   -- Pythagorean wins, i.e., expected wins based on points scored and allowed
# PL   -- Pythagorean losses, i.e., expected losses based on points scored and allowed
# MOV  -- Margin of Victory
# SOS  -- Strength of Schedule; a rating of strength of schedule. The rating is denominated in points above/below average, where zero is average.
# SRS  -- Simple Rating System; a team rating that takes into account average point differential and strength of schedule. The rating is denominated in points above/below average, where zero is average.
# ORtg -- Offensive Rating. An estimate of points produced (players) or scored (teams) per 100 possessions
# DRtg -- Defensive Rating. An estimate of points allowed per 100 possessions
# Pace -- Pace Factor: An estimate of possessions per 48 minutes
# FTr  -- Free Throw Attempt Rate. Number of FT Attempts Per FG Attempt
# 3PAr -- 3-Point Attempt Rate. Percentage of FG Attempts from 3-Point Range
# TS%  -- True Shooting Percentage. A measure of shooting efficiency that takes into account 2-point field goals, 3-point field goals, and free throws. Offense Four Factors
# eFG% -- Effective Field Goal Percentage. This statistic adjusts for the fact that a 3-point field goal is worth one more point than a 2-point field goal.
# TOV% -- Turnover Percentage. An estimate of turnovers committed per 100 plays.
# ORB% -- Offensive Rebound Percentage. An estimate of the percentage of available offensive rebounds a player grabbed while he was on the floor.
# FT/FGA -- Free Throws Per Field Goal Attempt. Defense Four Factors
# eFG% -- Opponent Effective Field Goal Percentage
# TOV% -- Opponent Turnover Percentage
# DRB% -- Defensive Rebound Percentage. An estimate of the percentage of available defensive rebounds a player grabbed while he was on the floor.
# FT/FGA -- Opponent Free Throws Per Field Goal Attempt
# Attend./G -- Attendance per home game at the team's primary arena
#
#
# G    -- Games
# MP   -- Minutes Played
# FG   -- Field Goals
# FGA  -- Field Goal Attempts
# FG%  -- Field Goal Percentage
# 3P   -- 3-Point Field Goals
# 3PA  -- 3-Point Field Goal Attempts
# 3P%  -- 3-Point Field Goal Percentage
# 2P   -- 2-Point Field Goals
# 2PA  -- 2-point Field Goal Attempts
# 2P%  -- 2-Point Field Goal Percentage
# FT   -- Free Throws
# FTA  -- Free Throw Attempts
# FT%  -- Free Throw Percentage
# ORB  -- Offensive Rebounds
# DRB  -- Defensive Rebounds
# TRB  -- Total Rebounds
# AST  -- Assists
# STL  -- Steals
# BLK  -- Blocks
# TOV  -- Turnovers
# PF   -- Personal Fouls
# PTS  -- Points
#
#
# Dist. -- Average distance (ft.) of FGA. % of FGA by Distance
# 2P -- % of FGAs that are 2-Pt FGAs.
# 0-3 -- % of FGAs that are 0-3 feet from the basket.
# 3-10 -- % of FGAs that are 3-10 feet from the basket.
# 10-16 -- % of FGAs that are 10-16 feet from the basket.
# 16 <3 -- % of FGAs that are 2-Pt shots and 16+ feet from the basket.
# 3P -- % of FGAs that are 3-Pt FGAs. FG% by Distance
# 2P -- FG% on 2-Pt FGAs.
# 0-3 -- FG% on FGAs that are 0-3 feet from the basket.
# 3-10 -- FG% on FGAs that are 3-10 feet from the basket.
# 10-16 -- FG% on FGAs that are 10-16 feet from the basket.
# 16 <3 -- FG% on 2-Pt FGAs that are 16+ feet from the basket.
# 3P -- FG% on 3-Pt FGAs.
# %Ast'd -- % of 2-Pt FGs that are assisted.
# Dunks
# %FGA -- % of all FGAs that are dunk attempts.
# Md. -- Number of successful throwdowns.
# Some discrepancies for 2000-01 totals. Reliably reported as of the 2001-02 season.
# Layups
# %FGA -- % of all team FGAs that are layup attempts.
# Md. -- # of layups made.
# %Ast'd -- % of 3-Pt FGs that are assisted.
# Corner
# %3PA -- % of 3PAs from the corner.
# 3P% -- 3P% on 3PAs from the corner.
# Heaves
# Att. -- Heave attempts (beyond half-court)
# Md. -- Heaves made (beyond half-court)
#
#


##### TEAM COMPARISON ############################## TEAM COMPARISON ############################## TEAM COMPARISON ##############################
#
# Head to head comparisons between teams where we look at key ststistics like: winning percentage, offensive and defensice rating, rebounding, 
# 3pt%, 2pt%, ft%, etc. Team comparisons are significant and highlight certain tangibles like coaching, tradition, etc.

for (rank r = 1; size(ts); r++){    # Looking at all the teams one at a time
    int rank_weight;
    int i = 0; # cell contents
    int x = 0; # row
    int y = 0; # column

    while (y != empty){

        if (y == 'winning percentage'){ # Examine one column at a time, i.e. 'winning percentage.'
            cell[x][y] = i;             # i = winning percentage number, We are going to save this variable and compare it to other teams (j).               

            while (rank < 33){          # While we still have other teams to compare with.
                int j = i + 1;          # Compare a certain team's (rank) winning percentage against other teams, one at a time.

                if (i > j){             # If winning percentage of rank[x] is greater than rank[x+1] then give rank[x] a point or weight measure.
                    rank_weight[i] ++;

                } else if (i < j){      # If winning percentage of rank[x] is less than rank[x+1] then subtract from rank[x] a point or weight measure.
                    rank_weight[j] --;

                } else {
                    rank_weight[i] == rank_weight[j];
                }  

                rank_weight[i]++;       # Update rank weight before moving onto next rank.
            }  

            cell[x][y] = rank_weight[i];  
        }

        if (y == 'offensive rating'){   # Repeat previous steps 
        }
    }
}


### PLAYER COMPARISON ############################## LAYER COMPARISON ############################## LAYER COMPARISON ################################
#
# While team comparisons are important we need to account for individual player performances with  ore emphasis. 

for (player p = 1; size(ppgs); p++){    # Looking at all the players one at a time
    int player_weight;
    int i = 0; # cell contents
    int x = 0; # row
    int y = 0; # column

    while (y != empty){

        if (y == 'FG%'){                # Examine one column at a time, i.e. field goal percentage.
            cell[x][y] = i;             # i = FG% number, We are going to save this variable and compare it to other players (j).               

            while (p < 541){            # While we still have other players to compare with.
                int j = i + 1;          # Compare a certain player's FG% with that of another, one at a time.

                if (i > j){             # If FG% of player[x] is greater than player[x+1] then give player[x] a point or weight measure.
                    player_weight[i] ++;

                } else if (i < j){      # If winning percentage of player[x] is less than palyer[x+1] then subtract from player[x] a point or weight measure.
                    player_weight[j] --;

                } else {
                    player_weight[i] == player_weight[j];
                }  

                player_weight[i]++;     # Update player weight before moving onto next player.
            }  

            cell[x][y] = player_weight[i];  
        }

        if (y == 'FT%'){                # Repeat previous steps 
        }
    }
}
