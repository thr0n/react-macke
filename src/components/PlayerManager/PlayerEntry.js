import * as React from "react";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import TextField from "@material-ui/core/TextField";

export const PlayerEntry = (props) => (
  <Grid
    container
    alignItems="flex-end"
    spacing={10}
    direction="row"
    justify="center"
  >
    <Grid item>
      <AccountCircle />
    </Grid>
    <Grid item>
      <TextField
        maxLength="3"
        id="input-player-name"
        label="Name"
        fullWidth
        value={props.playerName}
        onChange={(event) => {
          props.onChange(event.target.value);
        }}
      />
    </Grid>
    <Grid item xs={1}>
      {props.playerName !== "" ? (
        <span
          onClick={() => props.onDelete(props.index)}
          style={{ cursor: "pointer" }}
        >
          X
        </span>
      ) : null}
    </Grid>
  </Grid>
);
