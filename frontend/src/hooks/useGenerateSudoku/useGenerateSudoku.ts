import { useEffect, useState } from "react";

type initialBoardType = number[][] | null;

export const useGenerateSudoku = () => {
    const [puzzle, setPuzzle] = useState<initialBoardType>(null);
    const [loading, setLoading] = useState(true);
    const [difficulty, setDifficulty] = useState<number>(40);
  
    const fetchNewPuzzle = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/generate?difficulty=${difficulty}`
        );
        const data = await response.json();
        if (data.puzzle) {
          setPuzzle(data.puzzle);
        }
      } catch (error) {
        console.error('Error fetching puzzle:', error);
      }
      setLoading(false);
    };
    
    const handleNewPuzzle = (difficulty: number = 40) => {
      setDifficulty(difficulty);
      fetchNewPuzzle();
    }
    
    useEffect(() => {
      fetchNewPuzzle();
    }, []);

    return { puzzle, loading, handleNewPuzzle};    
}
