import { useState, useEffect, useRef } from "react";

/* ── Palette ─────────────────────────────────────────────────── */
const P = {
  bg: "#09090B",
  surface: "#111113",
  card: "#18181C",
  border: "rgba(255,255,255,0.06)",
  borderHi: "rgba(255,255,255,0.12)",
  text: "#F4F4F5",
  muted: "#71717A",
  faint: "#3F3F46",
  teal: "#2DD4BF",
  tealDim: "rgba(45,212,191,0.12)",
  tealGlo: "rgba(45,212,191,0.25)",
  gold: "#F59E0B",
  goldDim: "rgba(245,158,11,0.1)",
  violet: "#A78BFA",
  rose: "#FB7185",
  sky: "#38BDF8",
  green: "#4ADE80",
};

/* ── Data ────────────────────────────────────────────────────── */
const NAV = ["home", "about", "skills", "projects", "contact"];

const PROJECTS = [
  {
    id: "01", title: "Intelligent Intrusion Detection System",
    tag: "Systems · Security", accent: P.teal, year: "2025–Present",
    github: "https://github.com/Anilkumar64",
    stack: ["C++20", "libpcap", "eBPF", "TC Hook", "Kernel Module", "Qt6", "Python ML"],
    summary: "Real-time IDS with libpcap NIC capture, eBPF kernel filtering, and a dual-engine detection pipeline processing 50K+ packets/sec.",
    highlights: ["Custom kernel module (ids_kmod.ko) intercepts packets pre-userspace — near-zero-copy NIC path", "Dual-engine: rule-based (port scans, SYN flood, ARP spoofing) + ML anomaly via Random Forest on CICIDS2017", "eBPF at TC ingress hook reduces CPU usage ~60% under heavy traffic", "Lock-free ring buffer (C++20 atomics) — 50K+ pkt/sec, zero drops", "Structured JSON alerts <2ms latency, SIEM/ELK-ready"]
  },
  {
    id: "02", title: "TCP/IP Stack Visualizer",
    tag: "Systems · Networking", accent: P.sky, year: "2024",
    github: "https://github.com/Anilkumar64",
    stack: ["C++20", "libpcap", "Qt6", "Raw Sockets", "Linux"],
    summary: "Live packet capture from NIC with layer-by-layer TCP/IP dissection and real-time animation from Ethernet frame to payload.",
    highlights: ["Direct NIC capture via libpcap — no pcap files, pure wire stream", "TCP/UDP stream separation with encapsulation visualised: Ethernet → IP → segment → payload", "Animated fragmentation/reassembly across all TCP/IP layers in real time", "Header field dissection: SYN/ACK/FIN/RST flags, seq/ack numbers, TTL, checksum"]
  },
  {
    id: "03", title: "Kernel Traffic Analyzer",
    tag: "Kernel · eBPF", accent: P.violet, year: "2024",
    github: "https://github.com/Anilkumar64",
    stack: ["C++20", "eBPF/XDP", "BPF Maps", "Ring Buffers", "libpcap", "Qt6"],
    summary: "Kernel-aware analyzer combining libpcap with eBPF at XDP hooks for per-flow statistics — near-zero-copy path.",
    highlights: ["eBPF at TC and XDP hooks — near-zero-copy NIC to analysis engine", "BPF hash maps accumulate per-flow stats in kernel space; userspace reads via ring buffers", "Dissector: TCP, UDP, ICMP, DNS, HTTP/1.x method + status + host", "Qt6 dashboard: 1Hz refresh, bandwidth graphs, top-talker table, RTT timeline"]
  },
  {
    id: "04", title: "Tiny Shell — Remote Client/Server",
    tag: "Systems · Linux", accent: P.gold, year: "2023",
    github: "https://github.com/Anilkumar64",
    stack: ["C++20", "POSIX Sockets", "Qt6", "Linux", "pthreads"],
    summary: "Unix shell from scratch — piping, redirection, background jobs — extended with remote client/server over raw TCP.",
    highlights: ["Full Unix shell: piping, I/O redirection, background jobs, POSIX signal handling", "Remote client/server over raw TCP socket with full stdin/stdout forwarding", "Custom wire protocol: command framing, partial reads, connection drops, graceful shutdown"]
  },
  {
    id: "05", title: "E-Learning Platform (LMS)",
    tag: "Full Stack · MERN", accent: P.green, year: "2024–2025",
    github: "https://github.com/Anilkumar64",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Docker", "GitHub Actions"],
    summary: "Complete LMS with 3 user roles, JWT auth, 20+ REST endpoints, Redux frontend, and multi-stage Docker build.",
    highlights: ["Three roles (Student, Instructor, Admin) with JWT session management and RBAC", "20+ REST endpoints with Mongoose aggregation; 90+ Lighthouse score", "Multi-stage Docker build reduced image size 40%; GitHub Actions CI/CD", "Rate limiting, CORS, input sanitization across all routes"]
  },
  {
    id: "06", title: "E-Grievance Hub",
    tag: "Full Stack · AI", accent: P.rose, year: "2024",
    github: "https://github.com/Anilkumar64",
    stack: ["React.js", "Node.js", "MySQL", "FastAPI", "Socket.io", "Docker", "scikit-learn"],
    summary: "University grievance system with AI auto-categorization, sentiment analysis, real-time WebSocket updates, and 3-tier roles.",
    highlights: ["AI microservice (FastAPI + scikit-learn) auto-categorizes complaints and runs sentiment analysis", "Three-tier roles: Student, Admin, Super Admin — full audit log", "Real-time updates via WebSockets; optimized MySQL JOINs — 50% faster queries", "Jest + Supertest 80%+ coverage; Nginx reverse proxy with gzip caching"]
  },
];

