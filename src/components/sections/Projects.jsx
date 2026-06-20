import React from "react";
import { PROJECTS } from "../../constants/portfolioData";
import "./Projects.css";

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-card-head">
        <div>
          <span className="project-type">{project.type}</span>
          <h3 className="project-title">
            {project.title}
            {project.subtitle && <span className="project-subtitle"> - {project.subtitle}</span>}
          </h3>
        </div>
        <span className="project-year">{project.year}</span>
      </div>

      <div className="project-metric">{project.metric}</div>
      {project.benchmarkEnv && (
        <p className="project-benchmark">{project.benchmarkEnv}</p>
      )}

      <div className="project-copy-grid">
        <div>
          <h4>Problem</h4>
          <p>{project.problem}</p>
        </div>
        <div>
          <h4>Contribution</h4>
          <p>{project.contribution}</p>
        </div>
      </div>

      <div className="project-results">
        <h4>Evidence</h4>
        <ul>
          {project.results.map((result) => (
            <li key={result}>{result}</li>
          ))}
        </ul>
      </div>

      <div className="project-bottom">
        <div className="project-stack">
          {project.stack.map((item) => (
            <span key={item} className="chip">{item}</span>
          ))}
        </div>
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
          View Repository
        </a>
      </div>

      {project.challengeLearning && (
        <p className="project-challenge">{project.challengeLearning}</p>
      )}
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="sec">
      <div className="wrap">
        <p className="sec-label reveal">Featured Projects</p>
        <h2 className="sec-title reveal">C++ Systems Projects Recruiters Can Inspect</h2>
        <p className="sec-desc reveal">
          Focused evidence of networking, Linux, concurrency, packet processing,
          and performance-oriented C++ design.
        </p>

        <div className="projects-list reveal">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
