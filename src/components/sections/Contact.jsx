import React from "react";
import { CONTACT_LINKS, EMAIL } from "../../constants/portfolioData";
import "./Contact.css";

export default function Contact() {
  return (
    <section id="contact" className="sec contact-sec">
      <div className="wrap">
        <p className="sec-label reveal">Contact</p>
        <h2 className="sec-title reveal">Open to systems engineering roles</h2>
        <p className="sec-desc reveal">
          Available for systems programming, Linux, networking, and open-source
          engineering opportunities.
        </p>

        <p className="contact-email reveal">{EMAIL}</p>

        <div className="contact-panel reveal">
          {CONTACT_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              download={link.download}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="contact-item"
            >
              <span>{link.label}</span>
              <strong>{link.value}</strong>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
