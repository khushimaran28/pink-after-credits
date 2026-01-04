import { useNavigate } from "react-router-dom";

export default function EmptyState({ text, subText, actionText, actionLink }) {
  const navigate = useNavigate();

  return (
    <div className="empty-state">
      <p>{text}</p>
      {subText && <span>{subText}</span>}
      {actionText && (
        <button onClick={() => actionLink && navigate(actionLink)}>
          {actionText}
        </button>
      )}
    </div>
  );
}