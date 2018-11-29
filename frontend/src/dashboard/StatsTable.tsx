import * as React from "react";
import {Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import {NBAPlayer, UserTeam} from "../userteam/UserTeamStore";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import TableSortLabel from "@material-ui/core/TableSortLabel/TableSortLabel";
import Paper from "@material-ui/core/Paper/Paper";
import Table from "@material-ui/core/Table/Table";
import {observable} from "mobx";
import TableBody from "@material-ui/core/TableBody/TableBody";

const styles = (theme: Theme) => createStyles({
});

interface Props extends WithStyles<typeof styles> {
    team: UserTeam;
}

const desc = (a: any, b: any, orderBy: any) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
};

const getSorting = (order: any, orderBy: any) => order === 'desc' ? (a: any, b: any) => desc(a, b, orderBy) : (a: any, b: any) => -desc(a, b, orderBy);

const stableSort = (array: any, cmp: any) => {
    const stabilized = array.map((el: any, i: any) => [el, i]);
    stabilized.sort((a: any, b: any) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilized.map((el: any) => el[0]);
};

const statFields = ['points', 'fgm', 'fga', 'ftm', 'fta', 'tpm', 'tpa', 'offReb', 'defReb', 'totReb', 'assists', 'pFouls', 'steals', 'turnovers', 'blocks', 'plusMinus'];
const statColumns = ['Name', 'Minutes', 'Points', 'FGM', 'FGA', 'FTM', 'FTA', '3PM', '3PA', 'OREB', 'DREB', 'REB', 'AST', 'PF', 'STL', 'TOV', 'BLK', 'PlusMinus'];

const formatPlayerStats = (player: NBAPlayer) => {
    const s = player.stats_prev_game;
    return {
        playerObj: player,
        Name: `${player.first_name} ${player.last_name}`,
        Minutes: s.time_played,
        Points: s.points,
        'FGM': s.fgm,
        'FGA': s.fga,
        'FTM': s.ftm,
        'FTA': s.fta,
        '3PM': s.tpm,
        '3PA': s.tpa,
        'OREB': s.offReb,
        'DREB': s.defReb,
        'REB': s.totReb,
        'AST': s.assists,
        'PF': s.pFouls,
        'STL': s.steals,
        'TOV': s.turnovers,
        'BLK': s.blocks,
        'PlusMinus': s.plusMinus
    };
};


const StatsTableHead = (props: any) => {
    const createSortHandler = (property: any) => (event: any) => props.onRequestSort(event, property);
    const { order, orderBy, columns } = props;

    return (
        <TableHead>
            <TableRow>
                {columns.map((col: any) => (
                    <TableCell numeric key={col}>
                        <Tooltip title={"Sort"} placement={"bottom-end"} enterDelay={300}>
                            <TableSortLabel active={orderBy === col} direction={order} onClick={createSortHandler(col)}>
                                {col}
                            </TableSortLabel>
                        </Tooltip>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )

};

class StatsTable extends React.Component<Props> {
    @observable order = 'asc';
    @observable orderBy = 'Name';

    private handleRequestSort = (event: any, property: string) => {
        const orderBy = property;
    }

    render(): React.ReactNode {
        const rows = stableSort(this.props.team.players.map(formatPlayerStats), getSorting(this.order, this.orderBy));

        return (
            <Paper>
                <div>
                    <Table padding={"dense"}>
                        <StatsTableHead columns={statColumns} order={this.order} orderBy={this.orderBy} onRequestSort={this.handleRequestSort}/>
                        <TableBody>
                            {rows.map(({playerObj, Name, ...stats}: typeof rows) => (
                                <TableRow hover key={playerObj.id}>
                                    <TableCell>
                                        {Name}
                                    </TableCell>

                                    {Object.keys(stats).map((k: any) => (
                                        <TableCell numeric>{stats[k]}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Paper>
        )
    }
}

export default withStyles(styles)(StatsTable);


