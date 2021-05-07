import React from "react";

export class PlayerManager extends React.Component {
  constructor(props) {
    super(props);
  }

  handleBlur = (playerName, index) => {
    console.log("BLUR")
    console.log(`${index}: ${playerName}`)

    this.props.onAdd(index, playerName)

    /*console.log("index = " + index);
    if (playerName === "") {
      this.props.onRemove(index);
      return;
    }
    this.props.onAdd(playerName);*/
  };

  shouldAddNewPlaceHolder(currentPlayers, index, playerName) {
    return (
      currentPlayers[index + 1] === undefined &&
      playerName !== "" &&
      currentPlayers.length < 4
    );
  }

  getPlayers = (players) => {
    return players.filter((player) => player !== "");
  };

  getPlayerCount = (players) => {
    return this.getPlayers(players).length;
  };

  render() {
    return (
      <div>
        {this.props.players.map((player, index) => (
          <div className="nes-field" key={index}>
            <label htmlFor="name_field">Your name</label>
            <input
              type="text"
              id="name_field"
              className="nes-input"
              onBlur={(event) => {
                this.handleBlur(event.target.value, index);
              }}
            />
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
