import * as React from "react";
import {Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import {NBAPlayer, UserTeam, userTeamStore} from "../userteam/UserTeamStore";
import MUIDataTable from "mui-datatables";

const styles = (theme: Theme) => createStyles({
});

interface Props extends WithStyles<typeof styles> {
    team: UserTeam;
}

const statFields = ['points', 'fgm', 'fga', 'ftm', 'fta', 'tpm', 'tpa', 'offReb', 'defReb', 'totReb', 'assists', 'pFouls', 'steals', 'turnovers', 'blocks', 'plusMinus'];
const statColumns = ['Name', 'Minutes', 'Points', 'FGM', 'FGA', 'FTM', 'FTA', '3PM', '3PA', 'OREB', 'DREB', 'REB', 'AST', 'PF', 'STL', 'TOV', 'BLK', 'PlusMinus'];

const formatPlayerStats = (player: NBAPlayer) => {
    const s = player.stats_prev_game;
    const cols = [`${player.first_name} ${player.last_name}`, s.time_played];
    return cols.concat(statFields.map(f => s[f]));
};


class StatsTable extends React.Component<Props> {

    render(): React.ReactNode {
        const data = this.props.team.players.map(formatPlayerStats);
        return <MUIDataTable columns={statColumns} data={data}/>
    }
}

export default withStyles(styles)(StatsTable);


