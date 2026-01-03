import "../styles/MovieModal.css";

export default function MovieModal({ movie, onClose }) {
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
    </div>
  );
}
