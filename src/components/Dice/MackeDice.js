import * as React from "react";
import PropTypes from "prop-types";
import "./MackeDice.scss";

export const MackeDice = (props) => {
    return (
      <span
        className={"macke-dice " + (!props.clickable ? "not-selectable" : (props.keepValue ? "keep" : "do-not-keep"))}
        onClick={() => { 
          if(props.clickable) {
            props.onClick(props.diceId, !props.keepValue)
          }
        }}>
          {props.value}
      </span>
    );
}

MackeDice.propTypes = {
  diceId: PropTypes.number,
  value: PropTypes.number,
  keepValue: PropTypes.bool,
  clickable: PropTypes.bool,
  onClick: PropTypes.func
};
