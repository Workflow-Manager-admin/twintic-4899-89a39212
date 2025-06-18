import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * TwinTic - Main Container for a Two Player Tic Tac Toe Game
 *
 * Features:
 * - 3x3 Game Board
 * - Player Interaction (make moves by clicking)
 * - Game Status display (current player or winner)
 * - Uses provided color scheme and light theme
 */
function TwinTic() {
  // State for game: history (array of board snapshots), current move index
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [step, setStep] = useState(0);

  const currentBoard = history[step];
  const xIsNext = step % 2 === 0;
  const winner = calculateWinner(currentBoard);
  const isDraw = !winner && currentBoard.every(cell => cell);

  // PUBLIC_INTERFACE
  function handleCellClick(idx) {
    // If cell already filled or game over, ignore
    if (currentBoard[idx] || winner) return;

    const nextBoard = currentBoard.slice();
    nextBoard[idx] = xIsNext ? "X" : "O";

    const newHistory = history.slice(0, step + 1).concat([nextBoard]);
    setHistory(newHistory);
    setStep(newHistory.length - 1);
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    setHistory([Array(9).fill(null)]);
    setStep(0);
  }

  // --- Rendering helpers ---

  // PUBLIC_INTERFACE
  function renderCell(idx) {
    return (
      <button
        className="ttt-cell"
        style={{
          color: currentBoard[idx] === "X" ? "var(--ttt-primary)" : currentBoard[idx] === "O" ? "var(--ttt-accent)" : "var(--ttt-board-fg)",
        }}
        onClick={() => handleCellClick(idx)}
        aria-label={`board-cell-${idx} ${currentBoard[idx] ? currentBoard[idx] : "empty"}`}
        disabled={!!winner || !!currentBoard[idx]}
        key={idx}
        data-testid={`cell-${idx}`}
      >
        {currentBoard[idx]}
      </button>
    );
  }

  // PUBLIC_INTERFACE
  function renderStatus() {
    if (winner)
      return (
        <div className="ttt-status" style={{ color: "var(--ttt-primary)" }}>
          Winner: <b>{winner}</b>
        </div>
      );
    if (isDraw)
      return (
        <div className="ttt-status" style={{ color: "var(--ttt-secondary)" }}>
          <b>Draw!</b>
        </div>
      );
    return (
      <div className="ttt-status">
        {`Turn: `}
        <span style={{ color: xIsNext ? "var(--ttt-primary)" : "var(--ttt-accent)", fontWeight: 600 }}>
          {xIsNext ? "X" : "O"}
        </span>
      </div>
    );
  }

  return (
    <div className="ttt-ctn">
      <h2 className="ttt-title">TwinTic</h2>
      {renderStatus()}
      <div className="ttt-board">
        {[0, 1, 2].map((r) => (
          <div className="ttt-row" key={r}>
            {[0, 1, 2].map((c) => renderCell(r * 3 + c))}
          </div>
        ))}
      </div>
      <button className="ttt-restart-btn" onClick={handleRestart}>
        Restart
      </button>
    </div>
  );
}

// Helper: Returns 'X', 'O', or null
function calculateWinner(squares) {
  // PUBLIC_INTERFACE
  /**
   * Returns 'X', 'O', or null if no winner.
   */
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6], // diagonals
  ];
  for (let i = 0; i < lines.length; ++i) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) return squares[a];
  }
  return null;
}

export default TwinTic;
