import React from "react";

export class PlayerManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [""],
    };
  }

  inputIsMissing = (players) =>
    players.length < 4 && players[players.length - 1] !== "";

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onStart(this.state.players.filter((p) => p !== ""));
  };

  handleChange = (event, index) => {
    const newName = event.target.value;
    const players = this.state.players;

    if (newName === "" && index !== players.length - 1) {
      players.splice(index, 1);
      this.setState({ players });

      if (this.inputIsMissing(players)) {
        players.push("");
      }
      return;
    }

    players.splice(index, 1, newName);
    if (this.inputIsMissing(players)) {
      players.push("");
    }

    this.setState({ players });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.state.players.map((player, index) => (
          <div className="nes-field" key={index}>
            <label htmlFor="name_field">Your name</label>
            <input
              type="text"
              id="name_field"
              className="nes-input"
              onChange={(event) => this.handleChange(event, index)}
              value={player}
            />
          </div>
        ))}
        <input
          style={{ marginTop: "16px" }}
          disabled={this.state.players.length < 2}
          type="submit"
          value="Submit"
        />
      </form>
    );
  }
}
