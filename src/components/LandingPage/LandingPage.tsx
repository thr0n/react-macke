import React from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";

import "./LandingPage.scss";

export const LandingPage = () => (
  <div className="landingpage-container">
    <Link to={ROUTES.MACKE}>
      <button type="button" className="nes-btn is-primary">
        {""}Spiel starten
      </button>
    </Link>
    <Link to={ROUTES.STATS}>
      <button type="button" className="nes-btn is-success">
        {""}Statistiken
      </button>
    </Link>
    <button type="button" className="nes-btn is-disabled">
      {""}How To
    </button>
  </div>
);
