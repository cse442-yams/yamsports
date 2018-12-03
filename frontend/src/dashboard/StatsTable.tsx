import * as React from "react";
import {Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import {NBAPlayer, NBATeam, UserTeam} from "../userteam/UserTeamStore";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import TableSortLabel from "@material-ui/core/TableSortLabel/TableSortLabel";
import Paper from "@material-ui/core/Paper/Paper";
import Table from "@material-ui/core/Table/Table";
import {observable, runInAction} from "mobx";
import TableBody from "@material-ui/core/TableBody/TableBody";
import {observer} from "mobx-react";
import Chip from "@material-ui/core/Chip/Chip";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Collapse from "@material-ui/core/Collapse/Collapse";
import TimelineIcon from "@material-ui/icons/Timeline";
import IconButton from "@material-ui/core/IconButton/IconButton";
import {Simulate} from "react-dom/test-utils";
import {StatsGraph} from "./StatsGraph";
import Typography from "@material-ui/core/Typography/Typography";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";

const styles = (theme: Theme) => createStyles({
    graphRow: {
        backgroundColor: theme.palette.background.default
    },

    graphPaper: {
        margin: "0 5px"
    },

    tableWrapper: {
        overflowX: "auto"
    }
});

interface Props extends WithStyles<typeof styles> {
    team: UserTeam;
}

const getImageUrl = (nbaId: number) => {
    return `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${nbaId}.png`
};

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
    if (player.stats_prev_game == null) {
        return {
            playerObj: player,
            Name: `${player.first_name} ${player.last_name}`,
            Minutes: '00:00',
            Points: 0,
            'FGM': 0,
            'FGA': 0,
            'FTM': 0,
            'FTA': 0,
            '3PM': 0,
            '3PA': 0,
            'OREB': 0,
            'DREB': 0,
            'REB': 0,
            'AST': 0,
            'PF': 0,
            'STL': 0,
            'TOV': 0,
            'BLK': 0,
            'PlusMinus': 0
        }
    }
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

const DenseCell = withStyles({paddingDense: {padding: '4px 12px 4px 6px'}})(TableCell);

const StatsTableHead = (props: any) => {
    const createSortHandler = (property: any) => (event: any) => props.onRequestSort(event, property);
    const { order, orderBy, columns, classes } = props;
    const [name, ...cols] = columns;

    return (
        <TableHead>
            <TableRow>
                <TableCell padding={"checkbox"}>
                </TableCell>
                <TableCell>
                    <Tooltip title={"Sort"} placement={"bottom-end"} enterDelay={300}>
                        <TableSortLabel active={orderBy === name} direction={order} onClick={createSortHandler(name)}>
                            {name}
                        </TableSortLabel>
                    </Tooltip>
                </TableCell>
                {cols.map((col: any) => (
                    <DenseCell className={classes.cell} numeric key={col}>
                        <Tooltip title={"Sort"} placement={"bottom-end"} enterDelay={300}>
                            <TableSortLabel active={orderBy === col} direction={order} onClick={createSortHandler(col)}>
                                {col}
                            </TableSortLabel>
                        </Tooltip>
                    </DenseCell>
                ))}
            </TableRow>
        </TableHead>
    )

};

const toolbarStyles = (theme: Theme) => createStyles({
    title: {
        flex: "0 0 auto"
    },
    spacer: {
        flexGrow: 1
    }
})

const StatsTableToolbar = withStyles(toolbarStyles)((props: any) => {
    const classes = props.classes

    return (
        <Toolbar>
            <div className={classes.title}>
                <Typography variant={"h6"}>{props.tabValue === 0 ? "Last Game Stats" : "Next Matchup"}</Typography>
            </div>

            <div className={classes.spacer}>
            </div>
            <Tabs value={props.tabValue} onChange={props.handleTabChange}>
                <Tab label={"Last Game Stats"}/>
                <Tab label={"Next Matchup"}/>
            </Tabs>
        </Toolbar>
    )
});

const getFormattedTimeseries = (player: NBAPlayer) => {
    return player.stats_games_timeseries.map(({game, ...stats}) => {
        return {date: new Date(game.start_time_utc).toLocaleDateString(), ...stats}
    })
};

const pointsLabels = ['points'];
const shootingLabels = ['fgm', 'ftm', 'tpm'];
const supportLabels = ['offReb', 'defReb', 'totReb', 'assists', 'pFouls', 'steals', 'turnovers', 'blocks'];

const getExpandedContent = (show: boolean, player: NBAPlayer, nCols: number, classes: any) => {
    if (!show) { return null; }
    const data = getFormattedTimeseries(player);
    return (
        <TableRow className={classes.graphRow}>
            <TableCell colSpan={nCols + 1}>
                <Collapse in={true} unmountOnExit>
                    <div style={{display: "flex", justifyContent: "space-around", marginTop: "10px", marginBottom: "10px"}}>
                        <Paper style={{padding: "5px"}} className={classes.graphPaper}>
                            <Typography variant={"title"}>Points</Typography>
                            <StatsGraph data={data} labels={pointsLabels} yLabel={"Points"}/>
                        </Paper>
                        <Paper style={{padding: "5px"}} className={classes.graphPaper}>
                            <Typography variant={"title"}>Shooting</Typography>
                            <StatsGraph data={data} labels={shootingLabels} yLabel={"Count"}/>
                        </Paper>
                        <Paper style={{padding: "5px"}} className={classes.graphPaper}>
                            <Typography variant={"title"}>Support</Typography>
                            <StatsGraph data={data} labels={supportLabels} yLabel={"Count"}/>
                        </Paper>
                    </div>
                </Collapse>
            </TableCell>
        </TableRow>
    )
};

const getOpposingTeam = (player: NBAPlayer) => {
    return player.next_game.home_team.id === player.current_team.id ? player.next_game.home_team : player.next_game.visitor_team;
};

const getNextGameType = (player: NBAPlayer) => {
    const opp = getOpposingTeam(player);
    return opp.id === player.next_game.home_team.id ? "@" : "vs";
}

const getTeamLogo = (team: NBATeam) => {
    return `https://www.nba.com/assets/logos/teams/primary/web/${team.abbr}.svg`
};

const getRowCells = (player: NBAPlayer, stats: any) => {
    if (player.stats_prev_game == null) {
        return (
            <DenseCell colSpan={Object.keys(stats).length}>No game found</DenseCell>
        )
    }

    if (player.stats_prev_game.dnp) {
        return (
            <DenseCell colSpan={Object.keys(stats).length}>{player.stats_prev_game.dnp_text || "Did not play"}</DenseCell>
        )
    }

    return Object.keys(stats).map((k: any) => (<DenseCell numeric>{stats[k]}</DenseCell>))
};

@observer
class StatsTable extends React.Component<Props> {
    @observable order = 'asc';
    @observable orderBy = 'Name';
    @observable showGraph = -1;
    @observable tabValue = 0;

    private handleTabChange = (event: any, value: number) => {
        this.tabValue = value;
    };

    private handleRequestSort = (event: any, property: string) => {
        const orderBy = property;
        let order = 'desc';
        if (this.orderBy === property && this.order === 'desc') {
            order = 'asc';
        }
        runInAction("Set table sort", () => {
            this.order = order;
            this.orderBy = property;
        });

    };

    private handleGraphShow = (playerId: any) => (event: any) => {
        this.showGraph = playerId === this.showGraph ? -1 : playerId;
    };

    render(): React.ReactNode {
        const rows = stableSort(this.props.team.players.map(formatPlayerStats), getSorting(this.order, this.orderBy));
        const classes = this.props.classes;

        return (
            <Paper>
                <StatsTableToolbar tabValue={this.tabValue} handleTabChange={this.handleTabChange}/>
                { this.tabValue === 0 && <div className={classes.tableWrapper}>
                    <Table padding={"dense"}>
                        <StatsTableHead classes={classes} columns={statColumns} order={this.order} orderBy={this.orderBy} onRequestSort={this.handleRequestSort}/>
                        <TableBody>
                            {rows.map(({playerObj, Name, ...stats}: typeof rows) => (
                                <>
                                    <TableRow hover key={playerObj.id}>
                                        <TableCell padding={"checkbox"}>
                                            <IconButton onClick={this.handleGraphShow(playerObj.id)}><TimelineIcon/></IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <Chip avatar={<Avatar src={getImageUrl(playerObj.nba_id)}/>} label={Name}/>
                                        </TableCell>
                                        {getRowCells(playerObj, stats)}
                                    </TableRow>
                                    {getExpandedContent(this.showGraph === playerObj.id, playerObj, statColumns.length, classes)}
                                </>
                            ))}
                        </TableBody>
                    </Table>
                </div>}
                {this.tabValue === 1 && <div>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Next Game</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.team.players.map((player) => (
                                <TableRow key={player.id}>
                                    <TableCell>
                                        <Chip avatar={<Avatar src={getImageUrl(player.nba_id)}/>} label={`${player.first_name} ${player.last_name}`}/>
                                    </TableCell>
                                    <TableCell>
                                        <Chip avatar={<Avatar src={getTeamLogo(getOpposingTeam(player))}/>} label={`${getNextGameType(player)} ${getOpposingTeam(player).abbr} ${new Date(player.next_game.start_time_utc).toLocaleString()}`}/>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>}
            </Paper>
        )
    }
}

export default withStyles(styles)(StatsTable);


