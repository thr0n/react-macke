import * as React from "react";
import { mount } from "enzyme";
import { ActionContainer } from "../ActionContainer";

describe("ActionContainer", () => {
  it("should call throw dices callback", () => {
    const rollDiceSpy = jest.fn();
    const wrapper = mount(<ActionContainer rollDices={rollDiceSpy} />);

    wrapper.find("Fab#roll-dices-button").simulate("click");
    expect(rollDiceSpy).toHaveBeenCalled();
  });

  it("should call take scores callback", () => {
    const takeScoreSpy = jest.fn();
    const wrapper = mount(
      <ActionContainer onTakeScores={takeScoreSpy} canTakeScores={true} />
    );

    wrapper.find("Fab#take-scores-button").simulate("click");
    expect(takeScoreSpy).toHaveBeenCalled();
  });

  it("should call finish move callback", () => {
    const finishMoveSpy = jest.fn();
    const wrapper = mount(
      <ActionContainer onFinishMove={finishMoveSpy} canFinish={true} />
    );

    wrapper.find("Fab#finish-move-button").simulate("click");
    expect(finishMoveSpy).toHaveBeenCalled();
  });

  it("should render a restart button when game is over", () => {
    const restartSpy = jest.fn();
    const wrapper = mount(
      <ActionContainer onRestart={restartSpy} gameOver={true} />
    );

    wrapper.find("Button#restart-button").simulate("click");
    expect(restartSpy).toHaveBeenCalled();
  });
});
