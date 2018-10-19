import * as React from "react";
import {shallow} from "enzyme";
import {GameBoard} from "../GameBoard";

describe("GameBoard", () => {
    /* TODO: move these tests to GameEngine test!
    it("should detect an invalid single dice", () => {
        const wrapper = shallow(<GameBoard/>);
        const takenDices = [
            { keepValue: true, taken: false, score: 2 }
        ];
        const result = wrapper.instance().diceCompositionIsValid(takenDices);
        expect(result).toBe(false);
    });

    it("should detect an invalid dice combination", () => {
        const wrapper = shallow(<GameBoard/>);
        const takenDices = [
            { keepValue: true, taken: false, score: 2 },
            { keepValue: true, taken: false, score: 2 },
            { keepValue: true, taken: false, score: 2 },
            { keepValue: true, taken: false, score: 2 },
            { keepValue: true, taken: false, score: 2 },
            { keepValue: true, taken: false, score: 2 }
        ];
        const takenDices2 = [
            { keepValue: true, taken: false, score: 2 },
            { keepValue: true, taken: false, score: 4 },
            { keepValue: true, taken: false, score: 2 },
            { keepValue: true, taken: false, score: 3 },
            { keepValue: true, taken: false, score: 3 },
            { keepValue: true, taken: false, score: 6 }
        ];
        const result = wrapper.instance().diceCompositionIsValid(takenDices);
        expect(result).toBe(false);

        const result2 = wrapper.instance().diceCompositionIsValid(takenDices2);
        expect(result2).toBe(false);
    });

    it("should detect a valid dice combination", () => {
        const wrapper = shallow(<GameBoard/>);
        const takenDices = [
            { keepValue: true, taken: false, score: 1 },
            { keepValue: true, taken: false, score: 2 },
            { keepValue: true, taken: false, score: 2 },
            { keepValue: true, taken: false, score: 2 },
            { keepValue: true, taken: false, score: 2 },
            { keepValue: true, taken: false, score: 2 }
        ];
        const takenDices2 = [
            { keepValue: true, taken: false, score: 1 },
            { keepValue: true, taken: false, score: 1 },
            { keepValue: true, taken: false, score: 1 },
            { keepValue: true, taken: false, score: 5 },
            { keepValue: true, taken: false, score: 5 },
            { keepValue: true, taken: false, score: 5 }
        ];
        const takenDices3 = [
            { keepValue: true, taken: false, score: 1 },
            { keepValue: true, taken: false, score: 1 },
            { keepValue: true, taken: false, score: 1 },
            { keepValue: true, taken: false, score: 1 },
            { keepValue: true, taken: false, score: 1 },
            { keepValue: true, taken: false, score: 1 }
        ];
        const result = wrapper.instance().diceCompositionIsValid(takenDices);
        expect(result).toBe(true);

        const result2 = wrapper.instance().diceCompositionIsValid(takenDices2);
        expect(result2).toBe(true);

        const result3 = wrapper.instance().diceCompositionIsValid(takenDices3);
        expect(result3).toBe(true);
    })

    it("should detect invalid dice selections", () => {
        const wrapper = shallow(<GameBoard/>);
        const selectedDices =[
            { keepValue: true, taken: false, score: 2 },
            { keepValue: true, taken: false, score: 3 },
            { keepValue: true, taken: false, score: 4 },
            { keepValue: true, taken: false, score: 6 },
        ]
        const result = wrapper.instance().diceSelectionIsValid([]);
        expect(result).toBe(false)

        const result2 = wrapper.instance().diceSelectionIsValid(selectedDices);
        expect(result2).toBe(false)
    })

    it("should return 50 points for a single 5", () => {
        const wrapper = shallow(<GameBoard/>);
        const selectedDices =[
            { keepValue: true, taken: false, score: 5 },
        ]

        const result = wrapper.instance().takeScores(selectedDices);
        expect(result).toBe(50);
    })

    it("should return 200 points for two times 1", () => {
        const wrapper = shallow(<GameBoard/>);
        const selectedDices =[
            { keepValue: true, taken: false, score: 1 },
            { keepValue: true, taken: false, score: 1 }
        ]

        const result = wrapper.instance().takeScores(selectedDices);
        expect(result).toBe(200);
    })

    it("should return 400 points for three times 3 and a single 1", () => {
        const wrapper = shallow(<GameBoard/>);
        const selectedDices =[
            { keepValue: true, taken: false, score: 3 },
            { keepValue: true, taken: false, score: 3 },
            { keepValue: true, taken: false, score: 3 },
            { keepValue: true, taken: false, score: 2 },
            { keepValue: true, taken: false, score: 6 },
            { keepValue: true, taken: false, score: 1 }
        ]

        const result = wrapper.instance().takeScores(selectedDices);
        expect(result).toBe(400);
    })

    it("should return 900 points for three times 1 and three times 6", () => {
        const wrapper = shallow(<GameBoard/>);
        const selectedDices =[
            { keepValue: true, taken: false, score: 1 },
            { keepValue: true, taken: false, score: 1 },
            { keepValue: true, taken: false, score: 6 },
            { keepValue: true, taken: false, score: 6 },
            { keepValue: true, taken: false, score: 6 },
            { keepValue: true, taken: false, score: 1 }
        ]

        const result = wrapper.instance().takeScores(selectedDices);
        expect(result).toBe(900);
    })

    it("should return 700 points for three times 5 and three times 2", () => {
        const wrapper = shallow(<GameBoard/>);
        const selectedDices =[
            { keepValue: true, taken: false, score: 5 },
            { keepValue: true, taken: false, score: 2 },
            { keepValue: true, taken: false, score: 5 },
            { keepValue: true, taken: false, score: 5 },
            { keepValue: true, taken: false, score: 2 },
            { keepValue: true, taken: false, score: 2 }
        ]

        const result = wrapper.instance().takeScores(selectedDices);
        expect(result).toBe(700);
    })

    it("should return 1000 points for 'the street'", () => {
        const wrapper = shallow(<GameBoard/>);
        const selectedDices =[
            { keepValue: true, taken: false, score: 1 },
            { keepValue: true, taken: false, score: 2 },
            { keepValue: true, taken: false, score: 3 },
            { keepValue: true, taken: false, score: 4 },
            { keepValue: true, taken: false, score: 5 },
            { keepValue: true, taken: false, score: 6 }
        ]

        const result = wrapper.instance().takeScores(selectedDices);
        expect(result).toBe(1000);
    })*/
})