import * as React from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";

export const WinnerMessage = props => (
  <Snackbar
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    autoHideDuration={5000}
    message={
      <span>Das Spiel ist zu Ende. {props.winner} hat gewonnen!</span>
    }
    onClose={props.handleClose}
    open={props.open}
  />
);

WinnerMessage.propTypes = {
  open: PropTypes.bool,
  winner: PropTypes.string,
  handleClose: PropTypes.func
};
