import { useState, useEffect, useRef } from "react";
import profileImg from "./assets/profile.jpg";

// ── Theme ──────────────────────────────────────────────────────────────────────
const T = {
  bg: "#0a0a0a",
  bg2: "#111111",
  bg3: "#161616",
  accent: "#2EE8A5",
  white: "#FFFFFF",
  gray1: "#AAAAAA",
  gray2: "#666666",
  border: "rgba(255,255,255,0.08)",
};

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const SKILLS = [
  {
    category: "Networking & Systems",
    accent: "#2EE8A5",
    items: ["C++20 / C", "TCP/IP Stack (L2–L7)", "eBPF / XDP", "libpcap / Raw Sockets", "Wireshark / tcpdump", "Linux Kernel Internals", "epoll / POSIX APIs", "Subnetting / Routing", "IDS / Anomaly Detection", "CCNA (In Progress)"],
  },
  {
    category: "Full Stack (MERN)",
    accent: "#60A5FA",
    items: ["React.js / Redux Toolkit", "Node.js / Express.js", "MongoDB / Mongoose", "MySQL / Joins / Indexes", "JWT / OAuth2 / RBAC", "WebSockets (Socket.io)", "REST API Design", "Tailwind CSS / HTML5"],
  },
  {
    category: "DevOps & Tools",
    accent: "#F472B6",
    items: ["Docker / Docker Compose", "GitHub Actions (CI/CD)", "Nginx / PM2", "Linux Server Admin", "Jest / Supertest / GTest", "Git / Bash Automation", "Postman / Swagger", "GDB / CMake"],
  },
  {
    category: "Languages",
    accent: "#FBBF24",
    items: ["C++20", "C", "Python", "JavaScript", "Bash", "SQL"],
  },
];

const EXPERIENCE = [
  {
    company: "Internet Society",
    role: "Networking Contributor — Intern",
    duration: "2025 – Present",
    type: "current",
    stack: ["Wireshark", "tcpdump", "iptables", "Bash", "Linux"],
    bullets: [
      "Performed deep packet inspection and traffic analysis using Wireshark, tcpdump, and tshark to identify and resolve connectivity issues.",
      "Configured routing, subnetting, and firewall rules (iptables) across Linux hosts with structured runbook documentation.",
      "Monitored live network flows and analyzed TCP handshakes, retransmits, and RTT to diagnose latency and packet loss.",
      "Wrote Bash automation scripts for health-checks, interface stats collection, and alert generation — reduced manual monitoring effort ~30%.",
      "Collaborated with senior network engineers on reliability improvements and contributed to best-practice TCP/IP documentation.",
    ],
  },
  {
    company: "Internet Society",
    role: "Software Engineering Intern",
    duration: "2025 – Present",
    type: "current",
    stack: ["Node.js", "Linux", "systemd", "Bash", "CI/CD"],
    bullets: [
      "Supported backend infrastructure on Linux servers — monitored uptime, managed services via systemd, and automated routine tasks with Bash scripts.",
      "Diagnosed network and application connectivity issues using Wireshark and tcpdump; documented findings for the engineering team.",
      "Collaborated with engineers on CI/CD workflow improvements and contributed to internal tooling documentation.",
    ],
  },
];

