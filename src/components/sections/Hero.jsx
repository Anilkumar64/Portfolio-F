import React from "react";
import profileImg from "../../assets/profile.jpg";
import TerminalWindow from "../terminal/TerminalWindow";
import { EMAIL, GITHUB, HERO_TERMINAL } from "../../constants/portfolioData";
import "./Hero.css";

export default function Hero() {
  const scrollToProjects = () =>
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="hero">
      <div className="wrap hero-inner">
        <div className="hero-copy reveal">
          <p className="hero-kicker">C++ / Linux / Networking</p>
          <h1 className="hero-name">Anil Kumar Vennapureddy</h1>
          <p className="hero-badge">● Open to C++ systems roles</p>
          <p className="hero-education">B.Tech CS · IIT Gwalior · 2025</p>
          <p className="hero-headline">
            Systems Engineer - C++20 | Linux Internals | Network Programming
          </p>
          <p className="hero-tagline">
            I build systems where every microsecond counts.
          </p>
          <p className="hero-mission">
            I build low-latency systems software in C++, from kernel-adjacent
            networking tools to event-driven packet analysis pipelines handling
            50K+ packets/sec.
          </p>

          <div className="hero-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={scrollToProjects}
            >
              View Projects
            </button>
            <a href="/resume.pdf" download className="btn btn-ghost">
              Download Resume
            </a>
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              GitHub
            </a>
            <a href={`mailto:${EMAIL}`} className="btn btn-talk">
              Let's talk →
            </a>
          </div>
        </div>

        <div className="hero-visual reveal reveal-delay-2">
          <div className="hero-photo-card">
            <img
              src={profileImg}
              alt="Anil Kumar Vennapureddy"
              className="hero-photo"
            />
            <div>
              <span className="hero-photo-label">
                Open to C++ systems roles
              </span>
              <strong>
                Linux-first engineer with packet tooling experience.
              </strong>
            </div>
          </div>

          <TerminalWindow
            title="systems-profile"
            lines={HERO_TERMINAL}
            animate
            className="hero-terminal"
          />
        </div>
      </div>
    </section>
  );
}
