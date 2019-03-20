export const updateStartedGames = firebase => {
    firebase.gamesStarted().transaction(gamesStarted => {
        if (gamesStarted === null) {
            return 1;
        } else {
            gamesStarted++;
        }
        return gamesStarted;
    });
    firebase.latestGame().set(Date.now())
}

export const updateFinishedGames = firebase => {
    firebase.gamesFinished().transaction(gamesFinished => {
        if (gamesFinished === null) {
            return 1;
        } else {
            gamesFinished++;
        }
        return gamesFinished++;
    });
}