const mapDiceStateListToArray = (diceStates) => {
    const scoreDist = [0, 0, 0, 0, 0, 0];

    diceStates.map((diceState) => {
        return scoreDist[diceState.score - 1] = (scoreDist[diceState.score - 1] || 0) + 1;
    }, scoreDist)
    return scoreDist;
}

const diceSelectionIsStreet = (scoreList) => {
    const lowerStreet = JSON.stringify(scoreList) === JSON.stringify([1, 1, 1, 1, 1, 0]);
    const upperStreet = JSON.stringify(scoreList) === JSON.stringify([0, 1, 1, 1, 1, 1]);
    return lowerStreet || upperStreet;
}

const getTakenDices = (diceStates) => {
    return diceStates.filter(state => state.keepValue && !state.taken);
}

export const continuationNeeded = (diceState) => {
    return diceState.filter(dice => dice.taken).length === 6;
}

export const diceCompositionIsValid = (thrownDices) => {
    // find dices that aren't taken yet
    thrownDices = thrownDices.filter(dice => !dice.taken);

    // check if there is at least one '1' or one '5'
    return thrownDices.filter(dice => dice.score === 1 || dice.score === 5).length > 0;
}

const verifyAdditionalSpotsAreSelectedAtLeastThreeTimes = (additionalSpots) => {
    additionalSpots = additionalSpots.filter((spot) => spot !== 0)

    if (additionalSpots.length > 0) {
        const filtered = additionalSpots.filter((score) => score < 3);
        return !(filtered.length > 0);
    }
    return true;
}

export const diceSelectionIsValid = (diceStates) => {
    const takenDices = getTakenDices(diceStates);

    // selection must contain at least one dice
    if (takenDices.length < 1) {
        console.log("Bitte mindestens einen Würfel auswählen!")
        return false;
    }

    const scoreList = mapDiceStateListToArray(diceStates);

    // selection must contain at leas one '5' or one '1'
    const containstOneOrFive = takenDices.filter((diceState) => diceState.score === 5 || diceState.score === 1).length > 0;

    // if another number of spots is selected, it has to occur at least three times:
    const addtionalSpots = mapDiceStateListToArray(takenDices.filter((diceState) => diceState.score !== 5 && diceState.score !== 1));
    const additionalSpotsvalid = verifyAdditionalSpotsAreSelectedAtLeastThreeTimes(addtionalSpots)

    if (!additionalSpotsvalid) {
        console.log("Was machst du denn?!")
    }

    return containstOneOrFive && additionalSpotsvalid;
}

export const verifyAtLeastOneDiceIsSelected = (diceStates) => {
    return getTakenDices(diceStates).length > 0;
}

const calculateScores = (scoreList) => {
    let currentScore = 0;

    scoreList.forEach((score, index) => {

        // TODO: do it right and clean up afterwards
        if (score === 5) {
            console.log("all same -> 1000")
            currentScore += 1000;
        } else if (score === 4) {
            console.log("four of a kind:" + (index + 1) * 100);
            score += (index + 1) * 100
        } else if (score === 3) {
            console.log("three of a kind: " + (index + 1) * 100);
            score += (index + 1) * 100
        } else if (score === 2) {
            console.log("index = " + index)
            console.log("val = " + score)
            console.log("hm... nur 2 -> " + (index + 1) * 10 * 2)

            // TODO: shouldn't be hard coded
            if (index === 0) {
                currentScore += 200;
            } else {
                currentScore += 100;
            }

        } else if (score === 1) {
            // TODO: shouldn't be hard coded
            if (index === 0) {
                currentScore += 100;
            } else {
                currentScore += 50;
            }
        }
    })
    console.log("currentScore= " + currentScore)
    return currentScore;
}

const handleStreet = (selectedDices, currentScore, nextState) => {
    selectedDices.map((dice) => dice.taken = true);
    nextState = { ...nextState,
        continuationNeeded: true,
        thrown: false,
        firstThrow: true,
        currentScore: currentScore + 1000
    }
    return nextState;
}

const handleInvalidSelection = (diceStates, nextState) => {
    diceStates.forEach((dice) => {
        if (dice.keepValue && !dice.taken) {
            dice.keepValue = false;
        }
    });

    nextState = { ...nextState,
        diceStates
    }
    return nextState;
}

const markAsTaken = (selectedDices) => {
    return selectedDices.map((dice) => dice.taken = true);
}

/*
 * TODO: 
 * Write a function that takes the whole game state, calculates the scores
 * and decides which actions can be performed next.
 * 
 * Implement other functions, that are able to handle "Zug beenden" and "Passen"
 */
export const processTakeScores = (gameState) => {
    const diceStates = gameState.diceStates;
    const selectedDices = getTakenDices(gameState.diceStates);
    const scoreList = mapDiceStateListToArray(selectedDices);
    const validSelection = diceSelectionIsValid(selectedDices);

    let nextState = { ...gameState,
        validSelection
    };

    if (diceSelectionIsStreet(scoreList)) {
        return handleStreet(selectedDices, gameState.currentScore, nextState);
    }

    if (!validSelection) {
        return handleInvalidSelection(diceStates, nextState);
    }

    markAsTaken(selectedDices);

    return { ...nextState,
        currentScore: gameState.currentScore + calculateScores(scoreList),
        thrown: false
    };
}

export const processFinishMove = () => {
    throw new Error("unimplemented!")
}