const PROJECTS = [
  {
    title: "Intelligent Intrusion Detection System",
    type: "Systems / Networking",
    accent: "#2EE8A5",
    stack: ["C++20", "libpcap", "eBPF", "TC Hook", "Qt6", "Raw Sockets"],
    bullets: [
      "Real-time IDS from scratch with libpcap packet capture and full protocol dissection (Ethernet → IP → TCP/UDP → payload).",
      "Dual-engine detection: rule-based + anomaly/heuristic engine for unknown threats.",
      "eBPF programs at TC ingress hook reduced CPU load ~60% under heavy traffic.",
      "Multi-threaded pipeline handled 50,000+ packets/second with zero drops.",
      "Alert system emits structured JSON events with <2ms latency — SIEM/ELK-ready.",
      "Qt6 dashboard with live traffic graph, alert feed, and rule management panel.",
    ],
  },
  {
    title: "Kernel Traffic Analyzer",
    type: "Systems / eBPF",
    accent: "#60A5FA",
    stack: ["C++20", "libpcap", "eBPF/XDP", "BPF Maps", "Ring Buffers", "Qt6"],
    bullets: [
      "Kernel-aware analyzer combining userspace libpcap with eBPF at TC and XDP hooks — near-zero-copy path.",
      "BPF hash maps and ring buffers accumulate per-flow stats in kernel space.",
      "Protocol dissector covers TCP, UDP, ICMP, DNS, and HTTP/1.x with correct endianness.",
      "Qt6 dashboard with 1Hz auto-refresh: bandwidth graphs, top-talker table, RTT timeline.",
    ],
  },
  {
    title: "E-Learning Platform",
    type: "Full Stack (MERN)",
    accent: "#F472B6",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Docker", "GitHub Actions"],
    bullets: [
      "Complete LMS with three user roles (Student, Instructor, Admin) with JWT session management and RBAC.",
      "20+ RESTful API endpoints with Mongoose aggregation pipelines powering dashboards.",
      "React frontend with Redux Toolkit — 90+ Lighthouse performance score.",
      "Multi-stage Docker build reduced image size 40%; GitHub Actions CI/CD pipeline.",
    ],
  },
  {
    title: "E-Grievance Hub",
    type: "Full Stack",
    accent: "#FBBF24",
    stack: ["React.js", "Node.js", "MySQL", "Socket.io", "Nginx", "Jest"],
    bullets: [
      "Full-stack grievance management system with real-time status updates via WebSockets.",
      "Normalized MySQL schema with optimized JOINs — reduced dashboard query time 50%.",
      "Three-tier role workflow (Citizen, Officer, Admin) with complete audit log.",
      "Jest + Supertest tests with 80%+ coverage; Nginx reverse proxy with gzip caching.",
    ],
  },
];

const STATS = [
  { value: "4+", label: "Projects" },
  { value: "50K+", label: "Pkt/sec IDS" },
  { value: "8.0", label: "CGPA" },
  { value: "2+", label: "Internships" },
  { value: "90%", label: "Test Coverage" },
];

// ── Cursor ─────────────────────────────────────────────────────────────────────
function Cursor() {
  const [vis, setVis] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setVis(v => !v), 530);
    return () => clearInterval(t);
  }, []);
  return <span style={{ opacity: vis ? 1 : 0, color: "#2EE8A5" }}>_</span>;
}

// ── Typewriter ─────────────────────────────────────────────────────────────────
function Typewriter({ strings, speed = 65, pause = 2000 }) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = strings[idx];
    const timeout = deleting
      ? setTimeout(() => { setText(t => t.slice(0, -1)); if (text.length === 1) { setDeleting(false); setIdx(i => (i + 1) % strings.length); setCharIdx(0); } }, 30)
      : charIdx < current.length
        ? setTimeout(() => { setText(t => t + current[charIdx]); setCharIdx(c => c + 1); }, speed)
        : setTimeout(() => setDeleting(true), pause);
    return () => clearTimeout(timeout);
  }, [text, charIdx, deleting, idx, strings, speed, pause]);
  return <span>{text}<Cursor /></span>;
}

// ── Section ────────────────────────────────────────────────────────────────────
function Section({ id, children, style = {} }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.07 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section id={id} ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(28px)", transition: "opacity 0.7s ease, transform 0.7s ease", ...style }}>
      {children}
    </section>
  );
}

