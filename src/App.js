import React, { Component } from "react";
import { Row, Col } from "antd";

import { GameBoard } from "./components/GameBoard/GameBoard";

import "./App.css";
import logo from "./macke-logo.png";
import { PlayerManger } from "./components/PlayerManager/PlayerManager";

class App extends Component {
  state = {
    players: [
    ]
  };

  addPlayers = players => {
    this.setState({ players });
  };

  renderPlayerManager = () => {
    return (
        <PlayerManger onSave={players => this.addPlayers(players)} />
    );
  };

  render() {
    const { players } = this.state;

    return (
      <div className="App">
        <Row
          style={{
            marginTop: "3%"
          }}
        >
          <Col span="8" />
          <Col span="8">
            <img src={logo} alt="React-Macke" />
          </Col>{" "}
          <Col span="8" />
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
