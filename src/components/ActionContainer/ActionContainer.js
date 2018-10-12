import * as React from "react";
import { Button } from "antd";

export class ActionContainer extends React.Component {
    render() {
        return (
            <div className="action-container">
            <Button type="primary" onClick={() => this.props.rollDices()}>
              Würfeln
            </Button>
            <Button
              type="primary"
              disabled={!this.props.canTakeScores}
              onClick={() => this.props.onTakeScores()}
            >
              Punkte nehmen
            </Button>
            <Button type="primary" disabled>
              Zug beenden
            </Button>
            <Button type="primary" disabled={!this.props.canPass}>
              Passen
            </Button>
          </div>
        )
    }
}