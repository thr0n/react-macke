import * as React from "react";
import PropTypes from "prop-types";
import "./MackeDice.scss";

export const getClassName = props => {
  if (props.taken) {
    return "used";
  } else if (!props.clickable) {
    return "not-selectable";
  } else if (props.keepValue) {
    return "keep";
  }
  return "do-not-keep";
};

export const MackeDice = props => {
  return (
    <span
      className={"macke-dice " + getClassName(props)}
      onClick={() => {
        if (props.clickable) {
          props.onClick(props.diceId, !props.keepValue);
        }
      }}
    >
      {props.value}
    </span>
  );
};

MackeDice.propTypes = {
  diceId: PropTypes.number,
  value: PropTypes.number,
  keepValue: PropTypes.bool,
  taken: PropTypes.bool,
  clickable: PropTypes.bool,
  onClick: PropTypes.func
};
