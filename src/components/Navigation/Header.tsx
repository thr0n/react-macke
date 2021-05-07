import * as React from "react";

import "./Header.scss";

export const Header = () => {
  return (
    <div className="navigation-container">
      <h1>react-macke</h1>
      <div className="sub-headline">
        <i className="nes-icon trophy is-medium" />
        <span>Das beliebte Würfelspiel!</span>
      </div>
    </div>
  );
};
