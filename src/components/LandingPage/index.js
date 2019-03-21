import * as React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";

import * as ROUTES from "../../constants/routes";

import "./LandingPage.scss";

export const LandingPage = () => (
  <Grid
    container
    spacing={12}
    direction="column"
    justify="center"
    alignItems="center"
    style={{marginTop: "3vh"}}
  >
    <Grid item xs={12} className="nav-button">
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={ROUTES.MACKE}
      >
        <Icon>refresh</Icon>
        {""}Spiel starten
      </Button>
    </Grid>
    <Grid item xs={12} className="nav-button">
      <Button
        variant="contained"
        color="secondary"
        component={Link}
        to={ROUTES.STATS}
      >
        <Icon>equalizer</Icon>
        {""}Statistiken
      </Button>
    </Grid>
    <Grid item xs={12}>
      <Button
        variant="contained"
        color="secondary"
        component={Link}
        to={ROUTES.HOWTO}
        disabled
      >
        <Icon>help</Icon>
        {""}How To
      </Button>
    </Grid>
  </Grid>
);
