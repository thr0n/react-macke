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
            return (dots === 1) ? 1100 : dots * 100;
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

export const processFinishMove = (gameState) => {
    const { currentScore, playerScore } = gameState;

    let nextState = { ...gameState,
        playerScore: playerScore + currentScore,
        currentScore: 0,
        thrown: false,
        firstThrow: true,
        canFinish: false,
    };

    return nextState
};

export const processPass = () => {
    
}