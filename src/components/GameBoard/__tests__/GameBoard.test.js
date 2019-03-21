import * as React from "react";
import { mount, shallow } from "enzyme";
import { GameBoardBase as GameBoard } from "../GameBoard";

describe("GameBoard", () => {
  it("should moint without errors", () => {
    const comp = mount(<GameBoard players={["p1", "p2"]} started />);

    expect(comp.find("Grid#current-player")).toHaveLength(1);
    expect(comp.find("MackeDice")).toHaveLength(6);
    expect(comp.find("Fab")).toHaveLength(3);

    const tableHeaders = comp.find("th");
    expect(tableHeaders).toHaveLength(2);
    expect(tableHeaders.get(0).props.children[0]).toEqual("p1");
    expect(tableHeaders.get(1).props.children[0]).toEqual("p2");
  });

  it("should set a message flag", () => {
    const wrapper = mount(<GameBoard players={["p1", "p2"]} />);

    expect(
      wrapper.instance().setMessageFlag("winnerMessage", true, "any_Reason")
    );
    expect(wrapper.state().messagesVisible.winnerMessage).toBe(true);

    expect(
      wrapper.instance().setMessageFlag("winnerMessage", false, "clickaway")
    );
    expect(wrapper.state().messagesVisible.winnerMessage).toBe(true);

    expect(
      wrapper.instance().setMessageFlag("unknown_key", false, "any_reason")
    );
    expect(wrapper.state().messagesVisible.winnerMessage).toBe(true);
  });

  it("should throw messages", () => {
    const wrapper = mount(<GameBoard players={["p1", "p2"]} />);

    expect(wrapper.state().messagesVisible.invalidComposition).toBe(false);
    wrapper.instance().throwInvalidDiceCompositionMessage();
    expect(wrapper.state().messagesVisible.invalidComposition).toBe(true);

    expect(wrapper.state().messagesVisible.invalidSelection).toBe(false);
    wrapper.instance().throwInvalidDiceSelectionMessage();
    expect(wrapper.state().messagesVisible.invalidSelection).toBe(true);

    expect(wrapper.state().messagesVisible.continuationNeeded).toBe(false);
    wrapper.instance().throwContinuationNeededMessage();
    expect(wrapper.state().messagesVisible.continuationNeeded).toBe(true);

    expect(wrapper.state().messagesVisible.winnerMessage).toBe(false);
    wrapper.instance().throwWinnerMessage();
    expect(wrapper.state().messagesVisible.winnerMessage).toBe(true);
  });

  it("should call the roll dices callback", () => {
    const spy = jest.spyOn(GameBoard.prototype, "rollDices");
    const comp = mount(<GameBoard players={["p1", "p2"]} started />);

    comp.find("WithStyles(Fab)#roll-dices-button").simulate("click");

    expect(spy).toHaveBeenCalled();
  });
});
