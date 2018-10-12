import * as React from "react";
// import * as _ from "lodash";
import { MackeDice } from "../Dice/MackeDice";
import {calculateScore, continuationNeeded, diceSelectionIsValid, diceCompositionIsValid} from "../../engine/GameEngine";

import './GameBoard.scss';

const initialState = {
  currentScore: 0,
  continuation: false,
  firstThrow: true,
  thrown: false,
  diceStates: [
    { keepValue: false, taken: false, score: 1 },
    { keepValue: false, taken: false, score: 2 },
    { keepValue: false, taken: false, score: 3 },
    { keepValue: false, taken: false, score: 4 },
    { keepValue: false, taken: false, score: 5 },
    { keepValue: false, taken: false, score: 6 }
  ]
};

export class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  rollDices() {
    const generateNewValue = () => Math.floor(Math.random() * 6) + 1;
    const currentStates = this.state.diceStates;

    currentStates.forEach((element, index) => {
      if (!element.keepValue) {
        currentStates[index].score = index%2 === 0 ? 1 : 6;
      }
    });
    this.setState({
      thrown: true,
      firstThrow: false,
      diceStates: currentStates
    });

    if (diceCompositionIsValid(this.state.diceStates)) {
      console.log("Valid throw!");
    } else {
      console.log("Invalid throw!");
      this.setState(initialState);
    }
  }

  toggleKeepValue(diceId, keepValue) {
    const diceStates = this.state.diceStates;
    diceStates[diceId].keepValue = keepValue;
    this.setState({ diceStates });
  }

  takeScores(takenDices) {
    takenDices = takenDices.filter(
      state => state.keepValue && !state.keepValue.taken
    );

    const isValid = diceSelectionIsValid(takenDices);
    
    if (isValid) {
        const score = calculateScore(takenDices);
        const needsContinuation = continuationNeeded(this.state.diceStates);

        this.setState({
          firstThrow: false,
          thrown: false,
          currentScore: this.state.currentScore + score,
          continuationNeeded: needsContinuation
        });
        return score
    } else {
      return -1;
    }
  }

  render() {
    return (
      <div>
      <div className="dice-container">
        {this.state.diceStates.map((diceState, index) => {
          return (
            <MackeDice
              key={`dice-${index}`}
              diceId={index}
              value={diceState.score}
              keepValue={diceState.keepValue}
              clickable={this.state.thrown && !diceState.taken}
              taken={diceState.taken}
              onClick={this.toggleKeepValue.bind(this)}
            />
          );
        })}
        </div>
        <div className="action-container">
        {!this.state.thrown ? (
          <span onClick={this.rollDices.bind(this)}>Würfeln!</span>
        ) : (
          <span onClick={() => this.takeScores(this.state.diceStates)}>Auswählen...</span>
        )}
        </div>
        <p>Current Score: {this.state.currentScore}</p>
      </div>
    );
  }
}
