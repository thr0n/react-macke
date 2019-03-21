import * as React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import { Grid } from "@material-ui/core";

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
    <Grid item xs={12} id="current-player">
      <Card>
        <CardHeader
          avatar={
            img ? (
              <Avatar src={img} title={props.currentPlayer.player} />
            ) : (
              <Avatar>{props.currentPlayer.player.substring(0, 1)}</Avatar>
            )
          }
          title={`Punkte in in dieser Runde: ${props.currentScore}`}
          subheader={`Punkte insgesamt: ${props.currentPlayer.overallScore}`}
        />
      </Card>
    </Grid>
  );
};

CurrentPlayer.propTypes = {
  playerName: PropTypes.string,
  currentScore: PropTypes.number,
  overallScore: PropTypes.number
};
