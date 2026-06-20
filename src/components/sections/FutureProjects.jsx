import React from "react";
import { FUTURE_PROJECTS } from "../../constants/portfolioData";
import "./FutureProjects.css";

export default function FutureProjects() {
  return (
    <section id="future" className="sec">
      <div className="wrap">
        <p className="sec-label reveal">TODO.md</p>
        <h2 className="sec-title reveal">What I'm Building Next</h2>
        <p className="sec-desc reveal">
          Side projects and experiments on my roadmap — marked as currently exploring.
        </p>

        <div className="future-grid reveal">
          {FUTURE_PROJECTS.map((name) => (
            <div key={name} className="future-card">
              <span className="future-status">[ exploring ]</span>
              <span className="future-name">{name}</span>
            </div>
          ))}
        </div>

        <pre className="future-cmd reveal" aria-hidden="true">{`$ ls ~/experiments/
mini-shell/  http-server/  mem-allocator/  ebpf-tools/`}</pre>
      </div>
    </section>
  );
}
