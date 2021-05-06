const TARGET_SCORE = 700;

const mapDiceStateListToArray = (diceStates: any) => {
  const scoreDist = [0, 0, 0, 0, 0, 0];

  diceStates.forEach((diceState: any) => {
    scoreDist[diceState.score - 1] = (scoreDist[diceState.score - 1] || 0) + 1;
  }, scoreDist);

  return scoreDist;
};

const resetDices = () => [
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

const diceSelectionIsStreet = (scoreList: any) => {
  const lowerStreet =
    JSON.stringify(scoreList) === JSON.stringify([1, 1, 1, 1, 1, 0]);
  const upperStreet =
    JSON.stringify(scoreList) === JSON.stringify([0, 1, 1, 1, 1, 1]);
  const compleStreet =
    JSON.stringify(scoreList) === JSON.stringify([1, 1, 1, 1, 1, 1]);

  return lowerStreet || upperStreet || compleStreet;
};

const getTakenDices = (diceStates: any) => {
  return diceStates.filter((state: any) => state.keepValue && !state.taken);
};

export const continuationNeeded = (diceStates: any) => {
  return (
    diceStates.filter((dice: any) => dice.taken).length === diceStates.length
  );
};

export const diceCompositionIsValid = (thrownDices: any) => {
  // find dices that aren't taken yet
  thrownDices = thrownDices.filter((dice: any) => !dice.taken);

  // check if there is at least one '1' or one '5'
  return (
    thrownDices.filter((dice: any) => dice.score === 1 || dice.score === 5)
      .length > 0
  );
};

const verifyAdditionalSpotsAreSelectedExactlyThreeTimes = (
  additionalSpots: any
) => {
  const additionalSelectedSpots = mapDiceStateListToArray(
    additionalSpots.filter((spot: any) => spot !== 0)
  );

  if (additionalSpots.length > 0) {
    const filtered = additionalSelectedSpots.filter((score) => score === 3);
    return filtered.length > 0;
  }
  return true;
};

export const diceSelectionIsValid = (takenDices: any) => {
  // selection must contain at least one dice
  if (takenDices.length < 1) {
    return false;
  }

  // selection must contain at leas one '5' or one '1'
  const containstOneOrFive =
    takenDices.filter(
      (diceState: any) => diceState.score === 5 || diceState.score === 1
    ).length > 0;

  // if another number of spots is selected, it has to occur at least three times:
  const addtionalSpots = takenDices.filter(
    (diceState: any) => diceState.score !== 5 && diceState.score !== 1
  );
  const additionalSpotsValid = verifyAdditionalSpotsAreSelectedExactlyThreeTimes(
    addtionalSpots
  );

  return containstOneOrFive && additionalSpotsValid;
};

export const verifyAtLeastOneDiceIsSelected = (diceStates: any) => {
  return getTakenDices(diceStates).length > 0;
};

const getScoresByDotsAndCount = (dots: number, count: number) => {
  dots += 1; // increase the dots to match dice dots
  switch (count) {
    case 6:
    case 5:
      return 2000;
    case 4:
      return dots === 1 ? 1100 : 550;
    case 3:
      return dots === 1 ? 1000 : dots * 100;
    case 2:
      return dots === 1 ? 200 : 100;
    case 1:
      return dots === 1 ? 100 : 50;
    default:
      return 0;
  }
};

const calculateScores = (scoreList: any) => {
  let currentScore = 0;

  scoreList.forEach((count: number, dots: number) => {
    currentScore += getScoresByDotsAndCount(dots, count);
  });

  return currentScore;
};

const handleStreet = (
  selectedDices: any,
  currentScore: any,
  nextState: any,
  diceStates: any
) => {
  selectedDices.map((dice: any) => (dice.taken = true));
  nextState = {
    ...nextState,
    thrown: false,
    validSelection: true,
    continuationNeeded: continuationNeeded(diceStates),
    canFinish: !continuationNeeded(diceStates),
    currentScore: currentScore + 2000,
  };
  return nextState;
};

const handleInvalidSelection = (diceStates: any, nextState: any) => {
  diceStates.forEach((dice: any) => {
    if (dice.keepValue && !dice.taken) {
      dice.keepValue = false; // reset the invalid selection
    }
  });

  return {
    ...nextState,
    diceStates,
  };
};

const markAsTaken = (selectedDices: any) => {
  return selectedDices.map((dice: any) => (dice.taken = true));
};

export const processTakeScores = (diceStates: any, currentScore: any) => {
  const selectedDices = getTakenDices(diceStates);
  const scoreList = mapDiceStateListToArray(selectedDices);
  const validSelection = diceSelectionIsValid(selectedDices);

  const nextState = {
    validSelection,
  };

  if (diceSelectionIsStreet(scoreList)) {
    return handleStreet(selectedDices, currentScore, nextState, diceStates);
  }

  if (!validSelection) {
    return handleInvalidSelection(diceStates, nextState);
  }

  markAsTaken(selectedDices);

  return {
    ...nextState,
    currentScore: currentScore + calculateScores(scoreList),
    thrown: false,
    continuationNeeded: continuationNeeded(diceStates),
    canFinish: !continuationNeeded(diceStates),
  };
};

export const processInvalidComposition = (
  currentPlayerId: any,
  players: any
) => {
  players[currentPlayerId].moves.push("–");

  const nextState = {
    currentPlayerId: switchToNextPlayer(currentPlayerId, players.length),
    firstThrow: true,
    thrown: false,
    diceStates: resetDices(),
  };
  return nextState;
};

export const switchToNextPlayer = (
  currentPlayerId: any,
  numberOfPlayers: number
) => {
  return currentPlayerId === numberOfPlayers - 1 ? 0 : currentPlayerId + 1;
};

export const processFinishMove = (
  currentPlayerId: any,
  players: any,
  currentScore: number
) => {
  const newOverallScore = (players[
    currentPlayerId
  ].overallScore += currentScore);
  const gameOver = newOverallScore >= TARGET_SCORE;

  players[currentPlayerId].overallScore = newOverallScore;
  players[currentPlayerId].moves.push(players[currentPlayerId].overallScore);

  if (gameOver) {
    players[currentPlayerId].wonGames++;
    return {
      gameOver,
      currentScore: newOverallScore,
      thrown: true,
      players,
    };
  }

  return {
    currentPlayerId: switchToNextPlayer(currentPlayerId, players.length),
    currentScore: 0,
    gameOver,
    canFinish: false,
    diceStates: resetDices(),
  };
};
