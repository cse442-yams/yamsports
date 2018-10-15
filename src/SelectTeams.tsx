import * as React from "react";
import {
  WithStyles,
  Theme,
  createStyles,
  withStyles,
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  TextField,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  DialogActions,
  Button
} from "@material-ui/core";

const styles = (theme: Theme) => createStyles({});

interface IProps extends WithStyles<typeof styles> {
  isOpen: boolean;
  handleClose: any;
  anchorEl: null;
}

const initialState = { tab: 0, anchorEl: null };
type State = Readonly<typeof initialState>;

class SelectTeams extends React.Component<IProps, State> {
  public state = initialState;
  public handleClose: any;
  public isOpen: boolean;

  public render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <Menu
          id="simple-menu"
          anchorEl={this.props.anchorEl}
          open={this.props.isOpen}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.props.handleClose}>Atlanta Hawks</MenuItem>
          <MenuItem onClick={this.props.handleClose}>Boston Celtics</MenuItem>
          <MenuItem onClick={this.props.handleClose}>Brooklyn Nets</MenuItem>
          <MenuItem onClick={this.props.handleClose}>
            Charlotte Hornets
          </MenuItem>
          <MenuItem onClick={this.props.handleClose}>Chicago Bulls</MenuItem>
          <MenuItem onClick={this.props.handleClose}>
            Cleveland Cavaliers
          </MenuItem>
          <MenuItem onClick={this.props.handleClose}>Dallas Mavericks</MenuItem>
          <MenuItem onClick={this.props.handleClose}>Denver Nuggets</MenuItem>
          <MenuItem onClick={this.props.handleClose}>Detroit Pistons</MenuItem>
          <MenuItem onClick={this.props.handleClose}>
            Golden State Warriors
          </MenuItem>
          <MenuItem onClick={this.props.handleClose}>Houston Rockets</MenuItem>
          <MenuItem onClick={this.props.handleClose}>Indiana Pacers</MenuItem>
          <MenuItem onClick={this.props.handleClose}>LA Clippers</MenuItem>
          <MenuItem onClick={this.props.handleClose}>
            Los Angeles Lakers
          </MenuItem>
          <MenuItem onClick={this.props.handleClose}>
            Memphis Grizzlies
          </MenuItem>
          <MenuItem onClick={this.props.handleClose}>Miami Heat</MenuItem>
          <MenuItem onClick={this.props.handleClose}>Miluwakee Bucks</MenuItem>
          <MenuItem onClick={this.props.handleClose}>
            Minnesota Timberwolves
          </MenuItem>
          <MenuItem onClick={this.props.handleClose}>
            New Orlean Pelicans
          </MenuItem>
          <MenuItem onClick={this.props.handleClose}>New York Knicks</MenuItem>
          <MenuItem onClick={this.props.handleClose}>
            Oklahoma City Thunder
          </MenuItem>
          <MenuItem onClick={this.props.handleClose}>Orlando Magic</MenuItem>
          <MenuItem onClick={this.props.handleClose}>
            Philadelphia 76ers
          </MenuItem>
          <MenuItem onClick={this.props.handleClose}>Phoneix Suns</MenuItem>
          <MenuItem onClick={this.props.handleClose}>
            Portland Trail Blazers
          </MenuItem>
          <MenuItem onClick={this.props.handleClose}>Sacramento Kings</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(SelectTeams);
