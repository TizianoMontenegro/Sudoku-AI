import { useState } from "react";
import './Controls.css';

interface ControlsProps {
    passHandleNewPuzzle: (difficulty: number) => void;
}

export const Controls = ({ passHandleNewPuzzle }: ControlsProps) => {
    const [difficulty, setDifficulty] = useState<number>(40);
    
    const handleNewPuzzle = () => {
        passHandleNewPuzzle(difficulty);
    }

    return (
        <div className="controls">
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(Number(e.target.value))}
        >
          <option value={30}>Easy</option>
          <option value={40}>Medium</option>
          <option value={50}>Hard</option>
        </select>
        <button onClick={handleNewPuzzle} className="new-game-btn">
          New Puzzle
        </button>
      </div>
    )
}
