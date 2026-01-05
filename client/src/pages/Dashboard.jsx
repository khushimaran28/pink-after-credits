import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageTransition from "../components/PageTransition";
import CreateBoardModal from "../components/CreateBoardModal";
import { useBoards } from "../context/BoardsContext";
import { dummyMovies } from "../data/dummyMovies";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const { boards, createBoard } = useBoards();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();
  
  const allMovies = Object.values(dummyMovies).flat();

  const getMovieById = (id) =>
    allMovies.find((movie) => movie.id === id);

  return (
    <PageTransition>
      <>
        <Navbar />

        <main className="dashboard">
          {/* WELCOME */}
          <section className="dashboard__header">
            <h1>Welcome back 💋</h1>
            <p>Ready to pick a mood?</p>
          </section>

          {/* SAVED MOVIES */}
          <section className="dashboard__section">
            <h2>Your Mood Boards 🎀</h2>

            {boards.length === 0 ? (
              <div className="empty-state">
                <p>No mood boards yet.</p>
                <span>Create one when a movie hits just right.</span>
                <button onClick={() => setShowCreateModal(true)}>
                  Create your first board
                </button>
              </div>
            ) : (
              <div className="boards-grid">
                {boards.map((board) => (
                  <div
                    key={board._id}
                    className="board-card"
                    onClick={() => navigate(`/boards/${board._id}`)}
                  >
                    <h3>{board.title}</h3>

                    {board.movies.length === 0 ? (
                      <p className="board-empty">No movies yet</p>
                    ) : (
                      <div className="board-previews">
                        {board.movies.slice(0, 3).map((movieId) => {
                          const movie = getMovieById(movieId);
                          return (
                            movie && (
                              <img
                                key={movieId}
                                src={movie.poster}
                                alt={movie.title}
                              />
                            )
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* CTA */}
          <section className="dashboard__cta">
            <button onClick={() => window.location.href = "/"}>
              Explore moods
            </button>
          </section>

          {showCreateModal && (
            <CreateBoardModal
              onClose={() => setShowCreateModal(false)}
              onCreate={createBoard}
            />
          )}
        </main>
      </>
    </PageTransition>
  );
}