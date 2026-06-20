import React from "react";
import { ABOUT } from "../../constants/portfolioData";
import "./About.css";

export default function About() {
  return (
    <section id="about" className="sec about-sec">
      <div className="wrap">
        <p className="sec-label reveal">About</p>
        <h2 className="sec-title reveal">Background Behind The Systems Work</h2>

        <div className="about-story reveal">
          {ABOUT.background.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
