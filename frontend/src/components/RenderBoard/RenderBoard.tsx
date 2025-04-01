import { SudokuBoard } from "../SudokuBoard/SudokuBoard"
import './RenderBoard.css';

interface RenderBoardProps {
    loading: boolean;
    puzzle: number[][] | null;
}

export const RenderBoard = ({loading, puzzle}: RenderBoardProps) => {
    if (loading) {
        return <div className="loading">Generating puzzle...</div>
    }

    if (puzzle) {
        return <SudokuBoard initialBoard={puzzle} />
    }

    return <div>No puzzle found</div>;
}
