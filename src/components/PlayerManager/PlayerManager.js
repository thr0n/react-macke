import React from "react";

import { PlayerEntry } from "./PlayerEntry";

export class PlayerManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      n: "",
    };
  }

  addPlayer = (playerName, index) => {
    //console.log(`Adding player ${playerName} to ...`);
    //console.log(this.props.players);

    this.props.onAdd(playerName);
    //this.props.players[index] = playerName;
    // if (this.shouldAddNewPlaceHolder(this.props.players, index, playerName)) {
    //if (this.props.players.length < 3) {
    //  console.log('Adding empty name!')
    //this.props.onAdd("");
    //} else if (playerName === "") {
    // this.deletePlayer(index);
    //}
  };

  deletePlayer = (index) => {};

  getPlayers = (players) => {
    return players.filter((player) => player !== "");
  };

  getPlayerCount = (players) => {
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
      <div>
        {this.props.players.map((player, index) => (
          <div className="nes-field">
            <label htmlFor="name_field">Your name</label>
            <input
              key={index}
              type="text"
              id="name_field"
              className="nes-input"
              onBlur={(event) => {
                this.addPlayer(event.target.value);
                this.setState({ n: "" });
              }}
            />
            {player}
          </div>
        ))}
        <div>
          <button
            color="primary"
            disabled={this.getPlayerCount(this.props.players) < 2}
            onClick={() =>
              this.props.onStart(this.getPlayers(this.props.players))
            }
          >
            Start
          </button>
        </div>
      </div>
    );
  }
}
