import React, { useEffect } from "react";
import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import Stats from "./components/sections/Stats";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import GitHubSection from "./components/sections/GitHubSection";
import About from "./components/sections/About";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -32px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-root">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Experience />
        <Projects />
        <div id="skills" aria-hidden="true" />
        <GitHubSection />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
