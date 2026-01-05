import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../utils/api";

const BoardsContext = createContext();

export function BoardsProvider({ children }) {
  const [boards, setBoards] = useState([]);
  const { user } = useAuth();

  // 📦 FETCH BOARDS
  useEffect(() => {
    if (!user) {
      setBoards([]);
      return;
    }

    const fetchBoards = async () => {
      try {
        const data = await apiRequest("/boards");
        setBoards(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchBoards();
  }, [user]);

  // 🎀 CREATE BOARD
  const createBoard = async ({ title, description }) => {
    const newBoard = await apiRequest(
      "/boards",
      "POST",
      { title, description }
    );

    setBoards((prev) => [newBoard, ...prev]);
    return newBoard;
  };

  // ✏️ RENAME BOARD
  const renameBoard = async (boardId, newTitle) => {
    const updatedBoard = await apiRequest(
      `/boards/${boardId}`,
      "PUT",
      { title: newTitle }
    );

    setBoards((prev) =>
      prev.map((b) => (b._id === updatedBoard._id ? updatedBoard : b))
    );
  };

  // 🗑️ DELETE BOARD
  const deleteBoard = async (boardId) => {
    await apiRequest(`/boards/${boardId}`, "DELETE");

    setBoards((prev) => prev.filter((b) => b._id !== boardId));
  };

  // 🎬 ADD MOVIE TO BOARD
  const addMovieToBoard = async (boardId, movieId) => {
    const updatedBoard = await apiRequest(
      `/boards/${boardId}/movies`,
      "POST",
      { movieId }
    );

    setBoards((prev) =>
      prev.map((b) => (b._id === updatedBoard._id ? updatedBoard : b))
    );

    return updatedBoard;
  };

  // 🗑️ REMOVE MOVIE FROM BOARD
  const removeMovieFromBoard = async (boardId, movieId) => {
    const updatedBoard = await apiRequest(
      `/boards/${boardId}/movies/${movieId}`,
      "DELETE"
    );

    setBoards((prev) =>
      prev.map((b) => (b._id === updatedBoard._id ? updatedBoard : b))
    );
  };

  return (
    <BoardsContext.Provider
      value={{
        boards,
        createBoard,
        renameBoard,
        deleteBoard,
        addMovieToBoard,
        removeMovieFromBoard,
      }}
    >
      {children}
    </BoardsContext.Provider>
  );
}

export const useBoards = () => useContext(BoardsContext);