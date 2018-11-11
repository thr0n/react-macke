import React, { Component } from "react";
import { Row, Col } from "antd";

import { GameBoard } from "./components/GameBoard/GameBoard";

import "./App.css";
import logo from "./macke-logo.png";
import { PlayerManger } from "./components/PlayerManager/PlayerManager";
// import { MackeMenu } from "./components/MackeMenu";

class App extends Component {
  state = {
    players: [
      "Hendrik", "Jessi", "Werner"
    ]
  };

  addPlayers = players => {
    this.setState({ players });
  };

  renderPlayerManager = () => {
    return <PlayerManger onSave={players => this.addPlayers(players)} />;
  };

  render() {
    const { players } = this.state;

    return (
      <div className="App">
        {/* <MackeMenu /> */}
        <Row style={{ marginTop: "20px", marginBottom: "3px" }}>
          <Col xs={1} xl={8} />
          <Col xs={22} xl={8}>
            <img src={logo} alt="React-Macke" width="80%" height="auto"/>
          </Col>{" "}
          <Col xs={1} xl={8} />
        </Row>{" "}
        <Row>
          {players.length === 0 ? (
            this.renderPlayerManager()
          ) : (
            <GameBoard players={players} />
          )}
        </Row>{" "}
      </div>
    );
  }
}

export default App;
