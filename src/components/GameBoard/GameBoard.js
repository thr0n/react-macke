import * as React from "react";
// import * as _ from "lodash";
import { Col, Row, Popover, notification, message } from "antd";
import { MackeDice } from "../Dice/MackeDice";
import { ActionContainer } from "../ActionContainer/ActionContainer";
import {
  calculateScore,
  continuationNeeded,
  diceSelectionIsValid,
  diceCompositionIsValid,
  verifyAtLeastOneDiceIsSelected,
  processTakeScores,
  processFinishMove
} from "../../engine/GameEngine";

import "./GameBoard.scss";
import { CurrentPlayer } from "../CurrentPlayer/CurrentPlayer";
import { DebugTool } from "../DebugTool/DebugTool";

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
    { keepValue: false, taken: false, score: 2 }
    // { keepValue: false, taken: false, score: 5 }
  ]
};

export class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  rollDices() {
    const throwInvalidDiceCompositionMessage = () => {
      notification.open({
        message: "Ungültiger Wurf",
        description: "Keiner der Würfel hat den Wert 1 oder 5."
      });
    };

    const generateNewValue = () => Math.floor(Math.random() * 6) + 1;
    const currentStates = this.state.diceStates;

    if (this.state.continuationNeeded) {
      currentStates.forEach((element, index) => {
        currentStates[index].score = generateNewValue();
        currentStates[index].keepValue = false;
        currentStates[index].taken = false;
      });
    } else {
      currentStates.forEach((element, index) => {
        if (!element.keepValue) {
          currentStates[index].score = generateNewValue();
        }
      });
    }

    this.setState({
      thrown: true,
      firstThrow: false,
      diceStates: currentStates
    });

    if (diceCompositionIsValid(this.state.diceStates)) {
      console.log("Valid throw!");
    } else {
      console.log("Invalid throw!");
      throwInvalidDiceCompositionMessage();
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
    const nextState = processTakeScores(this.state);
    console.log(nextState);

    if (nextState.continuationNeeded) {
      message.warning("Anschluss! Du musst weiterspielen!");
    }

    this.setState(nextState);

    // takenDices = takenDices.filter(
    //   state => state.keepValue && !state.keepValue.taken
    // );

    // let score = -1; // just for debugging at the moment

    // const isValid = diceSelectionIsValid(takenDices);

    // if (isValid) {
    //   score = calculateScore(takenDices);
    //   const needsContinuation = continuationNeeded(this.state.diceStates);

    //   this.setState({
    //     firstThrow: false,
    //     thrown: false,
    //     currentScore: this.state.currentScore + score,
    //     continuationNeeded: needsContinuation
    //   });
    // }

    // return score;
  }

  updateScores(diceStates) {
    this.setState({ diceStates: diceStates });
  }

  render() {
    return (
      <Row>
        <Col span="9" />
        <Col span="6">
          <CurrentPlayer
            playerName="Hendrik"
            overallScore={0}
            currentScore={this.state.currentScore}
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
            onFinishMove={() => processFinishMove()}
            continuationNeeded={this.state.continuationNeeded}
            firstThrow={this.state.firstThrow}
            thrown={this.state.thrown}
            canPass={this.state.canPass}
            canTakeScores={verifyAtLeastOneDiceIsSelected(
              this.state.diceStates
            )}
          />

          <Popover
            content={
              <DebugTool
                diceStates={this.state.diceStates}
                onUpdate={diceStates => this.updateScores(diceStates)}
              />
            }
            trigger="click"
            placement="bottom"
          >
            <span style={{ cursor: "pointer" }}>
              <i className="material-icons">bug_report</i>
            </span>
          </Popover>
        </Col>
        <Col span="9" />
      </Row>
    );
  }
}
