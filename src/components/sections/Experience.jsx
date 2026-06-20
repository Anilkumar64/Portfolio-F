import React from "react";
import { EXPERIENCE } from "../../constants/portfolioData";
import "./Experience.css";

export default function Experience() {
  return (
    <section id="experience" className="sec experience-sec">
      <div className="wrap">
        <p className="sec-label reveal">Experience</p>
        <h2 className="sec-title reveal">Systems Work With Measurable Outcomes</h2>
        <p className="sec-desc reveal">
          Internship, academic, and project experience presented by the same standard:
          problem, implementation, outcome, and stack.
        </p>

        <div className="experience-list reveal">
          {EXPERIENCE.map((role) => (
            <article key={`${role.company}-${role.title}`} className="experience-item">
              <div className="experience-main">
                <p className="experience-company">{role.company}</p>
                <h3>{role.title}</h3>
                <p className="experience-dates">{role.dates}</p>
              </div>

              <div className="experience-details">
                <ul>
                  {role.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <div className="experience-stack">
                  {role.stack.map((item) => (
                    <span key={item} className="chip">{item}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
