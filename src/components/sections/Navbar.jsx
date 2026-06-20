import React, { useState, useEffect } from "react";
import { EMAIL, NAV } from "../../constants/portfolioData";
import "./Navbar.css";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY + 100;
      for (let i = NAV.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV[i].id);
        if (el && el.offsetTop <= y) {
          setActive(NAV[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className="navbar">
        <div className="wrap navbar-inner">
          <button type="button" className="navbar-logo" onClick={() => go("home")}>
            <span className="navbar-logo-prompt">Anil Kumar</span>
            <span className="navbar-logo-path">Systems Engineer</span>
          </button>

          <nav className="navbar-nav">
            {NAV.map((n) => (
              <button
                key={n.id}
                type="button"
                className={`navbar-link ${active === n.id ? "active" : ""}`}
                onClick={() => go(n.id)}
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="navbar-actions">
            <a href="/resume.pdf" download className="btn btn-outline navbar-resume">
              Resume
            </a>
            <a href={`mailto:${EMAIL}`} className="btn btn-primary navbar-contact">
              Contact
            </a>
          </div>

          <button
            type="button"
            className={`navbar-toggle ${open ? "open" : ""}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <div className={`navbar-drawer ${open ? "open" : ""}`}>
        {NAV.map((n) => (
          <button key={n.id} type="button" onClick={() => go(n.id)}>
            {n.label}
          </button>
        ))}
      </div>
      {open && <div className="navbar-overlay" onClick={() => setOpen(false)} />}
    </>
  );
}
