import * as React from "react";
import { Avatar, Card } from "antd";
import PropTypes from "prop-types";

import "./CurrentPlayer.scss";

export const CurrentPlayer = props => {
  const getImageForPlayer = player => {
    switch (player) {
      case "Jessi":
      case "Jessica":
        return "https://www.xing.com/img/users/2/1/b/f8c14562f.18099777,2.128x128.jpg";
      case "Hendrik":
        return "https://www.xing.com/img/users/1/2/c/927adc5e8.16378578,5.64x64.jpg";
      default:
        return null;
    }
  };

  const img = getImageForPlayer(props.currentPlayer.player);

  return (
    <div className="current-player">
      <Card>
        <p>
          {img ? (
            <Avatar
              src={img}
              style={{
                marginRight: "5px"
              }}
            />
          ) : (
            <Avatar>{props.currentPlayer.player.substring(0, 1)}</Avatar>
          )}{" "}
          {props.currentPlayer.player ? props.currentPlayer.player : "..."}
          {" "} ist dran.
        </p>{" "}
        <p> Punkte in in dieser Runde: {props.currentScore} </p>{" "}
        <p> Punkte insgesamt: {props.currentPlayer.overallScore} </p>{" "}
      </Card>{" "}
    </div>
  );
};

CurrentPlayer.propTypes = {
  playerName: PropTypes.string,
  currentScore: PropTypes.number,
  overallScore: PropTypes.number
};
