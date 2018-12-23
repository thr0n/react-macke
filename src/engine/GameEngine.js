const mapDiceStateListToArray = diceStates => {
    const scoreDist = [0, 0, 0, 0, 0, 0];

    diceStates.map(diceState => {
        return (scoreDist[diceState.score - 1] =
            (scoreDist[diceState.score - 1] || 0) + 1);
    }, scoreDist);
    return scoreDist;
};

const diceSelectionIsStreet = scoreList => {
    const lowerStreet =
        JSON.stringify(scoreList) === JSON.stringify([1, 1, 1, 1, 1, 0]);
    const upperStreet =
        JSON.stringify(scoreList) === JSON.stringify([0, 1, 1, 1, 1, 1]);
    return lowerStreet || upperStreet;
};

const getTakenDices = diceStates => {
    return diceStates.filter(state => state.keepValue && !state.taken);
};

export const continuationNeeded = diceState => {
    return diceState.filter(dice => dice.taken).length === diceState.length;
};

export const diceCompositionIsValid = thrownDices => {
    // find dices that aren't taken yet
    thrownDices = thrownDices.filter(dice => !dice.taken);

    // check if there is at least one '1' or one '5'
    return (
        thrownDices.filter(dice => dice.score === 1 || dice.score === 5).length > 0
    );
};

const verifyAdditionalSpotsAreSelectedExactlyThreeTimes = additionalSpots => {
    additionalSpots = additionalSpots.filter(spot => spot !== 0);

    const additionalSelectedSpots = mapDiceStateListToArray(additionalSpots)

    if (additionalSpots.length > 0) {
        const filtered = additionalSelectedSpots.filter(score => score === 3);
        return filtered.length > 0;
    }
    return true;
};

export const diceSelectionIsValid = takenDices => {
    // selection must contain at least one dice
    if (takenDices.length < 1) {
        console.log("Bitte mindestens einen Würfel auswählen!");
        return false;
    }

    // selection must contain at leas one '5' or one '1'
    const containstOneOrFive =
        takenDices.filter(
            diceState => diceState.score === 5 || diceState.score === 1
        ).length > 0;

    // if another number of spots is selected, it has to occur at least three times:
    const addtionalSpots = takenDices.filter(diceState => diceState.score !== 5 && diceState.score !== 1);
    const additionalSpotsValid = verifyAdditionalSpotsAreSelectedExactlyThreeTimes(addtionalSpots);

    return containstOneOrFive && additionalSpotsValid;
};

export const verifyAtLeastOneDiceIsSelected = diceStates => {
    return getTakenDices(diceStates).length > 0;
};

const getScoresBy = (dots, count) => {
    dots += 1; // increase the dots to match dice dots
    switch (count) {
        case 5:
            return 2000;
        case 4:
            return (dots === 1) ? 1100 : 550
        case 3:
            return (dots === 1) ? 1000 : dots * 100;
        case 2:
            return (dots === 1) ? 200 : 100;
        case 1:
            return (dots === 1) ? 100 : 50;
        default:
            return 0;
    }
}

const calculateScores = scoreList => {
    let currentScore = 0;

    scoreList.map((count, dots) => {
        currentScore += getScoresBy(dots, count);
    });

    return currentScore;
};

const handleStreet = (selectedDices, currentScore, nextState) => {
    selectedDices.map(dice => (dice.taken = true));
    nextState = {
        ...nextState,
        continuationNeeded: true,
        thrown: false,
        firstThrow: true,
        currentScore: currentScore + 2000
    };
    return nextState;
};

const handleInvalidSelection = (diceStates, nextState) => {
    diceStates.forEach(dice => {
        if (dice.keepValue && !dice.taken) {
            dice.keepValue = false;
        }
    });

    nextState = {
        ...nextState,
        diceStates
    };
    return nextState;
};

const markAsTaken = selectedDices => {
    return selectedDices.map(dice => (dice.taken = true));
};

export const processTakeScores = gameState => {
    const diceStates = gameState.diceStates;
    const selectedDices = getTakenDices(gameState.diceStates);
    const scoreList = mapDiceStateListToArray(selectedDices);
    const validSelection = diceSelectionIsValid(selectedDices);

    let nextState = {
        ...gameState,
        validSelection
    };

    if (diceSelectionIsStreet(scoreList)) {
        return handleStreet(selectedDices, gameState.currentScore, nextState);
    }

    if (!validSelection) {
        return handleInvalidSelection(diceStates, nextState);
    }

    markAsTaken(selectedDices);

    return {
        ...nextState,
        currentScore: gameState.currentScore + calculateScores(scoreList),
        thrown: false,
        continuationNeeded: continuationNeeded(diceStates),
        canFinish: !continuationNeeded(diceStates)
    };
};

export const processInvalidComposition = gameState => {
    const {
        currentPlayerId
    } = gameState;

    gameState.players[currentPlayerId].moves.push("–")

    const nextState = {
        currentPlayerId: switchToNextPlayer(currentPlayerId, gameState.players.length),
        currentScore: 0,
        continuationNeeded: false,
        firstThrow: true,
        thrown: false,
        canFinish: false,
        validSelection: false,
        diceStates: [{
                keepValue: false,
                taken: false,
                score: 1
            },
            {
                keepValue: false,
                taken: false,
                score: 3
            },
            {
                keepValue: false,
                taken: false,
                score: 4
            },
            {
                keepValue: false,
                taken: false,
                score: 6
            },
            {
                keepValue: false,
                taken: false,
                score: 2
            }
        ]
    }
    return nextState;
}

export const switchToNextPlayer = (currentPlayerId, numberOfPlayers) => {
    return (currentPlayerId === numberOfPlayers - 1) ? 0 : currentPlayerId + 1
}

export const processFinishMove = (gameState) => {
    const {
        currentPlayerId
    } = gameState;

    const newOverallScore = gameState.players[currentPlayerId].overallScore += gameState.currentScore;
    const gameOver = newOverallScore >= 5050; // TODO: remove this magic number

    gameState.players[currentPlayerId].overallScore = newOverallScore;
    gameState.players[currentPlayerId].moves.push(gameState.players[currentPlayerId].overallScore)

    if (gameOver) {
        return {
            gameOver,
            thrown: true,
            canFinish: false
        }
    }

    return {
        currentPlayerId: switchToNextPlayer(currentPlayerId, gameState.players.length),
        currentScore: 0,
        gameOver,
        canFinish: false,
        diceStates: [{
                keepValue: false,
                taken: false,
                score: 1
            },
            {
                keepValue: false,
                taken: false,
                score: 3
            },
            {
                keepValue: false,
                taken: false,
                score: 4
            },
            {
                keepValue: false,
                taken: false,
                score: 6
            },
            {
                keepValue: false,
                taken: false,
                score: 2
            }
        ]
    };
};
