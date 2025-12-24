import { useState } from "react";
import "./ticTacToe.css";
const PLAYERS = {
  X: "X",
  O: "O",
};

const calculateWinner = (tiles: string[]) => {
  const lines = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left
    [2, 4, 6], // Diagonal from top-right
  ];

  // Loop through all the lines to check for a winner
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // Check if all three tiles in the line are the same and not null
    if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
      return tiles[a]; // Return the winner ('X' or 'O')
    }
  }

  // If no winner is found, return null
  return null;
};

const TicTacToe = () => {
  const [tiles, setTiles] = useState(new Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const handleResetGame = () => {
    setTiles(new Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const handleClick = (i: number) => {
    if (tiles[i] || winner) {
      return;
    }
    const updatedTiles = tiles.slice();
    const currentPlayer = !isXNext ? PLAYERS.O : PLAYERS.X;
    updatedTiles[i] = currentPlayer;
    const gameWinner = calculateWinner(updatedTiles);
    setTiles(updatedTiles);
    setWinner(gameWinner);
    if (!gameWinner) {
      setIsXNext(!isXNext);
    }
  };

  const isBoardFull = tiles.every((t) => t !== null);
  const isDraw = isBoardFull && !winner;
  let status = `Next Turn: ${isXNext ? "X" : "O"}`;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "Game is a Draw!";
  }

  return (
    <div className="tictactoe-component">
      <div className="tictactoe-header">
        <p>{status}</p>
        <button onClick={handleResetGame}>Reset Game</button>
      </div>
      <div className="tictactoe-container">
        {tiles.map((t, index) => {
          return (
            <button
              key={index}
              className="tictactoe-block"
              onClick={() => handleClick(index)}
            >
              {tiles[index]}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TicTacToe;
