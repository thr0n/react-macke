import * as React from "react";
import {
    processTakeScores
} from "../GameEngine";

describe("GameEngine", () => {

    it("should return 1000 points for 'the lower street'", () => {
        const testState = {
            currentScore: 0,
            diceStates: [
                { score: 1, keepValue: true, taken: false},
                { score: 2, keepValue: true, taken: false},
                { score: 3, keepValue: true, taken: false},
                { score: 4, keepValue: true, taken: false},
                { score: 5, keepValue: true, taken: false},
            ]
        }
        const result = processTakeScores(testState);
        expect(result.currentScore).toBe(1000);
    })

    it("should return 1000 points for 'the upper street'", () => {
        const testState = {
            currentScore: 0,
            diceStates: [
                { score: 2, keepValue: true, taken: false},
                { score: 3, keepValue: true, taken: false},
                { score: 4, keepValue: true, taken: false},
                { score: 5, keepValue: true, taken: false},
                { score: 6, keepValue: true, taken: false},
            ]
        }
        const result = processTakeScores(testState);
        expect(result.currentScore).toBe(1000);
    })

    it("should return 100 points for a single 1", () => {
        const testState = {
            currentScore: 0,
            diceStates: [{
                score: 1,
                keepValue: true,
                taken: false
            }]
        }
        const result = processTakeScores(testState);
        expect(result.currentScore).toBe(100);
    })

    it("should return 150 points for a single 1 and a single 5", () => {
        const testState = {
            currentScore: 0,
            diceStates: [{
                    score: 1,
                    keepValue: true,
                    taken: false
                },
                {
                    score: 5,
                    keepValue: true,
                    taken: false
                },
            ]
        }
        const result = processTakeScores(testState);
        expect(result.currentScore).toBe(150);
    })

    it("should return 100 points for two times 5", () => {
        const testState = {
            currentScore: 0,
            diceStates: [{
                    score: 5,
                    keepValue: true,
                    taken: false
                },
                {
                    score: 5,
                    keepValue: true,
                    taken: false
                },
            ]
        }
        const result = processTakeScores(testState);
        expect(result.currentScore).toBe(100);
    })
})