import * as React from "react";
import PropTypes from "prop-types";
import "./MackeDice.scss";

export const MackeDice = (props) => {
    return (
      <span
        className={"macke-dice " + (props.keepValue ? "keep" : "do-not-keep")}
        onClick={() => props.onClick(props.diceId, !props.keepValue)}>
          {props.value}
      </span>
    );
}

MackeDice.propTypes = {
  diceId: PropTypes.number,
  value: PropTypes.number,
  keepValue: PropTypes.bool,
  onClick: PropTypes.func
};