// ── Tag ────────────────────────────────────────────────────────────────────────
function Tag({ children, accent = "#2EE8A5" }) {
  return (
    <span style={{
      display: "inline-block", padding: "4px 12px", borderRadius: 20,
      fontSize: 11, fontFamily: "'DM Mono', monospace", fontWeight: 500,
      background: `${accent}18`, color: accent, border: `1px solid ${accent}30`,
      letterSpacing: "0.03em",
    }}>{children}</span>
  );
}

// ── Section Header ─────────────────────────────────────────────────────────────
function SectionHeader({ eyebrow, title }) {
  return (
    <div>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#2EE8A5", textTransform: "uppercase", letterSpacing: "0.22em", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ display: "inline-block", width: 28, height: 2, background: "#2EE8A5", borderRadius: 1 }} />
        {eyebrow}
      </div>
      <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#FFFFFF", margin: "0 0 20px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
        {title}
      </h2>
      <div style={{ width: 48, height: 3, background: "linear-gradient(90deg, #2EE8A5, transparent)", borderRadius: 2 }} />
    </div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────────
function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const y = window.scrollY + 140;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el && el.offsetTop <= y) { setActive(NAV_ITEMS[i].id); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      background: "rgba(10,10,10,0.96)", backdropFilter: "blur(24px)",
      borderBottom: `1px solid ${scrolled ? "rgba(46,232,165,0.12)" : "rgba(255,255,255,0.06)"}`,
      transition: "border-color 0.3s",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => scrollTo("home")}>
          <div style={{ width: 36, height: 36, borderRadius: 10, overflow: "hidden", border: "2px solid #2EE8A5", flexShrink: 0 }}>
            <img src={profileImg} alt="AK" style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={e => { e.target.style.display = "none"; e.target.parentNode.style.background = "#2EE8A5"; e.target.parentNode.style.display = "flex"; e.target.parentNode.style.alignItems = "center"; e.target.parentNode.style.justifyContent = "center"; e.target.parentNode.innerHTML = '<span style="font-size:14px;font-weight:800;color:#0a0a0a;font-family:sans-serif">AK</span>'; }} />
          </div>
          <div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1 }}>Anil Kumar</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#2EE8A5", letterSpacing: "0.1em", lineHeight: 1.5 }}>DEVELOPER</div>
          </div>
        </div>

        {/* Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {NAV_ITEMS.map(n => (
            <button key={n.id} onClick={() => scrollTo(n.id)} style={{
              background: active === n.id ? "rgba(46,232,165,0.12)" : "transparent",
              border: "none", cursor: "pointer", padding: "8px 18px", borderRadius: 8,
              fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: active === n.id ? 600 : 500,
              color: active === n.id ? "#2EE8A5" : "#AAAAAA",
              transition: "all 0.2s", letterSpacing: "-0.01em",
            }}
              onMouseEnter={e => { if (active !== n.id) { e.currentTarget.style.color = "#FFFFFF"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; } }}
              onMouseLeave={e => { if (active !== n.id) { e.currentTarget.style.color = "#AAAAAA"; e.currentTarget.style.background = "transparent"; } }}>
              {n.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <a href="mailto:vennapureddyanil456@gmail.com" target="_blank" style={{
          display: "flex", alignItems: "center", gap: 8, padding: "10px 22px", borderRadius: 30,
          background: "#2EE8A5", color: "#0a0a0a", textDecoration: "none",
          fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 13,
          transition: "transform 0.2s, box-shadow 0.2s", boxShadow: "0 4px 20px rgba(46,232,165,0.35)",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(46,232,165,0.5)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(46,232,165,0.35)"; }}>
          ▶ Hire Me
        </a>
      </div>
    </nav>
  );
}

// ── Social Sidebar ─────────────────────────────────────────────────────────────
function SocialSidebar() {
  const links = [
    { label: "GH", href: "https://github.com/Anilkumar64", title: "GitHub" },
    { label: "LI", href: "https://www.linkedin.com/in/vennapu-reddy-anil-kumar-8782a521a/", title: "LinkedIn" },
    { label: "ML", href: "mailto:vennapureddyanil456@gmail.com", title: "Email" },
  ];
  return (
    <div style={{ position: "fixed", right: 20, top: "50%", transform: "translateY(-50%)", zIndex: 100, display: "flex", flexDirection: "column", gap: 10 }}>
      {links.map(l => (
        <a key={l.label} href={l.href} title={l.title} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={{
          width: 40, height: 40, borderRadius: "50%", background: "#161616",
          border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 700, color: "#666666",
          textDecoration: "none", transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#2EE8A5"; e.currentTarget.style.color = "#2EE8A5"; e.currentTarget.style.background = "rgba(46,232,165,0.1)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#666666"; e.currentTarget.style.background = "#161616"; }}>
          {l.label}
        </a>
      ))}
      <div style={{ width: 1, height: 60, background: "linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)", margin: "4px auto 0" }} />
    </div>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────────
function Hero() {
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section id="home" style={{ minHeight: "100vh", background: "#0a0a0a", position: "relative", overflow: "hidden", display: "flex", alignItems: "stretch" }}>
      {/* Dot grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "32px 32px", opacity: 1, pointerEvents: "none" }} />
      {/* Accent glow */}
      <div style={{ position: "absolute", top: "10%", left: "25%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(46,232,165,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", width: "100%", display: "flex", alignItems: "center", paddingTop: 72 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 60, alignItems: "center", width: "100%", minHeight: "calc(100vh - 72px)" }}>

          {/* LEFT */}
          <div style={{ paddingTop: 20 }}>
            {/* Status badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(46,232,165,0.1)", border: "1px solid rgba(46,232,165,0.25)", borderRadius: 30, padding: "7px 18px", marginBottom: 32 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#2EE8A5", display: "inline-block", boxShadow: "0 0 10px #2EE8A5" }} />
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#2EE8A5", letterSpacing: "0.16em", textTransform: "uppercase" }}>Open to Work — 2026 Graduate</span>
            </div>

            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#666666", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Hello, I'm</div>

            <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(3.5rem, 7.5vw, 7rem)", fontWeight: 800, color: "#FFFFFF", margin: "0", lineHeight: 0.92, letterSpacing: "-0.04em" }}>ANIL</h1>
            <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(3.5rem, 7.5vw, 7rem)", fontWeight: 800, color: "#2EE8A5", margin: "0 0 24px", lineHeight: 0.92, letterSpacing: "-0.04em" }}>KUMAR</h1>

            <div style={{ height: 44, marginBottom: 24, fontFamily: "'DM Mono', monospace", fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "#AAAAAA", letterSpacing: "0.02em" }}>
              <Typewriter strings={["Network Engineer", "MERN Stack Developer", "Systems Programmer", "eBPF / Linux Kernel Dev", "CCNA Candidate"]} />
            </div>

            <p style={{ color: "#666666", fontSize: 16, lineHeight: 1.85, maxWidth: 520, margin: "0 0 40px", fontFamily: "'Sora', sans-serif" }}>
              Final-year CS student at <span style={{ color: "#AAAAAA" }}>ITM University, Gwalior</span>. Building real-time network intrusion detection systems and full-stack web apps. Passionate about kernel-level programming and packet processing.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 56 }}>
              <button onClick={() => scrollTo("projects")} style={{
                padding: "14px 32px", borderRadius: 30, background: "#2EE8A5", color: "#0a0a0a",
                border: "none", cursor: "pointer", fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 15,
                transition: "all 0.2s", boxShadow: "0 6px 24px rgba(46,232,165,0.4)",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(46,232,165,0.55)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(46,232,165,0.4)"; }}>
                ▶ &nbsp;View Projects
              </button>
              <button onClick={() => scrollTo("contact")} style={{
                padding: "14px 32px", borderRadius: 30, background: "transparent", color: "#FFFFFF",
                border: "1.5px solid rgba(255,255,255,0.15)", cursor: "pointer",
                fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 15, transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#2EE8A5"; e.currentTarget.style.color = "#2EE8A5"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "#FFFFFF"; }}>
                Contact Me
              </button>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 0, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.07)", flexWrap: "wrap" }}>
              {STATS.map((s, i) => (
                <div key={s.label} style={{ paddingRight: 28, marginRight: 28, borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none", marginBottom: 8 }}>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 24, fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.03em", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#555555", marginTop: 5, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Photo */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ position: "absolute", top: "5%", left: "5%", right: "5%", bottom: "5%", borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%", background: "rgba(46,232,165,0.12)", filter: "blur(40px)", zIndex: 0 }} />
            <div style={{
              position: "relative", zIndex: 1, width: 340, height: 440,
              borderRadius: "100px 100px 70px 70px", overflow: "hidden",
              border: "2px solid rgba(46,232,165,0.3)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
            }}>
              <img src={profileImg} alt="Anil Kumar" style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={e => { e.target.style.display = "none"; e.target.parentNode.style.background = "#161616"; e.target.parentNode.style.display = "flex"; e.target.parentNode.style.alignItems = "center"; e.target.parentNode.style.justifyContent = "center"; e.target.parentNode.innerHTML = '<div style="text-align:center"><div style="font-size:80px">👨‍💻</div><div style="color:#2EE8A5;font-size:18px;font-weight:700;margin-top:12px;font-family:sans-serif">Anil Kumar</div></div>'; }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "45%", background: "linear-gradient(to top, rgba(10,10,10,0.95), transparent)" }} />
              <div style={{ position: "absolute", bottom: 20, left: 0, right: 0, textAlign: "center" }}>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, fontWeight: 700, color: "#FFFFFF" }}>Anil Kumar</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#2EE8A5", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 3 }}>CS Engineer · ITM University</div>
              </div>
            </div>

            {/* Floating chip top-left */}
            <div style={{ position: "absolute", top: "14%", left: "-8%", zIndex: 2, background: "#161616", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "12px 16px", boxShadow: "0 12px 32px rgba(0,0,0,0.5)" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#2EE8A5", marginBottom: 3 }}>🌐 NETWORKING</div>
              <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 13, color: "#FFFFFF", fontWeight: 600 }}>KTS/IDS 50K+Pkts</div>
            </div>

            {/* Floating chip bottom-right */}
            <div style={{ position: "absolute", bottom: "16%", right: "-8%", zIndex: 2, background: "#161616", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "12px 16px", boxShadow: "0 12px 32px rgba(0,0,0,0.5)" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#60A5FA", marginBottom: 3 }}>⚡ FULLSTACK</div>
              <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 13, color: "#FFFFFF", fontWeight: 600 }}>MERN + Devops</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ── About ──────────────────────────────────────────────────────────────────────
