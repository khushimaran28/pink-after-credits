import { useState } from "react";
import SaveToBoardModal from "./SaveToBoardModal";
import { useBoards } from "../context/BoardsContext";
import CreateBoardModal from "./CreateBoardModal";
import toast from "react-hot-toast";
import "../styles/MovieModal.css";

export default function MovieModal({ movie, onClose }) {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const { boards, addMovieToBoard, createBoard } = useBoards();
  const [showCreateBoard, setShowCreateBoard] = useState(false);

  if (!movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button className="modal__close" onClick={onClose}>
          ×
        </button>

        {/* HEADER */}
        <div className="modal__header">
          <h2 className="modal__title">
            {movie.title}
            {movie.year && (
              <span className="modal__year"> ({movie.year})</span>
            )}
          </h2>
        </div>

        {/* BODY */}
        <div className="modal__body">
          {/* POSTER */}
          <div className="modal__poster">
            <img src={movie.poster} alt={movie.title} />
          </div>

          {/* CONTENT */}
          <div className="modal__content">
            <p className="modal__one-liner">
              {movie.oneLiner}
            </p>

            <p className="modal__review">
              {movie.review}
            </p>

            {/* BUTTONS */}
            <button
              className="save-to-board-btn"
              onClick={() => setShowSaveModal(true)}
            >
              Save to board 💖
            </button>

            {/* WHERE TO WATCH */}
            {movie.watchOn && (
              <div className="modal__watch">
                <span>Where to watch</span>
                <div className="modal__platforms">
                  {movie.watchOn.map((platform) => (
                    <a
                      key={platform.name}
                      href={platform.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={platform.icon}
                        alt={platform.name}
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {showSaveModal && (
        <SaveToBoardModal
          boards={boards}
          movie={movie}
          onSave={(boardId) => {
            const board = boards.find((b) => b.id === boardId);

            addMovieToBoard(boardId, movie.id);
            setShowSaveModal(false);

            toast(`Saved to ${board.title} 💖`);
          }}
          onClose={() => setShowSaveModal(false)}
          onCreateNew={() => {
            setShowSaveModal(false);
            setShowCreateBoard(true);
            alert("Create board from dashboard ✨");
          }}
        />
      )}

      {showCreateBoard && (
        <CreateBoardModal
          onClose={() => setShowCreateBoard(false)}
          onCreate={createBoard}
          onCreated={(newBoard) => {
            addMovieToBoard(newBoard.id, movie.id);
            toast.success(`Saved to ${newBoard.title} 💖`);
          }}
        />
      )}

    </div>
  );
}