const SKILLS = [
  {
    cat: "C++ Core", color: P.teal,
    items: ["C++20/17/14", "Move Semantics", "Perfect Forwarding", "RAII", "Smart Pointers", "Template Metaprogramming", "Custom Allocators", "SFINAE/Concepts", "constexpr", "STL Internals"]
  },
  {
    cat: "Linux / Kernel", color: P.sky,
    items: ["Kernel Internals", "Process Scheduler", "Memory Management", "Network Stack", "Kernel Modules (.ko)", "netfilter/iptables", "/proc & /sys", "epoll/select/poll", "POSIX APIs"]
  },
  {
    cat: "eBPF / Networking", color: P.violet,
    items: ["eBPF Programs", "TC Hook", "XDP", "BPF Maps", "Ring Buffers", "libpcap", "Raw Sockets", "TCP/IP L2–L7", "DNS/HTTP/ARP"]
  },
  {
    cat: "Concurrency", color: P.gold,
    items: ["std::thread / pthreads", "Lock-Free Queues", "std::atomic", "Memory Ordering", "Condition Variables", "Thread Sanitizer"]
  },
  {
    cat: "Full Stack", color: P.green,
    items: ["React.js / Redux", "Node.js / Express", "MongoDB / Mongoose", "MySQL / Joins", "JWT / OAuth2 / RBAC", "WebSockets", "REST API"]
  },
  {
    cat: "DevOps & Tools", color: P.rose,
    items: ["Docker / Compose", "GitHub Actions", "CMake / GDB", "Valgrind / ASan", "Wireshark / tcpdump", "Nginx / PM2", "Jest / GTest"]
  },
];

const STATS = [
  { val: "50K+", label: "Pkt/sec IDS" },
  { val: "8.0", label: "CGPA" },
  { val: "4+", label: "Yrs Building" },
  { val: "6", label: "Major Projects" },
];

/* ── Hooks ───────────────────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); o.disconnect(); }
    }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, vis];
}

function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return w;
}

/* ── Micro components ────────────────────────────────────────── */
function Cursor() {
  const [v, setV] = useState(true);
  useEffect(() => { const t = setInterval(() => setV(x => !x), 530); return () => clearInterval(t); }, []);
  return <span style={{ opacity: v ? 1 : 0, color: P.teal }}>|</span>;
}

