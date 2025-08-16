import { SudokuBoard } from "../SudokuBoard/SudokuBoard"

interface RenderBoardProps {
    loading: boolean;
    puzzle: number[][] | null;
}

export const RenderBoard = ({loading, puzzle}: RenderBoardProps) => {
    if (loading) {
        return <div className="text-third-green text-[.8lh] mt-4">Generating puzzle...</div>
    }

    if (puzzle) {
        return <SudokuBoard initialBoard={puzzle} />
    }

    return <div>No puzzle found</div>;
}
