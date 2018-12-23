import * as React from "react";
import * as _ from "lodash";
import PropTypes from "prop-types";
import { Col, Row, Popover, notification, message } from "antd";
import { MackeDice } from "../Dice/MackeDice";
import { ActionContainer } from "../ActionContainer/ActionContainer";
import {
  diceCompositionIsValid,
  verifyAtLeastOneDiceIsSelected,
  processTakeScores,
  processFinishMove,
  processInvalidComposition
} from "../../engine/GameEngine";

import "./GameBoard.scss";
import { CurrentPlayer } from "../CurrentPlayer/CurrentPlayer";
import { DebugTool } from "../DebugTool/DebugTool";
import { ScoreBoard } from "../ScoreBoard";

const initialState = {
  currentScore: 0,
  gameOver: false,
  continuationNeeded: false,
  firstThrow: true,
  thrown: false,
  canFinish: false,
  validSelection: false,
  diceStates: [
    {
      keepValue: false,
      taken: false,
      score: 1
    },
    {
      keepValue: false,
      taken: false,
      score: 3
    },
    {
      keepValue: false,
      taken: false,
      score: 4
    },
    {
      keepValue: false,
      taken: false,
      score: 6
    },
    {
      keepValue: false,
      taken: false,
      score: 2
    }
  ]
};

export class GameBoard extends React.Component {
  constructor(props) {
    super(props);

    const init = _.cloneDeep(initialState);

    this.state = {
      ...init,
      players: this.props.players.map(player => {
        return { player: player, overallScore: 0, moves: [] };
      }),
      currentPlayerId: 0
    };
  }

  restartGame = () => {
    this.setState({
      ..._.cloneDeep(initialState),
      players: this.props.players.map(player => {
        return { player: player, overallScore: 0, moves: [] };
      }),
      currentPlayerId: 0
    })
  }

  throwInvalidDiceCompositionMessage = nextPlayer => {
    notification.open({
      message: "Ungültiger Wurf",
      description:
        "Keiner der Würfel hat den Wert 1 oder 5. " +
        nextPlayer +
        " ist an der Reihe!"
    });
  };

  throwInvalidDiceSelectionMessage = () => {
    notification.open({
      message: "Ungültige Auswahl",
      description:
        "Du musst mindestens eine 1 oder eine 5 auswählen. Wählst du zusätzlich eine " +
        "andere Augenzahl, muss diese genau drei mal ausgewählt sein!"
    });
  };

  throwWinnerMessage = winner => {
    notification.open({
      message: "Gratulation!",
      description:
        "Das Spiel ist zu Ende. " + winner + " hat das Spiel gewonnen!",
      duration: 0
    });
  };

  throwContinuationNeededMessage = () => {
    message.warning("Anschluss! Du musst weiterspielen!");
  };

  rollDices() {
    const generateNewValue = () => Math.floor(Math.random() * 6) + 1;
    const currentStates = this.state.diceStates;

    if (this.state.continuationNeeded) {
      currentStates.forEach(state => {
        state.score = generateNewValue();
        state.keepValue = false;
        state.taken = false;
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

    if (!diceCompositionIsValid(this.state.diceStates)) {
      const nextState = processInvalidComposition(this.state);
      this.throwInvalidDiceCompositionMessage(
        this.state.players[nextState.currentPlayerId].player
      );
      this.setState(nextState);
    }
  }

  toggleKeepValue(diceId, keepValue) {
    const diceStates = this.state.diceStates;
    diceStates[diceId].keepValue = keepValue;
    this.setState({
      diceStates
    });
  }

  takeScores() {
    const nextState = processTakeScores(this.state);

    if (!nextState.validSelection && !nextState.continuationNeeded) {
      this.throwInvalidDiceSelectionMessage();
    }

    if (nextState.continuationNeeded) {
      this.throwContinuationNeededMessage();
    }

    this.setState(nextState);
  }

  updateScores(diceStates) {
    this.setState({
      diceStates: diceStates
    });
  }

  finishMove() {
    const nextState = processFinishMove(this.state);

    if (nextState.gameOver) {
      this.throwWinnerMessage(
        this.state.players[this.state.currentPlayerId].player
      );
    }

    this.setState(..._.cloneDeep(initialState), nextState);
  }

  render() {
    return (
      <Row>
        <Col xs={1} xl={8} />
        <Col xs={22} xl={8}>
          <CurrentPlayer
            currentPlayer={this.state.players[this.state.currentPlayerId]}
            currentScore={this.state.currentScore}
          />{" "}
          <div className="dice-container">
            {" "}
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
            })}{" "}
          </div>{" "}
          <ActionContainer
            rollDices={() => this.rollDices()}
            onTakeScores={() => this.takeScores()}
            onFinishMove={() => this.finishMove()}
            continuationNeeded={this.state.continuationNeeded}
            firstThrow={this.state.firstThrow}
            thrown={this.state.thrown}
            canFinish={this.state.canFinish}
            canTakeScores={verifyAtLeastOneDiceIsSelected(
              this.state.diceStates
            )}
            gameOver={this.state.gameOver}
            restart={this.restartGame}
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
            <span
              style={{
                cursor: "pointer"
              }}
            >
              <i className="material-icons"> bug_report </i>{" "}
            </span>{" "}
          </Popover>{" "}
          <ScoreBoard players={this.state.players} />
        </Col>{" "}
        <Col xs={1} xl={8} />
      </Row>
    );
  }
}

GameBoard.propTypes = {
  players: PropTypes.arrayOf(PropTypes.string)
};
