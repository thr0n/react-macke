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

const diceSelectionIsStreet = (diceSelection) => {
    return JSON.stringify(diceSelection) === JSON.stringify([1, 1, 1, 1, 1, 1]);
}

const additionalTriple = (scores) => {
    const value = scores.findIndex((score, index) => index !== 0 && index !== 4 && score > 2);
    const additional = (value + 1) * 100;
    return additional
}

const getTakenDices = (diceStates) => {
    return diceStates.filter(state => state.keepValue && !state.keepValue.taken);
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

export const diceSelectionIsValid = (diceStates) => {
    const takenDices = getTakenDices(diceStates);

    if (takenDices.length < 1) {
        console.log("Bitte mindestens einen Würfel auswählen!")
        return false;
    }

    const filtered = takenDices.filter((diceState) => diceState.score === 5 || diceState.score === 1);
    return filtered.length > 0;
}