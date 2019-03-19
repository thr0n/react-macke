import * as React from "react";
import * as _ from "lodash";
import PropTypes from "prop-types";

import {
  diceCompositionIsValid,
  verifyAtLeastOneDiceIsSelected,
  processTakeScores,
  processFinishMove,
  processInvalidComposition
} from "../../engine/GameEngine";

import { MackeDice } from "../Dice/MackeDice";
import { ActionContainer } from "../ActionContainer/ActionContainer";
import { CurrentPlayer } from "../CurrentPlayer/CurrentPlayer";
import { ScoreBoard } from "../ScoreBoard";
import { WinnerMessage } from "./Messages/WinnerMessage";
import { InvalidSelectionMessage } from "./Messages/InvalidSelectionMessage";
import { InvalidCompositionMessage } from "./Messages/InvalidCompositionMessage";
import { ContinuationNeededMessage } from "./Messages/ContinuationNeededMessage";

import "./GameBoard.scss";

const INVALID_SELECTION = "invalidSelection";
const INVALID_COMPOSITION = "invalidComposition";
const CONTINUATION_NEEDED = "continuationNeeded";
const WINNER = "winnerMessage";

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
  ],
  messagesVisible: {
    invalidSelection: false,
    invalidComposition: false,
    winnerMessage: false,
    continuationNeeded: false
  }
};

export class GameBoard extends React.Component {
  constructor(props) {
    super(props);

    const init = _.cloneDeep(initialState);

    this.state = {
      ...init,
      players: this.props.players.map(player => {
        return { player: player, overallScore: 0, moves: [], wonGames: 0 };
      }),
      currentPlayerId: 0
    };
  }

  setMessageFlag = (key, enabled, event) => {
    if (event === "clickaway") {
      return;
    }

    let messagesVisible = this.state.messagesVisible;

    switch (key) {
      case INVALID_SELECTION:
        messagesVisible.invalidSelection = enabled;
        break;
      case INVALID_COMPOSITION:
        messagesVisible.invalidComposition = enabled;
        break;
      case CONTINUATION_NEEDED:
        messagesVisible.continuationNeeded = enabled;
        break;
      case WINNER:
        messagesVisible.winnerMessage = enabled;
        break;
      default:
        break;
    }

    this.setState({ messagesVisible });
  };

  throwInvalidDiceCompositionMessage = () => {
    this.setMessageFlag(INVALID_COMPOSITION, true);
  };

  throwInvalidDiceSelectionMessage = () => {
    this.setMessageFlag(INVALID_SELECTION, true);
  };

  throwContinuationNeededMessage = () => {
    this.setMessageFlag(CONTINUATION_NEEDED, true);
  };

  throwWinnerMessage = () => {
    this.setMessageFlag(WINNER, true);
  };

  restartGame = () => {
    this.setState({
      ..._.cloneDeep(initialState),
      players: this.props.players.map((player, index) => {
        return { player: player, overallScore: 0, moves: [], wonGames: this.state.players[index].wonGames };
      }),
      currentPlayerId: 0
    });
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
      this.throwWinnerMessage();
      nextState.thrown = false;
    }

    const next = Object.assign({}, initialState, nextState)

    this.setState(next);
  }

  render() {
    return (
      <>
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
          canTakeScores={verifyAtLeastOneDiceIsSelected(this.state.diceStates)}
          gameOver={this.state.gameOver}
          restart={this.restartGame}
        />
        <ScoreBoard players={this.state.players} />
        <InvalidSelectionMessage
          open={this.state.messagesVisible.invalidSelection}
          handleClose={(event, reason) =>
            this.setMessageFlag(INVALID_SELECTION, false, reason)
          }
        />
        <InvalidCompositionMessage
          open={this.state.messagesVisible.invalidComposition}
          nextPlayer={this.state.players[this.state.currentPlayerId].player}
          handleClose={(event, reason) =>
            this.setMessageFlag(INVALID_COMPOSITION, false, reason)
          }
        />
        <WinnerMessage
          open={this.state.messagesVisible.winnerMessage}
          winner={this.state.players[this.state.currentPlayerId].player}
          handleClose={(event, reason) =>
            this.setMessageFlag(WINNER, false, reason)
          }
        />
        <ContinuationNeededMessage
          open={this.state.messagesVisible.continuationNeeded}
          handleClose={(event, reason) =>
            this.setMessageFlag(CONTINUATION_NEEDED, false, reason)
          }
        />
      </>
    );
  }
}

GameBoard.propTypes = {
  players: PropTypes.arrayOf(PropTypes.string)
};
