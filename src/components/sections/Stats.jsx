import React from "react";
import { LIVE_STATS } from "../../constants/portfolioData";
import "./Stats.css";

export default function Stats() {
  return (
    <section className="stats-sec" aria-label="Systems engineering metrics">
      <div className="wrap">
        <div className="stats-grid reveal">
          {LIVE_STATS.map((stat) => (
            <div key={stat.label} className="stat-card">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
              <span className="stat-detail">{stat.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
