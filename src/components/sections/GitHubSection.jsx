import React from "react";
import { GITHUB, GITHUB_STATS, GITHUB_USER, PINNED_REPOS } from "../../constants/portfolioData";
import "./GitHubSection.css";

export default function GitHubSection() {
  return (
    <section id="opensource" className="sec">
      <div className="wrap">
        <p className="sec-label reveal">Open Source</p>
        <h2 className="sec-title reveal">GitHub As Supporting Evidence</h2>
        <p className="sec-desc reveal">
          Public repositories and contribution habits that back up the project
          claims without competing with them for attention.
        </p>

        <div className="github-panel reveal">
          <div className="github-stats-row">
            <div className="github-stat">
              <span className="github-stat-val">{GITHUB_STATS.repos}</span>
              <span className="github-stat-label">Repositories</span>
            </div>
            <div className="github-stat">
              <span className="github-stat-val">{GITHUB_STATS.commits}</span>
              <span className="github-stat-label">Commits</span>
            </div>
            <div className="github-stat">
              <span className="github-stat-val">{GITHUB_STATS.contributions}</span>
              <span className="github-stat-label">Contributions</span>
            </div>
          </div>

          <div className="pinned-repos">
            {PINNED_REPOS.map((repo) => (
              <article key={repo.name} className="pinned-repo-card">
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pinned-repo-name"
                >
                  {repo.name}
                </a>
                <p className="pinned-repo-desc">{repo.description}</p>
                <div className="pinned-repo-meta">
                  <span className="pinned-repo-lang">{repo.language}</span>
                  <span className="pinned-repo-stars">★ {repo.stars}</span>
                </div>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pinned-repo-link"
                >
                  View on GitHub →
                </a>
              </article>
            ))}
          </div>

          <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="btn btn-primary github-cta">
            github.com/{GITHUB_USER}
          </a>
        </div>
      </div>
    </section>
  );
}
