import React, { useState } from "react";
import { PlayerManager } from "../PlayerManager/PlayerManager";
import GameBoard from "../GameBoard/GameBoard";
import { Player } from "../../types/Player";
import { Simulate } from "react-dom/test-utils";

export const Macke = () => {
  const [players, setPlayers] = useState<Player[]>([""]);
  const [started, setStarted] = useState(false);

  const addPlayer = (index: number, playerName: string) => {
    const currentPlayers = players;

    if (players.length === 1) {
      setPlayers([playerName, ""]);
      return;
    } else {
      const currentPlayers = players;
      currentPlayers.splice(index, 1, playerName);
      if (players[players.length - 1] !== "") {
        currentPlayers.push("");
      }
    }

    setPlayers([...currentPlayers]);
  };

  const removePLayer = (index: number) => {
    console.log(players);
    const currentPlayers = players.splice(index, 1);
    console.log(currentPlayers);
    setPlayers([...currentPlayers]);
  };

  const startGame = (players: string[]) => {
    setPlayers([...players.filter((p) => p !== "")]);
    setStarted(true);
  };

  return started ? (
    <GameBoard players={players} />
  ) : (
    <PlayerManager
      players={players}
      onAdd={(index: number, playerName: string) =>
        addPlayer(index, playerName)
      }
      onRemove={(index: number) => removePLayer(index)}
      onStart={startGame}
    />
  );
};
