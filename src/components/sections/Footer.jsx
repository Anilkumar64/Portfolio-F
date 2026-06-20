import React from "react";
import { GITHUB } from "../../constants/portfolioData";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <p className="footer-text">Built with React, Vite, and a systems engineer's bias for measurable work.</p>
        <p className="footer-copy">Copyright 2026 Anil Kumar Vennapureddy</p>
        <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="footer-link">
          GitHub
        </a>
      </div>
    </footer>
  );
}
