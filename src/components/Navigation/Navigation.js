import * as React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../Logo";
import * as ROUTES from "../../constants/routes";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

import "./Navigation.scss";

export class Navigation extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Menu"
              onClick={this.handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose}>
                <Link to={ROUTES.LANDING}>Startseite</Link>
              </MenuItem>
              <MenuItem onClick={this.handleClose}>
                <Link to={ROUTES.MACKE}>Spielen</Link>
              </MenuItem>
              <MenuItem onClick={this.handleClose}>
                <Link to={ROUTES.STATS}>Statistiken</Link>
              </MenuItem>
            </Menu>
            <Typography variant="h6" color="inherit">
              Macke
            </Typography>
          </Toolbar>
        </AppBar>
        <Logo />
      </>
    );
  }
}
