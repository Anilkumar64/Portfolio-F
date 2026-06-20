import React from "react";
import { PHILOSOPHY } from "../../constants/portfolioData";
import "./Philosophy.css";

export default function Philosophy() {
  return (
    <section id="philosophy" className="sec">
      <div className="wrap">
        <p className="sec-label reveal">philosophy.md</p>
        <h2 className="sec-title reveal">Engineering Philosophy</h2>

        <blockquote className="philosophy-quote reveal">
          "{PHILOSOPHY.quote}"
        </blockquote>

        <div className="philosophy-body reveal">
          {PHILOSOPHY.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <pre className="philosophy-ascii reveal" aria-hidden="true">{`/*
 *  "Software gets fast when you understand
 *   what's slow."  — every systems programmer
 */`}</pre>
      </div>
    </section>
  );
}
