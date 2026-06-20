import React from "react";
import { SYSTEMS_INTERESTS, SKILL_TABLE } from "../../constants/portfolioData";
import "./SystemsInterests.css";

export default function SystemsInterests() {
  return (
    <section id="skills" className="sec">
      <div className="wrap">
        <p className="sec-label reveal">skills.json</p>
        <h2 className="sec-title reveal">Systems Programming Interests</h2>
        <p className="sec-desc reveal">
          What I actually care about — not buzzwords, but the layers I spend time in.
        </p>

        <div className="interests-grid reveal">
          {SYSTEMS_INTERESTS.map((card) => (
            <div key={card.id} className="interest-card">
              <div className="interest-head">
                <span className="interest-icon">{card.icon}</span>
                <h3 className="interest-title">{card.title}</h3>
              </div>
              <p className="interest-desc">{card.desc}</p>
              <ul className="interest-topics">
                {card.topics.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="skill-table-wrap reveal">
          <p className="skill-table-label">$ cat /etc/skills</p>
          <table className="skill-table">
            <tbody>
              {Object.entries(SKILL_TABLE).map(([cat, items]) => (
                <tr key={cat}>
                  <th>{cat}</th>
                  <td>
                    <div className="skill-table-chips">
                      {items.map((item) => (
                        <span key={item} className="chip">{item}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
