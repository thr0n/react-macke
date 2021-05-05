import * as React from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";

export const InvalidCompositionMessage = (props) => (
  <Snackbar
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    autoHideDuration={6000}
    message={
      <span>
        Keiner der Würfel hat den Wert 1 oder 5. {props.nextPlayer} ist an der
        Reihe!
      </span>
    }
    onClose={props.handleClose}
    open={props.open}
  />
);

InvalidCompositionMessage.propTypes = {
  open: PropTypes.bool,
  nextPlayer: PropTypes.string,
  handleClose: PropTypes.func,
};
