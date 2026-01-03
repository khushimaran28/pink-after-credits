import "../styles/MovieCard.css";

export default function MovieCard({ movie, onClick }) {
  return (
    <div className="movie-card" onClick={() => onClick(movie)}>
      <div
        className="movie-card__image"
        style={{ backgroundImage: `url(${movie.poster})` }}
      />
      <span className="movie-card__title">{movie.title}</span>
    </div>
  );
}