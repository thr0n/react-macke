import React, { Component } from "react";
import { Row, Col } from "antd";

import { GameBoard } from "./components/GameBoard/GameBoard";

import "./App.css";
import logo from "./macke-logo.png";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Row style={{ marginTop: "3%" }}>
          <Col span="8" />
          <Col span="8">
            <img src={logo} alt="React-Macke" />
          </Col>
          <Col span="8" />
        </Row>
        <Row>
          <GameBoard />
        </Row>
      </div>
    );
  }
}

export default App;
