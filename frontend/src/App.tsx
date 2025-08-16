import { Controls, RenderBoard } from './components';
import { useGenerateSudoku } from './hooks/useGenerateSudoku/useGenerateSudoku';
import './App.css';

const App = () => {
  const { puzzle, loading, handleNewPuzzle } = useGenerateSudoku();

  return (
    <>
      <h1 className='text-center text-[2.4lh] font-extrabold mt-12'>Sudoku Online</h1>

      <article className='flex flex-col items-center my-10'>

        <Controls passHandleNewPuzzle={handleNewPuzzle} />
      
        <RenderBoard loading={loading} puzzle={puzzle} />

      </article>
    </>
  );
};

export default App;