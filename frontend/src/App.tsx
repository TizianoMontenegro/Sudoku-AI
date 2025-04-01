import { Controls, RenderBoard } from './components';
import { useGenerateSudoku } from './hooks/useGenerateSudoku/useGenerateSudoku';
import './App.css';

const App = () => {
  const { puzzle, loading, handleNewPuzzle } = useGenerateSudoku();

  return (
    <>
      <h1>Sudoku Game</h1>

      <Controls passHandleNewPuzzle={handleNewPuzzle} />

      <RenderBoard loading={loading} puzzle={puzzle} />
    </>
  );
};

export default App;