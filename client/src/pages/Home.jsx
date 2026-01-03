// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import MoodRow from "../components/MoodRow";
import "../styles/Home.css";
import { useEffect, useState } from "react";
import PageTransition from "../components/PageTransition";
import { dummyMovies } from "../data/dummyMovies";

export default function Home() {
  const fullText = "What are you in the mood to feel today?";
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState("typing");
  const navigate = useNavigate();

  useEffect(() => {
    let timeout;

    if (mode === "typing") {
      if (index < fullText.length) {
        timeout = setTimeout(() => {
          setDisplayText(fullText.slice(0, index + 1));
          setIndex(index + 1);
        }, 90);
      } else {
        timeout = setTimeout(() => setMode("pause"), 900);
      }
    }

    if (mode === "pause") {
      timeout = setTimeout(() => setMode("deleting"), 700);
    }

    if (mode === "deleting") {
      if (index > 0) {
        timeout = setTimeout(() => {
          setDisplayText(fullText.slice(0, index - 1));
          setIndex(index - 1);
        }, 60);
      } else {
        setMode("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [index, mode]);

  return (
    <PageTransition>
    <>
      <Navbar active="home" />

      <main className="home">
        {/* QUESTION */}
        <section className="home__intro">
          <h1 className="home__question">
            <span className="typing-text">{displayText}</span>
          </h1>
        </section>

        {/* MOOD ROWS */}
        <div className="home__container">
          <MoodRow
            title="Khushi's Current Obsessions"
            subtitle="soft chaos, zero apologies"
            mood="pink"
            movies={dummyMovies.pink}
          />

          <MoodRow
            title="It-Girl Essentials"
            subtitle="confidence you can borrow"
            mood="pink"
            movies={dummyMovies.pink}
          />

          <MoodRow
            title="Instant Mood Uplifters"
            subtitle="comfort, but make it chic"
            mood="pink"
            movies={dummyMovies.pink}
          />

          <MoodRow
            title="Ugly Cry Day?"
            subtitle="emotional damage, lovingly"
            mood="drama"
            movies={dummyMovies.pink}
          />

          <MoodRow
            title="Rainy Day Feels"
            subtitle="quiet, reflective, cinematic"
            mood="drama"
            movies={dummyMovies.pink}
          />

          <MoodRow
            title="Girls With Issues"
            subtitle="sweet, but SUS"
            mood="dark"
            movies={dummyMovies.pink}
          />
        </div>

        {/* CTA */}
        <section className="home__cta">
          <p>Found something you love?</p>
          <button>Build your own mood board</button>
        </section>

        {/* LOGIN PROMPT */}
        <section style={{ textAlign: "center", marginTop: "80px" }}>
          <button
            onClick={() => navigate("/login")}
            style={{
              background: "none",
              border: "none",
              color: "#d74774",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Log in to save your taste →
          </button>
        </section>

      </main>
    </>
    </PageTransition>
  );
}
