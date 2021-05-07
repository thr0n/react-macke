import React, { useState } from "react";
import { PlayerManager } from "../PlayerManager/PlayerManager";
import GameBoard from "../GameBoard/GameBoard";
import { Simulate } from "react-dom/test-utils";

export const Macke = () => {
  const [players, setPlayers] = useState<string[]>([""]);
  const [started, setStarted] = useState(false);

  const addPlayer = (playerName: string) => {
    const currentPlayers = players.filter((p) => p !== "");
    currentPlayers.push(playerName);
    if (currentPlayers.length < 4) {
      currentPlayers.push("");
    }
    setPlayers([...currentPlayers]);
  };

  const startGame = (players: string[]) => {
    // setPlayers(players);
    setPlayers([...players.filter((p) => p !== "")]);
    setStarted(true);
  };

  return started ? (
    <GameBoard players={players} />
  ) : (
    <PlayerManager
      players={players}
      onAdd={(playerName: string) => addPlayer(playerName)}
      onStart={startGame}
    />
  );
};
