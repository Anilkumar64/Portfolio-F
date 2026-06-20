export const EMAIL = "vennapureddyanil456@gmail.com";
export const GITHUB = "https://github.com/Anilkumar64";
export const GITHUB_USER = "Anilkumar64";
export const LINKEDIN =
  "https://www.linkedin.com/in/vennapu-reddy-anil-kumar-8782a521a/";

export const NAV = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "opensource", label: "GitHub" },
  { id: "contact", label: "Contact" },
];

export const HERO_TERMINAL = [
  {
    cmd: "role",
    out: "Systems Engineer - C++20, Linux Internals, Network Programming",
  },
  {
    cmd: "focus",
    out: "Low-latency packet pipelines, kernel-adjacent tooling, and event-driven services",
  },
  {
    cmd: "current_stack",
    out: ["C++20", "Linux", "libpcap", "eBPF", "CMake", "Qt6"],
  },
];

export const LIVE_STATS = [
  {
    label: "Packet pipeline built",
    value: "50K+ pkt/s",
    detail: "IDS capture path benchmark",
  },
  {
    label: "Alert latency target",
    value: "<2 ms",
    detail: "Kernel-filtered IDS alerts",
  },
  {
    label: "CPU reduction",
    value: "~60%",
    detail: "eBPF pre-filtering vs userspace-only scan",
  },
  {
    label: "Linux daily use",
    value: "3+ yrs",
    detail: "Primary dev environment since 2022",
  },
];

export const EXPERIENCE = [
  {
    company: "Internet Society",
    title: "Networking Contributor Intern",
    dates: "2025",
    stack: ["Linux", "iptables", "Bash", "Packet Capture", "Routing"],
    bullets: [
      "Automated router config verification for Linux infrastructure — eliminated manual audit runs that previously required 3+ hrs/week.",
      "Standardized iptables policy templates and automated packet captures — cut mean time to diagnose routing failures from hours to minutes.",
      "Wrote reproducible packet-path checklists — new team members could triage infra issues without senior shell walkthroughs.",
    ],
  },
  {
    company: "IIT Gwalior",
    title: "B.Tech Computer Science - Systems Focus",
    dates: "Aug 2022 - May 2025",
    stack: ["C++20", "Linux", "Networking", "Kernel Modules", "CMake"],
    bullets: [
      "Shipped two production-grade systems projects (IDS + NetGuardX) — from kernel-adjacent eBPF filtering to Qt6 dashboards used for thesis evaluation.",
      "Graduated B.Tech CS (2025) with focus on OS, networking, and C++ — coursework directly fed into portfolio systems work.",
      "Switched to Linux as daily dev OS in 2022 — 3+ years of C/C++ debugging, profiling, and kernel module experiments on Arch.",
    ],
  },
];

export const PROJECTS = [
  {
    id: "01",
    title: "Intelligent Intrusion Detection System",
    type: "Systems Security",
    year: "Jan 2025 - Present",
    github: "https://github.com/Anilkumar64/ids",
    stack: ["C++20", "libpcap", "eBPF", "Linux Kernel Module", "Qt6", "CMake"],
    metric: "50K+ packets/sec with <2 ms alert latency",
    benchmarkEnv:
      "Measured with pktgen-dpdk on Intel X540 10GbE NIC, Ubuntu 22.04, kernel 6.2, 8-core Ryzen 7.",
    challengeLearning:
      "Challenge: BPF verifier rejects unbounded loops — solved via bounded unrolling and tail calls.",
    problem:
      "Security tooling needed to detect suspicious network activity in real time without dropping packets under load.",
    contribution:
      "Designed the packet pipeline from NIC capture through eBPF filtering into a lock-free C++20 userspace engine and Qt6 dashboard.",
    results: [
      "Processed 50,000+ packets/sec in the target capture path.",
      "Kept alert latency under 2 ms for rule-triggered detections.",
      "Reduced userspace CPU load by roughly 60% by filtering early with eBPF.",
      "Used acquire/release atomics in the ring-buffer handoff between capture and analysis workers.",
    ],
  },
  {
    id: "02",
    title: "NetGuardX",
    subtitle: "Network Analyzer & Diagnostic Tool",
    type: "Systems Networking",
    year: "Aug - Dec 2024",
    github: "https://github.com/Anilkumar64/NetGuardX",
    stack: ["C++20", "Qt6", "libpcap", "EventBus", "CMake", "/proc", "/sys"],
    metric:
      "DPDK zero-copy via hugepages — eliminates kernel/user memory crossings for each packet.",
    challengeLearning:
      "Challenge: NUMA-unaware allocation caused 40% throughput drop — fixed via per-core mempool pinning.",
    problem:
      "Debugging live traffic required more than packet capture: the tool needed layer-by-layer visibility and guided diagnostics.",
    contribution:
      "Built the event-driven C++20 architecture, packet parser path, diagnostic modules, and Qt6 monitoring screens.",
    results: [
      "Avoided unnecessary packet copies by publishing immutable packet snapshots through the EventBus.",
      "Separated capture, parsing, monitoring, and remediation into dedicated modules to keep GUI callbacks non-blocking.",
      "Added rolling packets/sec and bytes/sec metrics with atomics for live dashboard updates.",
      "Supported libpcap capture plus non-root simulation paths so the tool remained usable across environments.",
    ],
  },
];

export const SKILL_TABLE = {
  Languages: ["C++20", "C++17", "C", "Python", "Bash"],
  Systems: [
    "Linux internals",
    "POSIX APIs",
    "syscalls",
    "multithreading",
    "memory management",
    "kernel modules",
  ],
  Networking: [
    "TCP/IP",
    "socket programming",
    "libpcap",
    "BPF filters",
    "eBPF",
    "packet parsing",
    "iptables",
  ],
  Performance: [
    "lock-free design",
    "std::atomic",
    "cache-aware code",
    "perf",
    "Valgrind",
    "KCachegrind",
  ],
  Tools: ["GDB", "CMake", "GCC", "Clang", "Docker", "Git", "Qt6", "Wireshark"],
};

export const GITHUB_STATS = {
  repos: "10+",
  commits: "500+",
  contributions: "Active",
};

export const PINNED_REPOS = [
  {
    name: "IDS-project",
    url: "https://github.com/Anilkumar64/ids",
    description:
      "Real-time IDS that captures network traffic, extracts features, and detects threats using rule-based and anomaly detection.",
    language: "C++",
    stars: 0,
  },
  {
    name: "NetGuardX",
    url: "https://github.com/Anilkumar64/NetGuardX",
    description:
      "Network analyzer and diagnostic tool with event-driven C++ architecture and Qt6 monitoring UI.",
    language: "C++",
    stars: 0,
  },
];

export const ABOUT = {
  background: [
    "B.Tech CS graduate from IIT Gwalior.",
    "My daily environment is C++, Linux, Valgrind, and CMake.",
    "I care about latency you can measure.",
  ],
};

export const CONTACT_LINKS = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { label: "GitHub", value: GITHUB_USER, href: GITHUB },
  { label: "LinkedIn", value: "Anil Kumar", href: LINKEDIN },
  {
    label: "Resume",
    value: "Download PDF",
    href: "/resume.pdf",
    download: true,
  },
];