function About() {
  return (
    <Section id="about" style={{ padding: "120px 0", background: "#111111" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <SectionHeader eyebrow="About Me" title="Looking for a role in Networking & Dev?" />
            <p style={{ color: "#AAAAAA", lineHeight: 1.9, marginTop: 28, marginBottom: 20, fontSize: 15.5, fontFamily: "'Sora', sans-serif" }}>
              Final-year CS student at <span style={{ color: "#FFFFFF", fontWeight: 600 }}>ITM University, Gwalior</span> (graduating May 2026), focused on <span style={{ color: "#2EE8A5" }}>systems/network programming</span> and <span style={{ color: "#60A5FA" }}>full-stack web development</span>.
            </p>
            <p style={{ color: "#666666", lineHeight: 1.9, marginBottom: 28, fontSize: 15.5, fontFamily: "'Sora', sans-serif" }}>
              On the systems side, I write C++20 deep in the Linux networking stack — building real-time IDS engines with eBPF/XDP, libpcap, and lock-free data structures. On the web side, I architect MERN applications with JWT auth, WebSockets, and Docker CI/CD pipelines.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px", marginBottom: 36 }}>
              {["Open to Internships", "Entry-Level Roles", "Network Engineering", "Full Stack Dev", "CCNA In Progress", "Linux / eBPF"].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "#2EE8A5", fontSize: 14 }}>✓</span>
                  <span style={{ color: "#AAAAAA", fontSize: 14, fontFamily: "'Sora', sans-serif" }}>{item}</span>
                </div>
              ))}
            </div>
            <a href="mailto:vennapureddyanil456@gmail.com" style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 30,
              background: "transparent", color: "#2EE8A5", border: "1.5px solid #2EE8A5",
              textDecoration: "none", fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14, transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#2EE8A5"; e.currentTarget.style.color = "#0a0a0a"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#2EE8A5"; }}>
              ▶ Get In Touch
            </a>
          </div>
          <div style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 40, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #2EE8A5, #60A5FA)" }} />
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#2EE8A5", textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 24 }}>— Education</div>
            <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 28 }}>
              <div style={{ background: "rgba(46,232,165,0.1)", border: "1px solid rgba(46,232,165,0.25)", borderRadius: 14, padding: "14px 20px", textAlign: "center", flexShrink: 0 }}>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 28, fontWeight: 800, color: "#2EE8A5", letterSpacing: "-0.02em" }}>8.0</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#555555", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 3 }}>CGPA</div>
              </div>
              <div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 17, fontWeight: 700, color: "#FFFFFF", marginBottom: 5, letterSpacing: "-0.01em" }}>B.Tech — CSE</div>
                <div style={{ color: "#AAAAAA", fontSize: 13.5, marginBottom: 3, fontFamily: "'Sora', sans-serif" }}>ITM University, Gwalior, MP</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#555555" }}>Aug 2022 – May 2026</div>
              </div>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 24 }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#60A5FA", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 14 }}>Currently Studying</div>
              {["CCNA Certification (in progress)", "Linux Kernel Development", "Advanced eBPF / XDP", "DPDK — kernel-bypass networking", "Kubernetes CNI / eBPF Cilium"].map(item => (
                <div key={item} style={{ display: "flex", gap: 10, marginBottom: 9 }}>
                  <span style={{ color: "#2EE8A5", flexShrink: 0, marginTop: 1 }}>→</span>
                  <span style={{ color: "#AAAAAA", fontSize: 13.5, fontFamily: "'Sora', sans-serif" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ── Experience ─────────────────────────────────────────────────────────────────
function Experience() {
  return (
    <Section id="experience" style={{ padding: "120px 0", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <SectionHeader eyebrow="Experience" title="Work History" />
        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 60 }}>
          {EXPERIENCE.map((exp, i) => (
            <div key={i} style={{
              background: "#161616", border: "1px solid rgba(255,255,255,0.07)", borderLeft: "3px solid #2EE8A5",
              borderRadius: 16, padding: "32px 36px", transition: "transform 0.2s, border-left-color 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateX(6px)"; e.currentTarget.style.borderLeftColor = "#60A5FA"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(0,0,0,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.borderLeftColor = "#2EE8A5"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 20 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 700, color: "#FFFFFF", margin: 0, letterSpacing: "-0.01em" }}>{exp.company}</h3>
                    {exp.type === "current" && (
                      <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 10, fontFamily: "'DM Mono', monospace", background: "rgba(46,232,165,0.12)", color: "#2EE8A5", border: "1px solid rgba(46,232,165,0.25)", letterSpacing: "0.06em" }}>● CURRENT</span>
                    )}
                  </div>
                  <div style={{ color: "#2EE8A5", fontWeight: 600, fontSize: 14.5, marginBottom: 4, fontFamily: "'Sora', sans-serif" }}>{exp.role}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#555555" }}>{exp.duration}</div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {exp.stack.map(s => <Tag key={s} accent="#2EE8A5">{s}</Tag>)}
                </div>
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {exp.bullets.map((b, j) => (
                  <li key={j} style={{ display: "flex", gap: 10, marginBottom: 9 }}>
                    <span style={{ color: "#2EE8A5", fontSize: 12, marginTop: 3, flexShrink: 0 }}>▸</span>
                    <span style={{ color: "#AAAAAA", fontSize: 14.5, lineHeight: 1.75, fontFamily: "'Sora', sans-serif" }}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ── Skills ─────────────────────────────────────────────────────────────────────
function Skills() {
  return (
    <Section id="skills" style={{ padding: "120px 0", background: "#111111" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <SectionHeader eyebrow="Skills" title="Technical Expertise" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 22, marginTop: 60 }}>
          {SKILLS.map(cat => (
            <div key={cat.category} style={{
              background: "#161616", border: "1px solid rgba(255,255,255,0.07)", borderTop: `3px solid ${cat.accent}`,
              borderRadius: 16, padding: "28px 24px", transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 20px 50px rgba(0,0,0,0.5)`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: cat.accent, textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: 18 }}>{cat.category}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {cat.items.map(item => (
                  <span key={item} style={{ padding: "5px 11px", borderRadius: 20, fontSize: 12, fontFamily: "'DM Mono', monospace", background: `${cat.accent}0e`, color: "#AAAAAA", border: `1px solid ${cat.accent}20` }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ── Projects ───────────────────────────────────────────────────────────────────
function Projects() {
  const [expanded, setExpanded] = useState(null);
  return (
    <Section id="projects" style={{ padding: "120px 0", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <SectionHeader eyebrow="Projects" title="Featured Work" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24, marginTop: 60 }}>
          {PROJECTS.map((p, i) => (
            <div key={i} style={{
              background: "#161616", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 18, overflow: "hidden", cursor: "pointer",
              transition: "transform 0.25s, box-shadow 0.25s",
            }}
              onClick={() => setExpanded(expanded === i ? null : i)}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 24px 60px rgba(0,0,0,0.6)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ height: 3, background: `linear-gradient(90deg, ${p.accent}, ${p.accent}33)` }} />
              <div style={{ padding: "24px 26px 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: p.accent, textTransform: "uppercase", letterSpacing: "0.12em" }}>{p.type}</span>
                  <span style={{ color: "#444", transition: "transform 0.2s", transform: expanded === i ? "rotate(180deg)" : "rotate(0)", display: "inline-block", fontSize: 16 }}>▾</span>
                </div>
                <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, fontWeight: 700, color: "#FFFFFF", margin: "0 0 16px", letterSpacing: "-0.01em", lineHeight: 1.35 }}>{p.title}</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                  {p.stack.map(s => <Tag key={s} accent={p.accent}>{s}</Tag>)}
                </div>
              </div>
              <div style={{ padding: "0 26px 24px" }}>
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {(expanded === i ? p.bullets : p.bullets.slice(0, 2)).map((b, j) => (
                    <li key={j} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                      <span style={{ color: p.accent, fontSize: 10, marginTop: 4, flexShrink: 0 }}>▸</span>
                      <span style={{ color: "#666666", fontSize: 13.5, lineHeight: 1.7, fontFamily: "'Sora', sans-serif" }}>{b}</span>
                    </li>
                  ))}
                </ul>
                {p.bullets.length > 2 && (
                  <div style={{ color: p.accent, fontSize: 11, fontFamily: "'DM Mono', monospace", marginTop: 8 }}>
                    {expanded === i ? "↑ show less" : `↓ +${p.bullets.length - 2} more`}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ── Contact ────────────────────────────────────────────────────────────────────
function Contact() {
  const contacts = [
    { label: "Email", value: "vennapureddyanil456@gmail.com", href: "mailto:vennapureddyanil456@gmail.com", accent: "#2EE8A5" },
    { label: "Phone", value: "+91 77250 05752", href: "tel:+917725005752", accent: "#60A5FA" },
    { label: "LinkedIn", value: "AnilKumar64", href: "https://www.linkedin.com/in/vennapu-reddy-anil-kumar-8782a521a/", accent: "#A78BFA" },
    { label: "GitHub", value: "Anilkumar64", href: "https://github.com/Anilkumar64", accent: "#FBBF24" },
    { label: "Location", value: "Gwalior, MP, India", href: null, accent: "#2EE8A5" },
  ];
  return (
    <Section id="contact" style={{ padding: "120px 0", background: "#111111" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <SectionHeader eyebrow="Contact" title="Get In Touch" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, marginTop: 60, alignItems: "start" }}>
          <div>
            <p style={{ color: "#AAAAAA", fontSize: 16, lineHeight: 1.85, marginBottom: 36, fontFamily: "'Sora', sans-serif", maxWidth: 440 }}>
              Looking for internship or entry-level roles in <span style={{ color: "#FFFFFF" }}>Network Engineering</span> or <span style={{ color: "#FFFFFF" }}>Full Stack Development</span>. Let's build something great together.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href="mailto:vennapureddyanil456@gmail.com" style={{
                padding: "14px 30px", borderRadius: 30, background: "#2EE8A5", color: "#0a0a0a",
                textDecoration: "none", fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 14,
                boxShadow: "0 6px 24px rgba(46,232,165,0.4)", transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(46,232,165,0.55)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(46,232,165,0.4)"; }}>
                ▶ &nbsp;Send Email
              </a>
              <a href="https://github.com/Anilkumar64" target="_blank" rel="noopener noreferrer" style={{
                padding: "14px 30px", borderRadius: 30, background: "transparent", color: "#FFFFFF",
                border: "1.5px solid rgba(255,255,255,0.15)", textDecoration: "none",
                fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14, transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#FBBF24"; e.currentTarget.style.color = "#FBBF24"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "#FFFFFF"; }}>
                GitHub
              </a>
            </div>
            <div style={{ marginTop: 40, background: "#161616", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "20px 24px", display: "flex", alignItems: "center", gap: 14, maxWidth: 360 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#2EE8A5", flexShrink: 0, boxShadow: "0 0 12px #2EE8A5" }} />
              <div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, color: "#FFFFFF", fontSize: 14 }}>Available for work</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#555555", marginTop: 2 }}>Graduating May 2026 · Gwalior, India</div>
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {contacts.map(c => (
              <div key={c.label} style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "20px 18px", transition: "border-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${c.accent}40`}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: c.accent, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 8 }}>{c.label}</div>
                {c.href ? (
                  <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                    style={{ color: "#AAAAAA", fontSize: 13, textDecoration: "none", wordBreak: "break-all", fontFamily: "'Sora', sans-serif", transition: "color 0.2s" }}
                    onMouseEnter={e => e.target.style.color = c.accent}
                    onMouseLeave={e => e.target.style.color = "#AAAAAA"}>{c.value}</a>
                ) : (
                  <span style={{ color: "#AAAAAA", fontSize: 13, fontFamily: "'Sora', sans-serif" }}>{c.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "32px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#444444" }}>
        <span style={{ color: "#2EE8A5" }}>Anil Kumar Vennapureddy</span> · © 2026 · Built with React
      </div>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#444444" }}>Open to opportunities · Gwalior, India</div>
    </footer>
  );
}

// ── App ────────────────────────────────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Mono:ital,wght@0,400;0,500;0,600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    document.body.style.margin = "0";
    document.body.style.background = "#0a0a0a";
    document.body.style.overflowX = "hidden";
  }, []);

  return (
    <div style={{ fontFamily: "'Sora', sans-serif", background: "#0a0a0a", color: "#FFFFFF" }}>
      <Navbar />
      <SocialSidebar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}