import * as React from "react";
import { Button } from "antd";

export class ActionContainer extends React.Component {
  render() {
    return (
      <div className="action-container">
        <Button
          type="primary"
          onClick={() => this.props.rollDices()}
          disabled={this.props.thrown}
        >
          Würfeln{" "}
        </Button>{" "}
        <Button
          type="primary"
          disabled={!this.props.canTakeScores}
          onClick={() => this.props.onTakeScores()}
        >
          Punkte nehmen{" "}
        </Button>{" "}
        <Button
          type="primary"
          disabled={!this.props.canFinish}
          onClick={() => this.props.onFinishMove()}
        >
          Zug beenden{" "}
        </Button>{" "}
        {/* <Button
          type="secondary"
          disabled={!this.props.canPass}
          onClick={() => this.props.onPass()}
        >
          Passen{" "}
        </Button>{" "} */}
      </div>
    );
  }
}
