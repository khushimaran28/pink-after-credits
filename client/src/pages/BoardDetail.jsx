import { useParams, useNavigate } from "react-router-dom";
import { useBoards } from "../context/BoardsContext";
import { dummyMovies } from "../data/dummyMovies";
import Navbar from "../components/Navbar";
import PageTransition from "../components/PageTransition";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import EmptyState from "../components/EmptyState";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import "../styles/BoardDetail.css";

export default function BoardDetail() {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const { boards, removeMovieFromBoard, renameBoard, deleteBoard } = useBoards();

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");

  // ✅ FIND BOARD FIRST
  const board = boards.find((b) => String(b._id) === boardId);

  // ✅ SYNC TITLE WHEN BOARD LOADS / CHANGES
  useEffect(() => {
    if (board) {
      setTitle(board.title);
    }
  }, [board]);

  const allMovies = Object.values(dummyMovies).flat();

  const moviesInBoard = board
    ? board.movies
        .map((id) => allMovies.find((m) => m.id === id))
        .filter(Boolean)
    : [];

  // 🚫 BOARD NOT FOUND
  if (!board) {
    return (
      <PageTransition>
        <>
          <Navbar />
          <EmptyState
            text="Board not found"
            subText="This board doesn’t exist or was removed."
            actionText="Go back"
            onAction={() => navigate("/dashboard")}
          />
        </>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <>
        <Navbar />

        <main className="board-detail">
          {/* HEADER */}
          <header className="board-detail__header">
            <button
              className="board-detail__back"
              onClick={() => navigate("/dashboard")}
            >
              ← Back
            </button>

            {isEditing ? (
              <input
                className="board-title-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => {
                  renameBoard(board._id, title);
                  setIsEditing(false);
                  toast("Board renamed ✨");
                }}
                autoFocus
              />
            ) : (
              <h1 onClick={() => setIsEditing(true)}>{board.title}</h1>
            )}

            {board.description && <p>{board.description}</p>}

            <button
              className="delete-board-btn"
              onClick={() => {
                const confirmDelete = window.confirm(
                  "Delete this board? This can’t be undone 💔"
                );
                if (!confirmDelete) return;

                deleteBoard(board._id);
                toast("Board deleted 🗑️");
                navigate("/dashboard");
              }}
            >
              Delete board
            </button>
          </header>

          {/* MOVIES */}
          {moviesInBoard.length === 0 ? (
            <EmptyState
              text="No movies yet"
              subText="Add one when it hits just right."
              actionText="Explore moods"
              onAction={() => navigate("/")}
            />
          ) : (
            <div className="board-detail__grid">
              {moviesInBoard.map((movie) => (
                <div key={movie.id} className="board-movie">
                  <MovieCard movie={movie} onClick={setSelectedMovie} />

                  <button
                    className="remove-movie-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeMovieFromBoard(board._id, movie.id);
                      toast("Removed from board 🗑️");
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>

        {selectedMovie && (
          <MovieModal
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
      </>
    </PageTransition>
  );
}