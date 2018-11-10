import * as React from "react";
import { Menu, Icon } from "antd";

const SubMenu = Menu.SubMenu;

export class MackeMenu extends React.Component {
  render() {
    return (
      <Menu onClick={this.handleClick} mode="horizontal" theme="dark">
        <Menu.Item key="play">
          <Icon type="caret-right" /> Spielen
        </Menu.Item>
        <Menu.Item key="getting-started">
          <Icon type="rocket" /> Anleitung
        </Menu.Item>
        <Menu.Item key="highscores">
          <Icon type="trophy" /> Highscores
        </Menu.Item>
        <Menu.Item key="how-to">
          <Icon type="question-circle" /> FAQ
        </Menu.Item>
        <Menu.Item key="notification">
          <Icon type="notification" /> Teilen
        </Menu.Item>
        <SubMenu title={<Icon type="user" />}>
          <Menu.Item key="setting:1">Einloggen</Menu.Item>
          <Menu.Item key="setting:2">Registrieren</Menu.Item>
        </SubMenu>
        <Menu.Item key="github">
          <a
            href="https://github.com/thr0n/react-macke"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon type="github" />{" "}
          </a>
        </Menu.Item>
      </Menu>
    );
  }
}
