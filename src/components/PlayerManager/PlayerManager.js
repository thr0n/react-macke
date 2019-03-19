import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";

import { PlayerEntry } from "./PlayerEntry";

export class PlayerManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [""]
    };
  }

  addPlayer = (playerName, index) => {
    const currentPlayers = this.state.players;

    currentPlayers[index] = playerName;
    if (this.shouldAddNewPlaceHolder(currentPlayers, index, playerName)) {
      currentPlayers.push("");
    } else if (playerName === "") {
      this.deletePlayer(index);
    }

    this.setState({ players: currentPlayers });
  };

  deletePlayer = index => {
    if (index > 0 || this.state.players.length > 1) {
      const currentPlayers = this.state.players;
      currentPlayers.splice(index, 1);
      this.setState({ players: currentPlayers });
    } else {
      this.setState({ players: "" });
    }
  };

  getPlayers = players => {
    return players.filter(player => player !== "");
  }

  getPlayerCount = players => {
    return this.getPlayers(players).length;
  };

  shouldAddNewPlaceHolder(currentPlayers, index, playerName) {
    return (
      currentPlayers[index + 1] === undefined &&
      playerName !== "" &&
      currentPlayers.length < 4
    );
  }

  render() {
    return (
      <Grid container spacing={16} direction="column" justify="flex-start">
        <Grid item xs={12}>
          {this.state.players.map((player, index) => (
            <PlayerEntry
              key={index}
              playerName={player}
              onChange={playerName => this.addPlayer(playerName, index)}
              onDelete={() => this.deletePlayer(index)}
            />
          ))}
        </Grid>

        <Grid container direction="row" justify="flex-end">
          <Grid item>
            <Fab
              color="primary"
              disabled={this.getPlayerCount(this.state.players) < 2}
              onClick={() => this.props.onStart(this.getPlayers(this.state.players))}
            >
              Start
            </Fab>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
