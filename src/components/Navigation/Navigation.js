import * as React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../Logo";
import * as ROUTES from "../../constants/routes";

export const Navigation = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to={ROUTES.LANDING}>Start</Link>
        </li>
        {/* <li>
          <Link to={ROUTES.MACKE}>Spiel</Link>
        </li>
        <li>
          <Link to={ROUTES.STATS}>Statistiken</Link>
        </li> */}
        {/* <li>
          <Link to={ROUTES.HOWTO}>How To</Link>
        </li>
        <li>
          <Link to={ROUTES.ABOUT}>About</Link>
        </li> */}
      </ul>
      <Logo />
    </div>
  );
};
