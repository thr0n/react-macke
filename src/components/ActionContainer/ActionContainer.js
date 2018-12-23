import * as React from "react";
import { Button } from "antd";

export const ActionContainer = props => {
  const renderGameActions = () => {
    return (
      <div>
        <Button
          type="primary"
          onClick={() => props.rollDices()}
          disabled={props.thrown}
        >
          Würfeln{" "}
        </Button>{" "}
        <Button
          type="primary"
          disabled={!props.canTakeScores}
          onClick={() => props.onTakeScores()}
        >
          Punkte nehmen{" "}
        </Button>{" "}
        <Button
          type="primary"
          disabled={!props.canFinish}
          onClick={() => props.onFinishMove()}
        >
          Zug beenden{" "}
        </Button>{" "}
      </div>
    );
  };

  const renderRestartButton = () => {
    return (
      <Button type="primary" onClick={() => props.restart()} icon="reload" >Spiel neu starten</Button>
    );
  };

  return (
    <div className="action-container">
      {props.gameOver ? renderRestartButton() : renderGameActions()}
    </div>
  );
};
