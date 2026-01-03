// src/components/MoodRow.jsx
import "../styles/MoodRow.css";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useState } from "react";
import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal";

export default function MoodRow({ title, subtitle, mood, movies }) {
  const rowId = title.replace(/\s+/g, "-").toLowerCase();
  const [selectedMovie, setSelectedMovie] = useState(null);

  const scroll = (direction) => {
    const container = document.getElementById(rowId);
    if (!container) return;

    container.scrollBy({
      left: direction * 320,
      behavior: "smooth",
    });
  };

  return (
    <section className={`mood-row mood-row--${mood}`}>
      <div className="mood-row__header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <div className="mood-row__wrapper">
        {/* LEFT ARROW */}
        <button
          className="mood-row__arrow mood-row__arrow--left"
          onClick={() => scroll(-1)}
        >
          <LuChevronLeft />
        </button>

        {/* CARD CONTAINER */}
        <div className="mood-row__cards" id={rowId}>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={setSelectedMovie}
            />
          ))}
        </div>

        {/* RIGHT ARROW */}
        <button
          className="mood-row__arrow mood-row__arrow--right"
          onClick={() => scroll(1)}
        >
          <LuChevronRight />
        </button>
      </div>

      {/* MOVIE MODAL */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </section>
  );
}