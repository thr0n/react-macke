import * as React from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";

export const InvalidSelectionMessage = (props) => (
  <Snackbar
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    autoHideDuration={6000}
    message={
      <span>
        Du musst mindestens eine 1 oder eine 5 auswählen. Wählst du zusätzlich
        eine andere Augenzahl, muss diese genau drei mal ausgewählt sein!
      </span>
    }
    onClose={props.handleClose}
    open={props.open}
  />
);

InvalidSelectionMessage.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
