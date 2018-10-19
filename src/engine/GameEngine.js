export const calculateScore = (diceStates) => {
    const takenDices = getTakenDices(diceStates);
    const scoreList = mapDiceStateListToArray(takenDices);

    if (diceSelectionIsStreet(scoreList)) {
        return 1000;
    }

    return (scoreList[0] * 100) + (scoreList[4] * 50) + additionalTriple(scoreList);
}

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

const additionalTriple = (scores) => {
    const value = scores.findIndex((score, index) => index !== 0 && index !== 4 && score > 2);
    const additional = (value + 1) * 100;
    return additional
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

/*
 * TODO: 
 * Write a function that takes the whole game state, calculates the scores
 * and decides which actions can be performed next.
 * 
 * Implement other functions, that are able to handle "Zug beenden" and "Passen"
 */
export const processTakeScores = (gameState) => {
    let nextState = gameState;

    const diceStates = gameState.diceStates;
    const selectedDices = getTakenDices(gameState.diceStates);
    const scoreList = mapDiceStateListToArray(selectedDices);
    const validSelection = diceSelectionIsValid(selectedDices);

    nextState = { ...nextState,
        validSelection
    };

    if (!validSelection) {
        diceStates.forEach((dice) => {
            if (dice.keepValue && !dice.taken) {
                dice.keepValue = false;
            }
          });

        nextState = {...nextState,
            diceStates
        }
        return nextState;
    }

    selectedDices.map((dice) => dice.taken = true);

    if (diceSelectionIsStreet(scoreList)) {
        nextState = { ...nextState,
            continuationNeeded: true,
            thrown: false,
            firstThrow: true,
            currentScore: gameState.currentScore + 1000
        }
        return nextState;
    }

    // ...

    return nextState;
}

export const processFinishMove = () => {
    throw new Error("unimplemented!")
}