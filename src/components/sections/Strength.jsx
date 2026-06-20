import React from "react";
import Sec from "../common/Sec";
import Wrap from "../common/Wrap";
import Heading from "../common/Heading";
import { STRENGTHS } from "../../constants/portfolioData";
import "./Strength.css";

const TIER_CLASS = {
  Expert: "tier-expert",
  Proficient: "tier-proficient",
  Familiar: "tier-familiar",
};

export default function Strength() {
  return (
    <Sec id="strength">
      <Wrap>
        <Heading num="03" title="Technical Depth" />
        <div className="strength-list reveal">
          {STRENGTHS.map((s) => (
            <div key={s.label} className="strength-item">
              <span className="strength-label">{s.label}</span>
              <span className={`strength-tier ${TIER_CLASS[s.tier] || ""}`}>
                {s.tier}
              </span>
            </div>
          ))}
        </div>
      </Wrap>
    </Sec>
  );
}
