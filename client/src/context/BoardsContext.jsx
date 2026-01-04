import { createContext, useContext, useState, useEffect } from "react";

const BoardsContext = createContext();

export function BoardsProvider({ children }) {
  const [boards, setBoards] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const storedBoards = localStorage.getItem("boards");

    if (storedBoards) {
      try {
        setBoards(JSON.parse(storedBoards));
      } catch {
        setBoards([]);
      }
    }

    setHydrated(true);
  }, []);

  // Persist on change
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("boards", JSON.stringify(boards));
  }, [boards, hydrated]);

  const createBoard = (board) => {
    setBoards((prev) => [...prev, board]);
  };

  const addMovieToBoard = (boardId, movieId) => {
    setBoards((prev) =>
      prev.map((board) =>
        board.id === boardId && !board.movies.includes(movieId)
          ? { ...board, movies: [...board.movies, movieId] }
          : board
      )
    );
  };

  return (
    <BoardsContext.Provider
      value={{ boards, createBoard, addMovieToBoard }}
    >
      {children}
    </BoardsContext.Provider>
  );
}

export const useBoards = () => useContext(BoardsContext);