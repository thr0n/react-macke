import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";

import { GameBoard } from "./components/GameBoard/GameBoard";

import "./App.css";

import { PlayerManager } from "./components/PlayerManager/PlayerManager";
import { Logo } from "./components/Logo";

class App extends React.Component {
  state = {
    players: [
      "Hendrik", "Jessi", "Werner"
    ],
    started: false
  };

  addPlayer = playerName => {
    const currentPlayers = this.state.players;
    currentPlayers.push(playerName);
    this.setState({ players: currentPlayers });
  };

  startGame = players => {
    this.setState({ players, started: true });
  };

  renderPlayerManager = players => {
    return (
      <>
        <PlayerManager
          onAdd={playerName => this.addPlayer(playerName)}
          onStart={players => this.startGame(players)}
        />
      </>
    );
  };

  render() {
    const { players, started } = this.state;

    return (
      <Grid
        container
        spacing={8}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item xl={8}>
          <div className="App" style={{ position: "relative" }}>
            <Logo />
            {players.length === 0 && !started ? (
              this.renderPlayerManager(players)
            ) : (
              <GameBoard players={players} />
            )}
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default App;
