import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GameBoard from "./components/GameBoard/GameBoard";
import { PlayerManager } from "./components/PlayerManager/PlayerManager";
import { Navigation } from "./components/Navigation/Navigation";
import { LandingPage } from "./components/LandingPage";
import Stats from "./components/Stats/Stats";

import * as ROUTES from "./constants/routes";

import "./App.css";

class App extends React.Component {
  state = {
    players: [
      //  "Hendrik", "Jessi", "Werner"
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

  renderPlayerManager = players => (
    <PlayerManager
      onAdd={playerName => this.addPlayer(playerName)}
      onStart={players => this.startGame(players)}
    />
  );

  renderMacke = (players, started) => (
    <Grid item xs={8}>
      <div className="App" style={{ position: "relative" }}>
        {players.length === 0 && !started ? (
          this.renderPlayerManager(players)
        ) : (
          <GameBoard players={players} />
        )}
      </div>
    </Grid>
  );

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
        <Router>
          <Navigation />
          <Route path={ROUTES.LANDING} exact component={LandingPage} />
          <Route path={ROUTES.MACKE} render={() => this.renderMacke(players, started)} />
          <Route path={ROUTES.STATS} component={Stats} />
        </Router>
      </Grid>
    );
  }
}

export default App;
