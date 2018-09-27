import * as React from "react";
import { MackeDice } from "../Dice/MackeDice";

export class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diceStates: [
        { keepValue: false, value: 1},
        { keepValue: false, value: 2},
        { keepValue: false, value: 3},
        { keepValue: false, value: 4},
        { keepValue: false, value: 5},
        { keepValue: false, value: 6},
      ]
    };
  }

  rollDices() {
    const generateNewValue = () => Math.floor(Math.random() * 6) + 1;
    const currentStates = this.state.diceStates;

    currentStates.forEach((element, index) => {
      if (!element.keepValue) {
        currentStates[index].value = generateNewValue();
      }
    })
    this.setState({diceStates: currentStates});
  }

  toggleKeepValue(diceId, keepValue) {
    const diceStates = this.state.diceStates;
    diceStates[diceId].keepValue = keepValue;
    this.setState({diceStates});
  }

  render() {
    return (
      <div>
        {this.state.diceStates.map((diceState, index) => {
          return (
            <MackeDice
              key={`dice-${index}`}
              diceId={index}
              value={diceState.value}
              keepValue={diceState.keepValue}
              onClick={this.toggleKeepValue.bind(this)}
            />
          );
        })}
        <span onClick={this.rollDices.bind(this)}>Würfeln!</span>
      </div>
    );
  }
}
