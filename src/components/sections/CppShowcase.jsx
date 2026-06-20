import React from "react";
import { CPP_SHOWCASE } from "../../constants/portfolioData";
import "./CppShowcase.css";

function LangBar({ name, pct }) {
  const blocks = Math.round(pct / 5);
  const filled = "█".repeat(blocks);
  const empty = "░".repeat(20 - blocks);
  return (
    <div className="lang-row">
      <span className="lang-name">{name.padEnd(12)}</span>
      <span className="lang-bar">{filled}{empty}</span>
      <span className="lang-pct">{pct}%</span>
    </div>
  );
}

export default function CppShowcase() {
  return (
    <section id="cpp" className="sec">
      <div className="wrap">
        <p className="sec-label reveal">cpp_showcase.cpp</p>
        <h2 className="sec-title reveal">Why I Love C++</h2>
        <p className="sec-desc reveal">
          Performance, control, and zero-cost abstractions — the language I use for systems work.
        </p>

        <div className="cpp-grid reveal">
          <div className="cpp-highlights">
            {CPP_SHOWCASE.highlights.map((h) => (
              <div key={h.title} className="cpp-card">
                <h3>{h.title}</h3>
                <p>{h.desc}</p>
              </div>
            ))}
          </div>

          <div className="cpp-bars-panel">
            <p className="cpp-bars-title">Language Proficiency</p>
            <div className="cpp-bars">
              {CPP_SHOWCASE.languages.map((l) => (
                <LangBar key={l.name} name={l.name} pct={l.pct} />
              ))}
            </div>
            <pre className="cpp-snippet">{`// compile with:
g++ -std=c++20 -O2 -Wall -Wextra \\
    -fsanitize=address,thread \\
    main.cpp -o app`}</pre>
          </div>
        </div>
      </div>
    </section>
  );
}
