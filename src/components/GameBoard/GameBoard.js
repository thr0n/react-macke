import * as React from "react";
// import * as _ from "lodash";
import { Col, Row } from "antd";
import { MackeDice } from "../Dice/MackeDice";
import { ActionContainer } from "../ActionContainer/ActionContainer";
import {
  calculateScore,
  continuationNeeded,
  diceSelectionIsValid,
  diceCompositionIsValid,
  verifyAtLeastOneDiceIsSelected,
  processTakeScores
} from "../../engine/GameEngine";

import "./GameBoard.scss";
import { CurrentPlayer } from "../CurrentPlayer/CurrentPlayer";

const initialState = {
  currentScore: 0,
  continuationNeeded: false,
  firstThrow: true,
  thrown: false,
  canPass: true,
  validSelection: false,
  diceStates: [
    { keepValue: false, taken: false, score: 1 },
    { keepValue: false, taken: false, score: 3 },
    { keepValue: false, taken: false, score: 4 },
    { keepValue: false, taken: false, score: 6 },
    { keepValue: false, taken: false, score: 2 },
    { keepValue: false, taken: false, score: 5 }
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
        currentStates[index].score = index % 2 === 0 ? 1 : 6;
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

    // TODO: see GameEngine
    processTakeScores();

    takenDices = takenDices.filter(
      state => state.keepValue && !state.keepValue.taken
    );

    let score = -1; // just for debugging at the moment

    const isValid = diceSelectionIsValid(takenDices);

    if (isValid) {
      score = calculateScore(takenDices);
      const needsContinuation = continuationNeeded(this.state.diceStates);

      this.setState({
        firstThrow: false,
        thrown: false,
        currentScore: this.state.currentScore + score,
        continuationNeeded: needsContinuation
      });
    } 

    console.log("calculated score: " + score);
    return score;
  }

  render() {
    return (
      <Row>
        <Col span="9" />
        <Col span="6">
          <CurrentPlayer
            playerName="Hendrik"
            overallScore={0}
            currentScore={0}
          />
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
          <ActionContainer
            rollDices={() => this.rollDices()}
            onTakeScores={() => this.takeScores(this.state.diceStates)}
            continuationNeeded={this.state.continuationNeeded}
            firstThrow={this.state.firstThrow}
            canPass={this.state.canPass}
            canTakeScores={verifyAtLeastOneDiceIsSelected(this.state.diceStates)}
          />
        </Col>
        <Col span="9" />
      </Row>
    );
  }
}