function Typewriter({ strings, speed = 60, pause = 2200 }) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = strings[idx];
    const t = del
      ? setTimeout(() => { setText(s => s.slice(0, -1)); if (text.length === 1) { setDel(false); setIdx(i => (i + 1) % strings.length); setCi(0); } }, 18)
      : ci < cur.length
        ? setTimeout(() => { setText(s => s + cur[ci]); setCi(c => c + 1); }, speed)
        : setTimeout(() => setDel(true), pause);
    return () => clearTimeout(t);
  }, [text, ci, del, idx]);
  return <span>{text}<Cursor /></span>;
}

function Tag({ children, color = P.teal }) {
  return (
    <span style={{
      display: "inline-block", padding: "3px 10px", borderRadius: 20,
      fontSize: 11, fontFamily: "monospace", letterSpacing: "0.03em",
      background: `${color}18`, color, border: `1px solid ${color}30`,
    }}>{children}</span>
  );
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, vis] = useInView(0.05);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : "translateY(24px)",
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      ...style,
    }}>{children}</div>
  );
}

/* ── Navbar ──────────────────────────────────────────────────── */
function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const w = useWindowWidth();
  const mobile = w < 720;

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 50);
      const y = window.scrollY + 200;
      for (let i = NAV.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV[i]);
        if (el && el.offsetTop <= y) { setActive(NAV[i]); break; }
      }
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = id => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
      background: scrolled ? "rgba(9,9,11,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${P.border}` : "1px solid transparent",
      transition: "all 0.4s",
    }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>

        {/* Logo */}
        <button onClick={() => go("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, padding: 0 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: P.tealDim, border: `1px solid ${P.teal}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "monospace", fontSize: 12, color: P.teal, fontWeight: 700 }}>AK</span>
          </div>
          {!mobile && <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 16, color: P.text, fontWeight: 400, letterSpacing: "-0.01em" }}>Anil Kumar</span>}
        </button>

        {/* Desktop nav */}
        {!mobile && (
          <div style={{ display: "flex", gap: 4 }}>
            {NAV.map(n => (
              <button key={n} onClick={() => go(n)} style={{
                background: active === n ? P.tealDim : "transparent",
                border: `1px solid ${active === n ? P.teal + "30" : "transparent"}`,
                cursor: "pointer", padding: "6px 14px", borderRadius: 8,
                fontFamily: "monospace", fontSize: 12, letterSpacing: "0.05em",
                color: active === n ? P.teal : P.muted,
                textTransform: "capitalize", transition: "all 0.2s",
              }}
                onMouseEnter={e => { if (active !== n) e.currentTarget.style.color = P.text; }}
                onMouseLeave={e => { if (active !== n) e.currentTarget.style.color = P.muted; }}>
                {n}
              </button>
            ))}
          </div>
        )}

        {/* CTA + mobile toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <a href="mailto:vennapureddyanil456@gmail.com" style={{
            padding: "7px 18px", borderRadius: 8,
            background: P.teal, color: P.bg,
            textDecoration: "none", fontFamily: "monospace", fontWeight: 700,
            fontSize: 11, letterSpacing: "0.06em",
            boxShadow: `0 0 24px ${P.tealGlo}`,
          }}>Hire Me</a>
          {mobile && (
            <button onClick={() => setMenuOpen(o => !o)} style={{
              background: "transparent", border: `1px solid ${P.border}`,
              borderRadius: 8, padding: "6px 10px", cursor: "pointer", color: P.text, fontSize: 18,
            }}>{menuOpen ? "✕" : "☰"}</button>
          )}
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobile && menuOpen && (
        <div style={{ background: "rgba(9,9,11,0.98)", borderTop: `1px solid ${P.border}`, padding: "12px 20px" }}>
          {NAV.map(n => (
            <button key={n} onClick={() => go(n)} style={{
              display: "block", width: "100%", background: "transparent", border: "none",
              cursor: "pointer", padding: "11px 12px", borderRadius: 8, textAlign: "left",
              fontFamily: "monospace", fontSize: 13, textTransform: "capitalize",
              color: active === n ? P.teal : P.muted,
            }}>{n}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ── Hero ────────────────────────────────────────────────────── */
function Hero() {
  const w = useWindowWidth();
  const mobile = w < 720;
  const [m, setM] = useState(false);
  useEffect(() => { const t = setTimeout(() => setM(true), 100); return () => clearTimeout(t); }, []);

  const fade = (delay) => ({
    opacity: m ? 1 : 0,
    transform: m ? "none" : "translateY(20px)",
    transition: `all 0.8s ease ${delay}ms`,
  });

  return (
    <section id="home" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden",
      padding: `120px ${mobile ? 20 : 48}px 80px`,
    }}>
      {/* Glow orbs */}
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${P.teal}0A 0%, transparent 70%)`, top: "10%", left: "50%", transform: "translateX(-30%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${P.violet}08 0%, transparent 70%)`, bottom: "10%", left: "5%", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1140, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 800 }}>

          {/* Status badge */}
          <div style={{ ...fade(0), display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 20, background: P.tealDim, border: `1px solid ${P.teal}30`, marginBottom: 32 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: P.green, boxShadow: `0 0 10px ${P.green}`, flexShrink: 0 }} />
            <span style={{ fontFamily: "monospace", fontSize: 11, color: P.teal, letterSpacing: "0.15em", textTransform: "uppercase" }}>Available · May 2026</span>
          </div>

          {/* Name */}
          <h1 style={{
            ...fade(100),
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: `clamp(3rem, ${mobile ? "12vw" : "7vw"}, 6rem)`,
            fontWeight: 400, color: P.text, margin: "0 0 6px",
            letterSpacing: "-0.04em", lineHeight: 0.95,
          }}>
            Anil Kumar<br />
            <em style={{ color: P.teal, fontStyle: "italic" }}>Vennapureddy</em>
          </h1>

          {/* Typewriter role */}
          <div style={{ ...fade(200), fontFamily: "monospace", fontSize: mobile ? 14 : 18, color: P.muted, marginTop: 20, marginBottom: 20 }}>
            <span style={{ color: P.faint }}>$ </span>
            <Typewriter strings={["C++ Systems Engineer", "Linux Kernel Developer", "eBPF / Network Programmer", "Packet Capture Engineer"]} />
          </div>

          {/* Tagline */}
          <p style={{ ...fade(300), fontFamily: "Georgia, serif", fontSize: mobile ? 15 : 17, color: P.muted, lineHeight: 1.85, maxWidth: 520, marginBottom: 44 }}>
            Four years building at the <span style={{ color: P.text, fontStyle: "italic" }}>kernel level</span> — not on top of it.
            Real packet capture, eBPF programs, lock-free pipelines. Linux is home.
          </p>

          {/* CTAs */}
          <div style={{ ...fade(400), display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 72 }}>
            <a href="#projects" onClick={e => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }} style={{
              padding: "13px 28px", borderRadius: 10,
              background: P.teal, color: P.bg,
              textDecoration: "none", fontFamily: "monospace", fontWeight: 700,
              fontSize: 12, letterSpacing: "0.08em",
              boxShadow: `0 0 40px ${P.tealGlo}`,
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 8px 40px ${P.teal}50`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = `0 0 40px ${P.tealGlo}`; }}>
              VIEW PROJECTS →
            </a>
            <a href="https://github.com/Anilkumar64" target="_blank" rel="noopener noreferrer" style={{
              padding: "13px 28px", borderRadius: 10,
              background: "transparent", color: P.text,
              border: `1px solid ${P.border}`,
              textDecoration: "none", fontFamily: "monospace",
              fontWeight: 600, fontSize: 12, letterSpacing: "0.08em",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = P.teal + "50"; e.currentTarget.style.color = P.teal; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = P.border; e.currentTarget.style.color = P.text; }}>
              GITHUB ↗
            </a>
          </div>

          {/* Stats row */}
          <div style={{ ...fade(550), display: "grid", gridTemplateColumns: `repeat(${mobile ? 2 : 4}, 1fr)`, gap: 0, paddingTop: 36, borderTop: `1px solid ${P.border}` }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ paddingRight: 24, borderRight: i < STATS.length - 1 ? `1px solid ${P.border}` : "none", paddingLeft: i > 0 ? 24 : 0 }}>
                <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: mobile ? 28 : 38, color: P.teal, letterSpacing: "-0.04em", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: P.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── About ───────────────────────────────────────────────────── */
function About() {
  const w = useWindowWidth();
  const mobile = w < 860;
  const TIMELINE = [
    { y: "2022", t: "Started B.Tech CSE (AI & ML) at ITM University Gwalior" },
    { y: "2023", t: "Built Tiny Shell — first deep C++ + Linux project" },
    { y: "2024 Q1", t: "TCP/IP Stack Visualizer with live libpcap NIC capture" },
    { y: "2024 Q3", t: "Kernel Traffic Analyzer — eBPF/XDP kernel hooks" },
    { y: "2025 Q1", t: "IDS project — kernel module + eBPF + ML pipeline" },
    { y: "2025", t: "Internet Society internship — live network diagnostics" },
    { y: "2026", t: "Graduated May 2026 — open to systems / network roles" },
  ];
  return (
    <section id="about" style={{ background: P.surface, padding: `120px ${mobile ? 20 : 48}px` }}>
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ fontFamily: "monospace", fontSize: 11, color: P.teal, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 16 }}>01 / About</div>
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(2.2rem,5vw,3.5rem)", fontWeight: 400, color: P.text, margin: "0 0 64px", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
            Who I Am
          </h2>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1.1fr 0.9fr", gap: mobile ? 60 : 100, alignItems: "start" }}>
          <div>
            <FadeIn delay={100}>
              <p style={{ fontFamily: "Georgia,serif", fontSize: mobile ? 15 : 17, color: P.muted, lineHeight: 1.9, marginBottom: 20 }}>
                Systems programmer, graduated May 2026 from ITM University, Gwalior — B.Tech CSE (AI & ML), CGPA 8.0.
              </p>
              <p style={{ fontFamily: "Georgia,serif", fontSize: mobile ? 15 : 17, color: P.muted, lineHeight: 1.9, marginBottom: 48 }}>
                Four years of hands-on systems work — not tutorials, not toy projects. Written eBPF kernel programs, built a live IDS handling 50K+ pkt/sec, gone deep into the Linux network stack.
                <span style={{ color: P.text, fontStyle: "italic" }}> The kernel is not a black box.</span>
              </p>
            </FadeIn>

            {/* Timeline */}
            <FadeIn delay={200}>
              <div style={{ borderLeft: `1px solid ${P.border}`, paddingLeft: 28 }}>
                {TIMELINE.map((item, i) => (
                  <div key={i} style={{ marginBottom: 22, position: "relative" }}>
                    <div style={{
                      position: "absolute", left: -33, top: 6,
                      width: 9, height: 9, borderRadius: "50%",
                      background: i === TIMELINE.length - 1 ? P.teal : P.faint,
                      boxShadow: i === TIMELINE.length - 1 ? `0 0 14px ${P.teal}` : "none",
                    }} />
                    <div style={{ fontFamily: "monospace", fontSize: 10, color: P.teal, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>{item.y}</div>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: 13.5, color: P.muted, lineHeight: 1.65 }}>{item.t}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Education card */}
            <FadeIn delay={150}>
              <div style={{ background: P.card, border: `1px solid ${P.border}`, borderLeft: `2px solid ${P.teal}`, borderRadius: 12, padding: 28 }}>
                <div style={{ fontFamily: "monospace", fontSize: 9, color: P.teal, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>// Education</div>
                <div style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: 19, fontWeight: 400, color: P.text, marginBottom: 4 }}>B.Tech — CSE (AI & ML)</div>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 14, color: P.muted, marginBottom: 2 }}>ITM University, Gwalior</div>
                <div style={{ fontFamily: "monospace", fontSize: 11, color: P.faint, marginBottom: 20 }}>Aug 2022 – May 2026</div>
                <div style={{ display: "inline-block", padding: "7px 18px", background: P.tealDim, border: `1px solid ${P.teal}30`, borderRadius: 8, fontFamily: "monospace", fontSize: 20, fontWeight: 700, color: P.teal }}>8.0 CGPA</div>
              </div>
            </FadeIn>

            {/* Internship */}
            <FadeIn delay={220}>
              <div style={{ background: P.card, border: `1px solid ${P.border}`, borderLeft: `2px solid ${P.sky}`, borderRadius: 12, padding: 28 }}>
                <div style={{ fontFamily: "monospace", fontSize: 9, color: P.sky, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>// Internship</div>
                <div style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: 17, fontWeight: 400, color: P.text, marginBottom: 4 }}>Internet Society (ISOC)</div>
                <div style={{ fontFamily: "monospace", fontSize: 12, color: P.sky, marginBottom: 14 }}>Networking Contributor</div>
                <p style={{ fontFamily: "Georgia,serif", fontSize: 13.5, color: P.muted, lineHeight: 1.75, margin: 0 }}>
                  Deep packet inspection, TCP/IP diagnostics, iptables configuration, Bash automation — reduced manual monitoring ~30%.
                </p>
              </div>
            </FadeIn>

            {/* Currently studying */}
            <FadeIn delay={300}>
              <div style={{ background: P.card, border: `1px solid ${P.border}`, borderLeft: `2px solid ${P.violet}`, borderRadius: 12, padding: 28 }}>
                <div style={{ fontFamily: "monospace", fontSize: 9, color: P.violet, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>// Currently Studying</div>
                {["CCNA (in progress)", "Linux Kernel Dev — Corbet, Rubini", "Advanced eBPF / XDP", "DPDK — kernel-bypass", "Cilium / Kubernetes eBPF"].map(item => (
                  <div key={item} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                    <span style={{ color: P.teal, fontFamily: "monospace", fontSize: 12, flexShrink: 0, marginTop: 1 }}>→</span>
                    <span style={{ fontFamily: "monospace", fontSize: 12, color: P.muted }}>{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Skills ──────────────────────────────────────────────────── */
function Skills() {
  const w = useWindowWidth();
  const cols = w < 600 ? 1 : w < 960 ? 2 : 3;
  return (
    <section id="skills" style={{ background: P.bg, padding: `120px ${w < 720 ? 20 : 48}px` }}>
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ fontFamily: "monospace", fontSize: 11, color: P.teal, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 16 }}>02 / Skills</div>
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(2.2rem,5vw,3.5rem)", fontWeight: 400, color: P.text, margin: "0 0 64px", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
            Technical Arsenal
          </h2>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 16 }}>
          {SKILLS.map((cat, i) => (
            <FadeIn key={cat.cat} delay={i * 60}>
              <div style={{
                background: P.card, border: `1px solid ${P.border}`,
                borderTop: `2px solid ${cat.color}`, borderRadius: 12,
                padding: "24px 22px", height: "100%", boxSizing: "border-box",
                transition: "transform 0.25s, border-color 0.25s, box-shadow 0.25s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.borderColor = `${cat.color}30`; e.currentTarget.style.boxShadow = `0 24px 50px rgba(0,0,0,0.5)`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = P.border; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: cat.color, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 18 }}>{cat.cat}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {cat.items.map(it => <Tag key={it} color={cat.color}>{it}</Tag>)}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Projects ────────────────────────────────────────────────── */
function Projects() {
  const [active, setActive] = useState(null);
  const w = useWindowWidth();
  const mobile = w < 720;
  return (
    <section id="projects" style={{ background: P.surface, padding: `120px ${mobile ? 20 : 48}px` }}>
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ fontFamily: "monospace", fontSize: 11, color: P.teal, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 16 }}>03 / Projects</div>
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(2.2rem,5vw,3.5rem)", fontWeight: 400, color: P.text, margin: "0 0 12px", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
            What I've Built
          </h2>
          <p style={{ fontFamily: "Georgia,serif", fontSize: 15, color: P.muted, marginBottom: 64 }}>Click any project to see the technical highlights.</p>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {PROJECTS.map((p, i) => {
            const isOpen = active === i;
            return (
              <FadeIn key={i} delay={i * 50}>
                <div
                  onClick={() => setActive(isOpen ? null : i)}
                  style={{
                    background: P.card, border: `1px solid ${isOpen ? p.accent + "40" : P.border}`,
                    borderRadius: 14, overflow: "hidden", cursor: "pointer",
                    transition: "border-color 0.25s, box-shadow 0.25s",
                    boxShadow: isOpen ? `0 0 0 1px ${p.accent}20, 0 24px 50px rgba(0,0,0,0.5)` : "none",
                  }}>

                  {/* Top accent */}
                  <div style={{ height: 2, background: `linear-gradient(90deg, ${p.accent}, ${p.accent}00)` }} />

                  {/* Header row */}
                  <div style={{ padding: mobile ? "20px 20px" : "22px 28px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                    {/* Number */}
                    <span style={{ fontFamily: "monospace", fontSize: 11, color: P.faint, flexShrink: 0 }}>/{p.id}</span>

                    {/* Title */}
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: mobile ? 16 : 19, color: P.text, fontWeight: 400, lineHeight: 1.2, marginBottom: 4 }}>{p.title}</div>
                      <div style={{ fontFamily: "monospace", fontSize: 10, color: P.muted, letterSpacing: "0.1em" }}>{p.tag} · {p.year}</div>
                    </div>

                    {/* Stack (desktop only) */}
                    {!mobile && (
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end", maxWidth: 380 }}>
                        {p.stack.map(s => <Tag key={s} color={p.accent}>{s}</Tag>)}
                      </div>
                    )}

                    {/* Toggle */}
                    <div style={{ color: isOpen ? p.accent : P.faint, fontSize: 20, transition: "transform 0.3s, color 0.3s", transform: isOpen ? "rotate(45deg)" : "none", flexShrink: 0 }}>+</div>
                  </div>

                  {/* Expanded */}
                  <div style={{ maxHeight: isOpen ? 600 : 0, overflow: "hidden", transition: "max-height 0.45s cubic-bezier(0.4,0,0.2,1)" }}>
                    <div style={{ padding: mobile ? "0 20px 28px" : "0 28px 28px", borderTop: `1px solid ${P.border}`, paddingTop: 24 }}>
                      <p style={{ fontFamily: "Georgia,serif", fontSize: 14, color: P.muted, lineHeight: 1.8, marginBottom: 20 }}>{p.summary}</p>

                      {mobile && (
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
                          {p.stack.map(s => <Tag key={s} color={p.accent}>{s}</Tag>)}
                        </div>
                      )}

                      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: "10px 20px", marginBottom: 24 }}>
                        {p.highlights.map((h, j) => (
                          <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                            <span style={{ color: p.accent, fontFamily: "monospace", fontSize: 10, flexShrink: 0, marginTop: 4 }}>▸</span>
                            <span style={{ fontFamily: "Georgia,serif", fontSize: 13, color: P.muted, lineHeight: 1.7 }}>{h}</span>
                          </div>
                        ))}
                      </div>

                      <a href={p.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        padding: "8px 20px", borderRadius: 8,
                        border: `1px solid ${p.accent}40`, background: `${p.accent}10`,
                        color: p.accent, textDecoration: "none",
                        fontFamily: "monospace", fontSize: 11, letterSpacing: "0.05em",
                        transition: "background 0.2s, box-shadow 0.2s",
                      }}
                        onMouseEnter={e => { e.currentTarget.style.background = `${p.accent}20`; e.currentTarget.style.boxShadow = `0 0 20px ${p.accent}30`; }}
                        onMouseLeave={e => { e.currentTarget.style.background = `${p.accent}10`; e.currentTarget.style.boxShadow = "none"; }}>
                        ⎇ View on GitHub →
                      </a>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Contact ─────────────────────────────────────────────────── */
function Contact() {
  const w = useWindowWidth();
  const mobile = w < 860;
  const links = [
    { label: "Email", val: "vennapureddyanil456@gmail.com", href: "mailto:vennapureddyanil456@gmail.com", color: P.teal },
    { label: "Phone", val: "+91 77250 05752", href: "tel:+917725005752", color: P.sky },
    { label: "LinkedIn", val: "AnilKumar — LinkedIn ↗", href: "https://www.linkedin.com/in/vennapu-reddy-anil-kumar-8782a521a/", color: P.violet },
    { label: "GitHub", val: "Anilkumar64 ↗", href: "https://github.com/Anilkumar64", color: P.gold },
    { label: "Location", val: "Gwalior, MP · Open to relocate", href: null, color: P.green },
    { label: "Status", val: "Available immediately", href: null, color: P.green },
  ];
  return (
    <section id="contact" style={{ background: P.bg, padding: `120px ${mobile ? 20 : 48}px` }}>
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ fontFamily: "monospace", fontSize: 11, color: P.teal, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 16 }}>04 / Contact</div>
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(2.2rem,5vw,3.5rem)", fontWeight: 400, color: P.text, margin: "0 0 64px", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
            Let's Talk
          </h2>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: mobile ? 60 : 100, alignItems: "start" }}>
          <FadeIn delay={100}>
            <p style={{ fontFamily: "Georgia,serif", fontSize: mobile ? 15 : 17, color: P.muted, lineHeight: 1.9, marginBottom: 40, maxWidth: 460 }}>
              Looking for <span style={{ color: P.text, fontStyle: "italic" }}>Systems / C++ / Network Engineering</span> roles at companies where depth actually matters. Ready to join immediately.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
              <a href="mailto:vennapureddyanil456@gmail.com" style={{
                padding: "13px 28px", borderRadius: 10,
                background: P.teal, color: P.bg,
                textDecoration: "none", fontFamily: "monospace",
                fontWeight: 700, fontSize: 12, letterSpacing: "0.06em",
                boxShadow: `0 0 36px ${P.tealGlo}`, transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; }}>
                SEND EMAIL →
              </a>
              <a href="https://github.com/Anilkumar64" target="_blank" rel="noopener noreferrer" style={{
                padding: "13px 28px", borderRadius: 10,
                background: "transparent", color: P.text,
                border: `1px solid ${P.border}`,
                textDecoration: "none", fontFamily: "monospace",
                fontWeight: 600, fontSize: 12, letterSpacing: "0.06em",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = P.teal + "50"; e.currentTarget.style.color = P.teal; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = P.border; e.currentTarget.style.color = P.text; }}>
                GITHUB ↗
              </a>
            </div>

            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "14px 20px", background: P.card, borderRadius: 10, border: `1px solid ${P.border}`, borderLeft: `2px solid ${P.green}` }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: P.green, flexShrink: 0, boxShadow: `0 0 12px ${P.green}` }} />
              <div>
                <div style={{ fontFamily: "monospace", fontSize: 13, color: P.text }}>Open to opportunities</div>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: P.muted, marginTop: 2 }}>Graduated May 2026 · India</div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {links.map(l => (
                <div key={l.label} style={{ background: P.card, border: `1px solid ${P.border}`, borderRadius: 12, padding: "18px 18px", transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${l.color}40`; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.4)`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = P.border; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ fontFamily: "monospace", fontSize: 9, color: l.color, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 8 }}>{l.label}</div>
                  {l.href ? (
                    <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{ fontFamily: "monospace", fontSize: 11, color: P.muted, textDecoration: "none", wordBreak: "break-all", transition: "color 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.color = l.color}
                      onMouseLeave={e => e.currentTarget.style.color = P.muted}>{l.val}</a>
                  ) : (
                    <span style={{ fontFamily: "monospace", fontSize: 11, color: P.muted }}>{l.val}</span>
                  )}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: P.surface, borderTop: `1px solid ${P.border}`, padding: "28px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
      <div style={{ fontFamily: "monospace", fontSize: 11, color: P.faint }}>
        <span style={{ fontFamily: "'DM Serif Display',Georgia,serif", color: P.teal, fontStyle: "italic" }}>Anil Kumar Vennapureddy</span>
        <span> · © 2026</span>
      </div>
      <div style={{ fontFamily: "monospace", fontSize: 10, color: P.faint, letterSpacing: "0.08em" }}>
        C++ · Linux · eBPF · Open to work
      </div>
    </footer>
  );
}

/* ── App ─────────────────────────────────────────────────────── */
export default function App() {
  useEffect(() => {
    // Load Google Font
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    document.body.style.margin = "0";
    document.body.style.background = P.bg;
    document.body.style.overflowX = "hidden";
    document.body.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div style={{ fontFamily: "Georgia,serif", background: P.bg, color: P.text }}>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}