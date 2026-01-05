import "../styles/SaveToBoardModal.css";

export default function SaveToBoardModal({
  boards,
  onSave,
  onClose,
  onCreateNew,
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal--small" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>×</button>

        <h3 className="modal__title">Save to board</h3>

        <div className="boards-list">
          {boards.map((board) => (
            <button
              key={board._id}
              className="board-option"
              onClick={() => onSave(board)}
            >
              {board.title}
            </button>
          ))}

          <button
            className="board-option board-option--new"
            onClick={onCreateNew}
          >
            + Create new board
          </button>
        </div>
      </div>
    </div>
  );
}