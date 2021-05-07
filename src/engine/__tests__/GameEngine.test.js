import {
  processTakeScores,
  continuationNeeded,
  diceCompositionIsValid,
  diceSelectionIsValid,
  processFinishMove,
  verifyAtLeastOneDiceIsSelected,
  processInvalidComposition,
  switchToNextPlayer,
} from "../GameEngine";

describe("GameEngine", () => {
  it("should return 2000 points for 'the lower street'", () => {
    const testState = {
      currentScore: 0,
      diceStates: [
        {
          score: 1,
          keepValue: true,
          taken: false,
        },
        {
          score: 2,
          keepValue: true,
          taken: false,
        },
        {
          score: 3,
          keepValue: true,
          taken: false,
        },
        {
          score: 4,
          keepValue: true,
          taken: false,
        },
        {
          score: 5,
          keepValue: true,
          taken: false,
        },
      ],
    };
    const result = processTakeScores(
      testState.diceStates,
      testState.currentScore
    );
    expect(result.currentScore).toBe(2000);
  });

  it("should return 2000 points for 'the upper street'", () => {
    const testState = {
      currentScore: 0,
      diceStates: [
        {
          score: 2,
          keepValue: true,
          taken: false,
        },
        {
          score: 3,
          keepValue: true,
          taken: false,
        },
        {
          score: 4,
          keepValue: true,
          taken: false,
        },
        {
          score: 5,
          keepValue: true,
          taken: false,
        },
        {
          score: 6,
          keepValue: true,
          taken: false,
        },
      ],
    };
    const result = processTakeScores(
      testState.diceStates,
      testState.currentScore
    );
    expect(result.currentScore).toBe(2000);
  });

  it("should return 2000 points for five times 5", () => {
    const testState = {
      currentScore: 0,
      diceStates: [
        {
          score: 5,
          keepValue: true,
          taken: false,
        },
        {
          score: 5,
          keepValue: true,
          taken: false,
        },
        {
          score: 5,
          keepValue: true,
          taken: false,
        },
        {
          score: 5,
          keepValue: true,
          taken: false,
        },
        {
          score: 5,
          keepValue: true,
          taken: false,
        },
      ],
    };
    const result = processTakeScores(
      testState.diceStates,
      testState.currentScore
    );
    expect(result.currentScore).toBe(2000);
  });

  it("should return 2000 points for six times 5", () => {
    const testState = {
      currentScore: 0,
      diceStates: [
        {
          score: 5,
          keepValue: true,
          taken: false,
        },
        {
          score: 5,
          keepValue: true,
          taken: false,
        },
        {
          score: 5,
          keepValue: true,
          taken: false,
        },
        {
          score: 5,
          keepValue: true,
          taken: false,
        },
        {
          score: 5,
          keepValue: true,
          taken: false,
        },
        {
          score: 5,
          keepValue: true,
          taken: false,
        },
      ],
    };
    const result = processTakeScores(
      testState.diceStates,
      testState.currentScore
    );
    expect(result.currentScore).toBe(2000);
  });

  it("should return 550 points for four times 5", () => {
    const testState = {
      currentScore: 0,
      diceStates: [
        {
          score: 5,
          keepValue: true,
          taken: false,
        },
        {
          score: 5,
          keepValue: true,
          taken: false,
        },
        {
          score: 5,
          keepValue: true,
          taken: false,
        },
        {
          score: 5,
          keepValue: true,
          taken: false,
        },
      ],
    };
    const result = processTakeScores(
      testState.diceStates,
      testState.currentScore
    );
    expect(result.currentScore).toBe(550);
  });

  it("should return 1100 points for four times 11", () => {
    const testState = {
      currentScore: 0,
      diceStates: [
        {
          score: 1,
          keepValue: true,
          taken: false,
        },
        {
          score: 1,
          keepValue: true,
          taken: false,
        },
        {
          score: 1,
          keepValue: true,
          taken: false,
        },
        {
          score: 1,
          keepValue: true,
          taken: false,
        },
      ],
    };
    const result = processTakeScores(
      testState.diceStates,
      testState.currentScore
    );
    expect(result.currentScore).toBe(1100);
  });

  it("should return 100 points for a single 1", () => {
    const testState = {
      currentScore: 0,
      diceStates: [
        {
          score: 1,
          keepValue: true,
          taken: false,
        },
      ],
    };
    const result = processTakeScores(
      testState.diceStates,
      testState.currentScore
    );
    expect(result.currentScore).toBe(100);
  });

  it("should return 150 points for a single 1 and a single 5", () => {
    const testState = {
      currentScore: 0,
      diceStates: [
        {
          score: 1,
          keepValue: true,
          taken: false,
        },
        {
          score: 5,
          keepValue: true,
          taken: false,
        },
      ],
    };
    const result = processTakeScores(
      testState.diceStates,
      testState.currentScore
    );
    expect(result.currentScore).toBe(150);
  });

  it("should return 1000 for three times 1", () => {
    const testState = {
      currentScore: 0,
      diceStates: [
        {
          score: 1,
          keepValue: true,
          taken: false,
        },
        {
          score: 1,
          keepValue: true,
          taken: false,
        },
        {
          score: 1,
          keepValue: true,
          taken: false,
        },
      ],
    };
    const result = processTakeScores(
      testState.diceStates,
      testState.currentScore
    );
    expect(result.currentScore).toBe(1000);
  });

  it("should return 650 for three times 6 and a 5", () => {
    const testState = {
      currentScore: 0,
      diceStates: [
        {
          score: 6,
          keepValue: true,
          taken: false,
        },
        {
          score: 6,
          keepValue: true,
          taken: false,
        },
        {
          score: 6,
          keepValue: true,
          taken: false,
        },
        {
          score: 5,
          keepValue: true,
          taken: false,
        },
      ],
    };
    const result = processTakeScores(
      testState.diceStates,
      testState.currentScore
    );
    expect(result.currentScore).toBe(650);
  });

  it("should return 100 points for two times 5", () => {
    const testState = {
      currentScore: 0,
      diceStates: [
        {
          score: 5,
          keepValue: true,
          taken: false,
        },
        {
          score: 5,
          keepValue: true,
          taken: false,
        },
      ],
    };
    const result = processTakeScores(
      testState.diceStates,
      testState.currentScore
    );
    expect(result.currentScore).toBe(100);
  });

  test("continuation needed", () => {
    const diceStates = [
      {
        score: 5,
        keepValue: true,
        taken: true,
      },
      {
        score: 5,
        keepValue: true,
        taken: true,
      },
      {
        score: 5,
        keepValue: true,
        taken: true,
      },
      {
        score: 5,
        keepValue: true,
        taken: true,
      },
      {
        score: 5,
        keepValue: true,
        taken: true,
      },
      {
        score: 5,
        keepValue: true,
        taken: true,
      },
    ];
    const isNeeded = continuationNeeded(diceStates);
    expect(isNeeded).toBe(true);
  });

  test("diceCompositionIsValid", () => {
    const invalidComposition = [
      {
        score: 2,
        taken: false,
      },
      {
        score: 2,
        taken: false,
      },
      {
        score: 4,
        taken: false,
      },
      {
        score: 4,
        taken: false,
      },
      {
        score: 6,
        taken: false,
      },
      {
        score: 3,
        taken: false,
      },
    ];
    const validComposition = [
      {
        score: 1,
        taken: false,
      },
      {
        score: 2,
        taken: false,
      },
      {
        score: 4,
        taken: false,
      },
      {
        score: 4,
        taken: false,
      },
      {
        score: 6,
        taken: false,
      },
      {
        score: 3,
        taken: false,
      },
    ];
    expect(diceCompositionIsValid(invalidComposition)).toBe(false);
    expect(diceCompositionIsValid(validComposition)).toBe(true);
  });

  test("diceSelectionIsValid", () => {
    const validSelection = [
      {
        score: 2,
        keepValue: true,
      },
      {
        score: 2,
        keepValue: true,
      },
      {
        score: 2,
        keepValue: true,
      },
      {
        score: 1,
        keepValue: true,
      },
    ];
    const invalidSelection = [
      {
        score: 2,
        keepValue: true,
      },
      {
        score: 2,
        keepValue: true,
      },
      {
        score: 4,
        keepValue: true,
      },
      {
        score: 4,
        keepValue: true,
      },
      {
        score: 6,
        keepValue: true,
      },
      {
        score: 3,
        keepValue: true,
      },
    ];
    const emptySelection = [];

    expect(diceSelectionIsValid(emptySelection)).toBe(false);
    expect(diceSelectionIsValid(invalidSelection)).toBe(false);
    expect(diceSelectionIsValid(validSelection)).toBe(true);
  });

  test("processTakeScores_validSelection", () => {
    const validSelectionState = {
      currentScore: 0,
      diceStates: [
        {
          keepValue: true,
          taken: false,
          score: 5,
        },
        {
          keepValue: true,
          taken: false,
          score: 1,
        },
        {
          keepValue: false,
          taken: false,
          score: 6,
        },
        {
          keepValue: false,
          taken: false,
          score: 6,
        },
        {
          keepValue: true,
          taken: false,
          score: 1,
        },
        {
          keepValue: false,
          taken: false,
          score: 3,
        },
      ],
    };

    const expected = {
      currentScore: 250,
      continuationNeeded: false,
      thrown: false,
      canFinish: true,
      validSelection: true,
    };

    const actual = processTakeScores(
      validSelectionState.diceStates,
      validSelectionState.currentScore
    );
    expect(actual).toEqual(expected);
  });

  test("processTakeScores_invalidSelection", () => {
    const validSelectionState = {
      currentScore: 0,
      diceStates: [
        {
          keepValue: true,
          taken: false,
          score: 5,
        },
        {
          keepValue: false,
          taken: false,
          score: 1,
        },
        {
          keepValue: true,
          taken: false,
          score: 6,
        },
        {
          keepValue: true,
          taken: false,
          score: 6,
        },
        {
          keepValue: false,
          taken: false,
          score: 1,
        },
        {
          keepValue: false,
          taken: false,
          score: 3,
        },
      ],
    };

    const expected = {
      diceStates: [
        {
          keepValue: false,
          taken: false,
          score: 5,
        },
        {
          keepValue: false,
          taken: false,
          score: 1,
        },
        {
          keepValue: false,
          taken: false,
          score: 6,
        },
        {
          keepValue: false,
          taken: false,
          score: 6,
        },
        {
          keepValue: false,
          taken: false,
          score: 1,
        },
        {
          keepValue: false,
          taken: false,
          score: 3,
        },
      ],
      validSelection: false,
    };

    const actual = processTakeScores(
      validSelectionState.diceStates,
      validSelectionState.currentScore
    );
    expect(actual).toEqual(expected);
  });

  test("processFinishMove", () => {
    const testState = {
      players: [
        {
          playerName: "P1",
          overallScore: 0,
          moves: [],
        },
        {
          playerName: "P2",
          overallScore: 0,
          moves: [],
        },
      ],
      currentPlayerId: 0,
      currentScore: 50,
    };

    const expected = {
      currentPlayerId: 1,
      currentScore: 0,
      gameOver: false,
      canFinish: false,
      diceStates: [
        {
          keepValue: false,
          taken: false,
          score: 1,
        },
        {
          keepValue: false,
          taken: false,
          score: 3,
        },
        {
          keepValue: false,
          taken: false,
          score: 4,
        },
        {
          keepValue: false,
          taken: false,
          score: 6,
        },
        {
          keepValue: false,
          taken: false,
          score: 2,
        },
        {
          keepValue: false,
          taken: false,
          score: 5,
        },
      ],
    };

    const actual = processFinishMove(
      testState.currentPlayerId,
      testState.players,
      testState.currentScore
    );
    expect(actual).toEqual(expected);
  });

  test("processFinishMove_gameOver", () => {
    const testState = {
      players: [
        {
          playerName: "P1",
          overallScore: 5000,
          moves: [],
          wonGames: 0,
        },
        {
          playerName: "P2",
          overallScore: 0,
          moves: [],
          wonGames: 0,
        },
      ],
      currentPlayerId: 0,
      currentScore: 50,
    };

    const expected = {
      currentScore: 50,
      gameOver: true,
      thrown: true,
      players: [
        {
          playerName: "P1",
          overallScore: 5050,
          moves: [5050],
          wonGames: 1,
        },
        {
          playerName: "P2",
          overallScore: 0,
          moves: [],
          wonGames: 0,
        },
      ],
    };

    const actual = processFinishMove(
      testState.currentPlayerId,
      testState.players,
      testState.currentScore
    );
    expect(actual).toEqual(expected);
  });

  test("verifyAtLeastOneDiceIsSelected", () => {
    const invalidSelection = [
      {
        keepValue: false,
        taken: false,
        score: 1,
      },
      {
        keepValue: false,
        taken: false,
        score: 3,
      },
      {
        keepValue: false,
        taken: false,
        score: 4,
      },
      {
        keepValue: false,
        taken: false,
        score: 6,
      },
      {
        keepValue: false,
        taken: false,
        score: 2,
      },
      {
        keepValue: false,
        taken: false,
        score: 5,
      },
    ];
    const validSelection = [
      {
        keepValue: false,
        taken: false,
        score: 1,
      },
      {
        keepValue: true,
        taken: false,
        score: 3,
      },
      {
        keepValue: false,
        taken: false,
        score: 4,
      },
      {
        keepValue: false,
        taken: false,
        score: 6,
      },
      {
        keepValue: false,
        taken: false,
        score: 2,
      },
      {
        keepValue: false,
        taken: false,
        score: 5,
      },
    ];
    expect(verifyAtLeastOneDiceIsSelected(invalidSelection)).toBe(false);
    expect(verifyAtLeastOneDiceIsSelected(validSelection)).toBe(true);
  });

  test("processInvalidComposition", () => {
    const testState = {
      players: [
        {
          playerName: "P1",
          overallScore: 0,
          moves: [],
        },
        {
          playerName: "P2",
          overallScore: 0,
          moves: [],
        },
      ],
      currentPlayerId: 0,
    };

    const expected = {
      currentPlayerId: 1,
      firstThrow: true,
      thrown: false,
      diceStates: [
        {
          keepValue: false,
          taken: false,
          score: 1,
        },
        {
          keepValue: false,
          taken: false,
          score: 3,
        },
        {
          keepValue: false,
          taken: false,
          score: 4,
        },
        {
          keepValue: false,
          taken: false,
          score: 6,
        },
        {
          keepValue: false,
          taken: false,
          score: 2,
        },
        {
          keepValue: false,
          taken: false,
          score: 5,
        },
      ],
    };

    const actual = processInvalidComposition(
      testState.currentPlayerId,
      testState.players
    );
    expect(actual).toEqual(expected);
  });

  it("should switch to the correct next Player", () => {
    expect(switchToNextPlayer(0, 2)).toBe(1);
    expect(switchToNextPlayer(1, 2)).toBe(0);
  });
});
