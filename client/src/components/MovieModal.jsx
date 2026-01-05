import { useState } from "react";
import SaveToBoardModal from "./SaveToBoardModal";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useBoards } from "../context/BoardsContext";
import CreateBoardModal from "./CreateBoardModal";
import toast from "react-hot-toast";
import "../styles/MovieModal.css";

export default function MovieModal({ movie, onClose }) {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCreateBoard, setShowCreateBoard] = useState(false);

  const { boards, addMovieToBoard, createBoard } = useBoards();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* CLOSE */}
        <button className="modal__close" onClick={onClose}>
          ×
        </button>

        {/* HEADER */}
        <div className="modal__header">
          <h2 className="modal__title">
            {movie.title}
            {movie.year && <span className="modal__year"> ({movie.year})</span>}
          </h2>
        </div>

        {/* BODY */}
        <div className="modal__body">
          <div className="modal__poster">
            <img src={movie.poster} alt={movie.title} />
          </div>

          <div className="modal__content">
            <p className="modal__one-liner">{movie.oneLiner}</p>
            <p className="modal__review">{movie.review}</p>

            {/* SAVE BUTTON */}
            <button
              className="save-to-board-btn"
              onClick={() => {
                if (!user) {
                  toast("Log in to save your taste 💖");
                  navigate("/login");
                  return;
                }
                setShowSaveModal(true);
              }}
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
                      <img src={platform.icon} alt={platform.name} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SAVE TO BOARD MODAL */}
      {showSaveModal && (
        <SaveToBoardModal
          boards={boards}
          movie={movie}
          onSave={async (board) => {
            const boardTitle = board.title;

            try {
              await addMovieToBoard(board._id, movie.id);
              toast(`Saved to ${boardTitle} 💖`);
            } catch (error) {
              if (error.message?.toLowerCase().includes("already")) {
                toast("Already in this board 💅");
              } else {
                toast("Couldn’t save movie 💔");
              }
            }

            setShowSaveModal(false);
          }}
          onClose={() => setShowSaveModal(false)}
          onCreateNew={() => {
            setShowSaveModal(false);
            setShowCreateBoard(true);
          }}
        />
      )}

      {/* CREATE BOARD MODAL */}
      {showCreateBoard && (
        <CreateBoardModal
          onClose={() => setShowCreateBoard(false)}
          onCreate={createBoard}
          onCreated={async (newBoard) => {
            try {
              await addMovieToBoard(newBoard._id, movie.id);
              toast(`Saved to ${newBoard.title} 💖`);
            } catch {
              toast("Couldn’t save movie 💔");
            }
          }}
        />
      )}
    </div>
  );
}