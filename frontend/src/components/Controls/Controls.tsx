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
      <article className="my-1.5 flex flex-col gap-1 items-center justify-center max-w-[502px] w-full">
        <label className="self-start font-bold ml-4 text-third-green">Difficulty</label>
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

        <button onClick={handleNewPuzzle} className="new-game-btn whitespace-nowrap w-full rounded-none bg-sixth-green py-2 px-4 text-forth-green font-extrabold text-[1lh] hover:text-sixth-green hover:bg-forth-green transition-colors duration-75">
          NEW PUZZLE
        </button>
      </article>
    )
}
