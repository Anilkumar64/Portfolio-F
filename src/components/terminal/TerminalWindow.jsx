import React, { useState, useEffect } from "react";

export default function TerminalWindow({
  title = "anil@arch ~ zsh",
  lines = [],
  animate = false,
  className = "",
}) {
  const [visibleCount, setVisibleCount] = useState(animate ? 0 : lines.length);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!animate || visibleCount >= lines.length) return;
    const t = setTimeout(() => setVisibleCount((c) => c + 1), 400);
    return () => clearTimeout(t);
  }, [animate, visibleCount, lines.length]);

  const displayLines = lines.slice(0, visibleCount);
  const typing = animate && visibleCount < lines.length;

  return (
    <div className={`terminal ${className}`}>
      <div className="terminal-header">
        <div className="terminal-dots">
          <span /><span /><span />
        </div>
        <span className="terminal-title">{title}</span>
      </div>
      <div className="terminal-body">
        {displayLines.map((line, i) => (
          <div key={i} className="terminal-line">
            {line.cmd && (
              <>
                <span className="terminal-prompt">$ </span>
                <span className="terminal-cmd">{line.cmd}</span>
              </>
            )}
            {line.out !== undefined && line.out !== null && (
              <div className="terminal-out">
                {Array.isArray(line.out)
                  ? line.out.map((o) => <div key={String(o)}>{o}</div>)
                  : line.out}
              </div>
            )}
            {line.raw && <div className="terminal-out dim">{line.raw}</div>}
          </div>
        ))}
        {(typing || showCursor) && (
          <div className="terminal-line">
            <span className="terminal-prompt">$ </span>
            {typing ? null : <span className="terminal-cursor" />}
          </div>
        )}
      </div>
    </div>
  );
}
