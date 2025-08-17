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
      <article className="my-1.5 flex flex-col gap-1 items-center justify-center max-w-[502px] w-full not-smm-550:max-w-small-width not-smm-550:not-smm-372:max-w-extra-small-width">
        <label className="self-start font-bold ml-4 text-third-green not-smm-372:text-[.6lh]">Difficulty</label>
        <div className="select">
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
          >
            <option value={30}>Easy</option>
            <option value={40}>Medium</option>
            <option value={50}>Hard</option>
          </select>

          <div className="select_arrow">
          </div>
        </div>

        <button onClick={handleNewPuzzle} className="standard-button">
          NEW PUZZLE
        </button>
      </article>
    )
}
