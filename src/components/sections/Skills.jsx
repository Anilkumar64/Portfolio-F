import React from "react";
import { SKILL_TABLE } from "../../constants/portfolioData";
import "./Skills.css";

export default function Skills() {
  return (
    <section id="skills" className="sec skills-sec">
      <div className="wrap">
        <p className="sec-label reveal">Technical Proficiency</p>
        <h2 className="sec-title reveal">Keywords That Match Systems Job Descriptions</h2>
        <p className="sec-desc reveal">
          A compact scan of the languages, Linux concepts, networking APIs, and
          tooling used across the portfolio projects.
        </p>

        <div className="skills-grid reveal">
          {Object.entries(SKILL_TABLE).map(([group, items]) => (
            <div key={group} className="skills-group">
              <h3>{group}</h3>
              <div className="skills-chip-row">
                {items.map((item) => (
                  <span key={item} className="chip">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
