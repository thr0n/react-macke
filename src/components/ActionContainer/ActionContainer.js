import * as React from "react";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { Fab } from "@material-ui/core";

export const ActionContainer = (props) => {
  const renderGameActions = () => {
    return (
      <div>
        <Fab
          id="take-scores-button"
          variant="round"
          color="secondary"
          disabled={!props.canTakeScores}
          onClick={() => props.onTakeScores()}
        >
          <Icon>thumb_up</Icon>
        </Fab>{" "}
        <Fab
          id="roll-dices-button"
          variant="round"
          color="primary"
          onClick={() => props.rollDices()}
          disabled={props.thrown}
        >
          <Icon>autorenew</Icon>
        </Fab>{" "}
        <Fab
          id="finish-move-button"
          variant="round"
          disabled={!props.canFinish}
          onClick={() => props.onFinishMove()}
          style={
            props.canFinish
              ? { backgroundColor: "green", color: "white" }
              : null
          }
        >
          <Icon>check_cirecle</Icon>
        </Fab>{" "}
      </div>
    );
  };

  const renderRestartButton = () => (
    <Button
      id="restart-button"
      variant="contained"
      color="primary"
      onClick={() => props.onRestart()}
    >
      <Icon>refresh</Icon> Spiel neu starten
    </Button>
  );

  return (
    <div className="action-container">
      {props.gameOver ? renderRestartButton() : renderGameActions()}
    </div>
  );
};
