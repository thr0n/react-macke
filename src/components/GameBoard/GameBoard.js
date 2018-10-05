import * as React from "react";
// import * as _ from "lodash";
import { MackeDice } from "../Dice/MackeDice";

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

  continuationNeeded(diceState) {
    return diceState.filter(dice => dice.taken).length === 6;
  }

  mapDiceStateListToArray(diceStates) {
    const scoreDist = [0,0,0,0,0,0];

    diceStates.map((diceState) => {
      return scoreDist[diceState.score-1] = (scoreDist[diceState.score-1] || 0) +1;
    }, scoreDist)
    return scoreDist;
  }

  diceCompositionIsValid(thrownDices) {
    // find dices that aren't taken yet
    thrownDices = thrownDices.filter(dice => !dice.taken);

    // check if there is at least one '1' or one '5'
    return thrownDices.filter(dice => dice.score === 1 || dice.score === 5).length > 0;
  }

  diceSelectionIsValid(takenDices) {
    if (takenDices.length < 1) {
      console.log("Bitte mindestens einen Würfel auswählen!")
      return false;
    }

    const filtered = takenDices.filter((diceState) => diceState.score === 5 || diceState.score === 1);
    return filtered.length > 0;
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

    if (this.diceCompositionIsValid(this.state.diceStates)) {
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

  diceSelectionIsStreet(diceSelection) { 
    return JSON.stringify(diceSelection) === JSON.stringify([1,1,1,1,1,1]);
  }

  calculateScore(takenDices) {
    const scores = this.mapDiceStateListToArray(takenDices);

    if (this.diceSelectionIsStreet(scores)) {
      this.setState({continuation: true})
      return 1000;
    }

    return (scores[0] * 100) + (scores[4] * 50) + scores.filter((scores) => scores > 2) * 100;
  }

  takeScores(takenDices) {
    takenDices = takenDices.filter(
      state => state.keepValue && !state.keepValue.taken
    );

    const isValid = this.diceSelectionIsValid(takenDices);
    
    if (isValid) {
        const score = this.calculateScore(takenDices);
        const needsContinuation = this.continuationNeeded(this.state.diceStates);

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
        {!this.state.thrown ? (
          <span onClick={this.rollDices.bind(this)}>Würfeln!</span>
        ) : (
          <span onClick={() => this.takeScores(this.state.diceStates)}>Auswählen...</span>
        )}

        <p>Current Score: {this.state.currentScore}</p>
      </div>
    );
  }
}
