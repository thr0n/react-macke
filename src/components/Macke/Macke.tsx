import React, { useState } from "react";
import { PlayerManager } from "../PlayerManager/PlayerManager";
import GameBoard from "../GameBoard/GameBoard";
import { Player } from "../../types/Player";

export const Macke = () => {
  const [players, setPlayers] = useState<Player[]>([""]);
  const [started, setStarted] = useState(false);

  const startGame = (players: string[]) => {
    setPlayers([...players]);
    setStarted(true);
  };

  return started ? (
    <GameBoard players={players} />
  ) : (
    <PlayerManager onStart={startGame} />
  );
};
