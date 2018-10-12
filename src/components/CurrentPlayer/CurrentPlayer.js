import * as React from "react";
import { Avatar, Card } from "antd";
import PropTypes from "prop-types";

import "./CurrentPlayer.scss";

export const CurrentPlayer = props => {
  return (
    <div className="current-player">
      <Card>
        <p>
          <Avatar icon="user" style={{ marginRight: "5px" }} />
          {props.playerName ? props.playerName : "..."} ist dran.
        </p>
        <p>Aktueller Punktestand: {props.overallScore}</p>
        <p>Punkte in in dieser Runde: {props.currentScore}</p>
      </Card>
    </div>
  );
};

CurrentPlayer.propTypes = {
  playerName: PropTypes.string,
  currentScore: PropTypes.number,
  overallScore: PropTypes.number
};
