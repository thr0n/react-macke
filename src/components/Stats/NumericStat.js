import * as React from "react";

import "./StatContainer.scss";

export const NumericStat = (props) => (
  <div className="stat-container">
    <p className="stat-value">{props.value}</p>
    <p className="stat-label">{props.label}</p>
  </div>
);
