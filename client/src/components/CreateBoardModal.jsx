import { useState } from "react";
import toast from "react-hot-toast";
import "../styles/CreateBoardModal.css";

export default function CreateBoardModal({ onClose, onCreate, onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    if (!title.trim()) return;

    const newBoard = {
      id: Date.now(),
      title,
      description,
      movies: [],
    };

    onCreate(newBoard);

    if (onCreated) {
      onCreated(newBoard);
    }

    toast.success("Board created ✨");

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>×</button>

        <h2 className="modal__title">Create a board</h2>

        <input
          type="text"
          placeholder="Name your board"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="What’s this board about? (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="modal__actions">
          <button className="btn-primary" onClick={handleCreate}>
            Create Board
          </button>
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}