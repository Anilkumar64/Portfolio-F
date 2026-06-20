import React from "react";
import { DEV_SETUP } from "../../constants/portfolioData";
import "./DevSetup.css";

export default function DevSetup() {
  return (
    <section id="setup" className="sec">
      <div className="wrap">
        <p className="sec-label reveal">setup.conf</p>
        <h2 className="sec-title reveal">My Daily Setup</h2>
        <p className="sec-desc reveal">
          The environment where I write C++, debug with GDB, and live inside the terminal.
        </p>

        <div className="setup-dashboard reveal">
          <div className="setup-preview">
            <div className="setup-preview-bar">
              <span /><span /><span />
              <span className="setup-preview-title">kitty · tmux · nvim</span>
            </div>
            <pre className="setup-preview-code">{`$ neofetch --off
OS       Arch Linux x86_64
Shell    zsh 5.9
WM       Hyprland / i3
Editor   Neovim + CLion
Terminal Kitty
CPU      x86_64
Memory   [=====>    ] 62%
Uptime   3+ years on Linux`}</pre>
          </div>

          <div className="setup-grid">
            {DEV_SETUP.map((item) => (
              <div key={item.key} className="setup-card">
                <span className="setup-icon">{item.icon}</span>
                <div>
                  <span className="setup-key">{item.key}</span>
                  <span className="setup-value">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
