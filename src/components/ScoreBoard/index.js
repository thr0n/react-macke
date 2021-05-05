import * as React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import "./ScoreBoard.scss";

const getNthRow = (index, players) => {
  return players.map((player) => player.moves[index]);
};

export const ScoreBoard = (props) => {
  const createRows = (players) => {
    const rows = [];

    players[0].moves.forEach((move, index) => {
      const nthRow = getNthRow(index, players);
      rows.push(nthRow);
    });

    return rows;
  };

  const rows = createRows(props.players);

  return (
    <div className="scoreboard">
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              {props.players.map((player, index) => (
                <TableCell key={`{${player.player}-${index}`} align="center">
                  {player.player} ({player.wonGames})
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {row.map((val, index) => {
                  return (
                    <TableCell key={index} align="center">
                      {val}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};
