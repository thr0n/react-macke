import * as React from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";

export const ContinuationNeededMessage = props => (
  <Snackbar
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    autoHideDuration={6000}
    message={
      <span>
        Anschluss! Du musst weiterspielen!
      </span>
    }
    onClose={props.handleClose}
    open={props.open}
  />
);

ContinuationNeededMessage.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func
};
