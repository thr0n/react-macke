import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Header } from "./components/Navigation/Header";
import { LandingPage } from "./components/LandingPage/LandingPage";
import { Macke } from "./components/Macke/Macke";
import { Stats } from "./components/Stats/Stats";

import * as ROUTES from "./constants/routes";

import "./styles.scss";

export const App = () => (
  <Router>
    <Header />
    <div className="app-container">
      <Route path={ROUTES.LANDING} exact component={LandingPage} />
      <Route path={ROUTES.MACKE} component={Macke} />
      <Route path={ROUTES.STATS} component={Stats} />
    </div>
  </Router>
);
