import { useEffect, useState } from 'react';
import './SudokuBoard.css';

type initialBoardType = number[][];

type SudokuBoardProps = {
  initialBoard: initialBoardType;
};

export const SudokuBoard = ({ initialBoard }: SudokuBoardProps) => {
  const [board, setBoard] = useState<initialBoardType>(initialBoard);
  const [isSolving, setIsSolving] = useState(false);

  const handleSolve = async () => {
    setIsSolving(true);
    try {
      const response = await fetch('http://localhost:5000/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ board }),
      });

      const data = await response.json();
      if (data.solution) {
        setBoard(data.solution);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setIsSolving(false);
  };

  const handleCellChange = (row: number, col: number, value: string) => {
    const newValue = value === '' ? 0 : Math.min(9, Math.max(1, parseInt(value) || 0));
    const newBoard = [...board];
    newBoard[row][col] = newValue;
    setBoard(newBoard);
  };

  useEffect(() => {
    setBoard(initialBoard);
  }, [initialBoard]);

  return (
    <div className="sudoku-container">
      <div className="sudoku-grid">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="sudoku-row">
            {row.map((cell, colIndex) => (
              <input
                key={colIndex}
                type="number"
                min="1"
                max="9"
                value={cell || ''}
                onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                className={`sudoku-cell ${(Math.floor(rowIndex / 3) + Math.floor(colIndex / 3)) % 2 === 0
                    ? 'subgrid-even'
                    : 'subgrid-odd'
                  }`}
              />
            ))}
          </div>
        ))}
      </div>
      
      <button
        onClick={handleSolve}
        disabled={isSolving}
        className="solve-button new-game-btn standard-button"
      >
        {isSolving ? 'Solving...' : 'SOLVE SUDOKU'}
      </button>
    </div>
  );
};
