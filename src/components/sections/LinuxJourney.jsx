import React from "react";
import { LINUX_JOURNEY } from "../../constants/portfolioData";
import "./LinuxJourney.css";

export default function LinuxJourney() {
  return (
    <section id="linux" className="sec">
      <div className="wrap">
        <p className="sec-label reveal">linux_journey.sh</p>
        <h2 className="sec-title reveal">My Linux Journey</h2>
        <p className="sec-desc reveal">
          From switching to Linux in college to kernel modules and eBPF — how I went
          from user to someone who reads man pages for fun.
        </p>

        <div className="linux-timeline reveal">
          {LINUX_JOURNEY.map((item, i) => (
            <div key={i} className="linux-timeline-item">
              <div className="linux-timeline-marker">
                <span className="linux-timeline-dot" />
                {i < LINUX_JOURNEY.length - 1 && <span className="linux-timeline-line" />}
              </div>
              <div className="linux-timeline-content">
                <div className="linux-timeline-head">
                  <span className="linux-timeline-year">{item.year}</span>
                  <span className="linux-timeline-distro">{item.distro}</span>
                </div>
                <p className="linux-timeline-detail">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
