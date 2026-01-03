import Navbar from "../components/Navbar";
import { useEffect } from "react";
import "../styles/AfterTheCredits.css";
import PageTransition from "../components/PageTransition";

export default function AfterTheCredits() {
  useEffect(() => {
    const cards = document.querySelectorAll(".after-credits__card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <PageTransition>
    <>
      {/* NAVBAR */}
      <Navbar active="after-credits" />

      {/* PAGE CONTENT */}
      <section className="after-credits">
        {/* Background */}
        <div
          className="after-credits__background"
          style={{ backgroundImage: "url(/AfterTheCredits.png)" }}
        />

        <div className="after-credits__wrapper">
          {/* PAGE TITLE */}
          <h1 className="after-credits__page-title">After the Credits</h1>

          {/* ANIMATED SUBTITLE */}
          <div className="after-credits__subtitle">
            <span>pink aesthetics</span>
            <span>dark plots</span>
            <span>complicated women</span>
          </div>

          {/* QUOTE */}
          <div className="after-credits__quote">
            What, like it’s hard? 💄💋
          </div>

          {/* CONTENT */}
          <div className="after-credits__content">
            <article className="after-credits__card">
              <span className="card-divider" />
              <h3>Main Character Energy</h3>
              <p>
                I love movies that are pink, dramatic, iconic, and a little unhinged.
                The kind where the outfits matter, the girls are unforgettable,
                and the confidence is louder than the plot.
              </p>
              <p>
                If it’s a 2000s classic, an it-girl movie, or something that feels
                like hot pink lip gloss and main-character energy, I’m already seated.
              </p>
            </article>

            <article className="after-credits__card">
              <span className="card-divider" />
              <h3>Pink Is the Point</h3>
              <p>
                I grew up on movies where femininity wasn’t a flaw — it was the point.
                Where being girly didn’t mean being weak.
                Where pink was power, not a joke.
              </p>
              <ul>
                <li>iconic women</li>
                <li>dramatic friendships</li>
                <li>fashion moments</li>
                <li>confidence arcs</li>
              </ul>
              <p>I mean… Elle Woods didn’t fight for this erasure.</p>
            </article>

            <article className="after-credits__card">
              <span className="card-divider" />
              <h3>Dumb Blonde</h3>
              <p>
                I love “dumb blonde” energy, not because it’s dumb,
                but because it’s underestimated.
              </p>
              <p>
                We don’t play stupid.
                We let people assume, and then outgrow them.
              </p>
              <p>
                If you worship Elle Woods, admire Regina George’s presence,
                or secretly root for the girl everyone misunderstands — welcome.
                You get it.
              </p>
            </article>

            <article className="after-credits__card">
              <span className="card-divider" />
              <h3>Sweet but SUS</h3>
              <p>
                I love hot pink and drama, but I also love crime, suspense,
                and stories driven by morally grey choices.
              </p>
              <p>
                Pink, but not naïve.<br />
                Dramatic, but observant.<br />
                Girly, not oblivious.
              </p>
            </article>

            <article className="after-credits__card">
              <span className="card-divider" />
              <h3>Taste Is the Vibe</h3>
              <p>
                This space is made with love for the girls, the gays,
                and anyone who understands that cinema can be camp,
                emotional, dramatic, and deeply personal.
              </p>
              <p>
                It’s not about superiority.
                It’s about taste, self-expression,
                and feeling safe to love what you love, loudly.
              </p>
            </article>

            {/* AUTHOR CARD */}
            <article className="after-credits__card after-credits__card--author">
              <div className="after-credits__author-text">
                <span className="card-divider" />
                <h3>XOXO, Obviously</h3>
                <p>This is not a review site. It’s a personality trait.</p>
                <p>Stay if this feels like your kind of chaos. Leave if it doesn’t.</p>
                <p>
                  XOXO,<br />
                  <strong>Pink After Credits 💋</strong>
                </p>
              </div>

              <div className="after-credits__author-image">
                <img src="/author.jpeg" alt="Pink After Credits author" />
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
    </PageTransition>
  );
}