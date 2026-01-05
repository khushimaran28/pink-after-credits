import Navbar from "../components/Navbar";
import PageTransition from "../components/PageTransition";
import { useBoards } from "../context/BoardsContext";
import { useAuth } from "../context/AuthContext";
import "../styles/Profile.css";

export default function Profile() {
  const { boards } = useBoards();
  const { user } = useAuth();

  const totalMovies = boards.reduce(
    (count, board) => count + board.movies.length,
    0
  );

  return (
    <PageTransition>
      <>
        <Navbar />

        <main className="profile">
          {/* HEADER */}
          <section className="profile__header">
            <h1>Hello, {user?.name || "icon"} 💋</h1>
            <p>
              This is my little corner of the internet where movies are moods,
              pink is power, and taste is personal.
            </p>
          </section>

          {/* STATS */}
          <section className="profile__stats">
            <div>
              <span>{boards.length}</span>
              <p>Mood Boards</p>
            </div>

            <div>
              <span>{totalMovies}</span>
              <p>Saved Movies</p>
            </div>
          </section>

          {/* TASTE BIO */}
          <section className="profile__bio">
            <h2>My Taste</h2>
            <p>
              I love movies that are pink, dramatic, emotional, and a little
              unhinged. I’m here for confidence arcs, morally grey women, and
              stories that feel personal instead of perfect.
            </p>
          </section>

          {/* CURRENT OBSESSION */}
          <section className="profile__obsession">
            <h2>Currently Obsessed With</h2>
            <p>Hot pink chaos, comfort rewatches, and women with issues.</p>
          </section>
        </main>
      </>
    </PageTransition>
  );
}