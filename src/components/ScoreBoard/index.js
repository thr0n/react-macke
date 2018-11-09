import * as React from "react";
import { Col, Row } from "antd";

export const ScoreBoard = props => {
  return (
    <div style={{ marginTop: "20px" }}>
      <Row>
        {props.players.map(player => (
          <Col span={24 / props.players.length} key={player.player}>
            {player.player}
            {player.moves.map((move, index) => (
              <Row key={`move-${player.player}-${index}`}>{move}</Row>
            ))}
          </Col>
        ))}
      </Row>
    </div>
  );
};
