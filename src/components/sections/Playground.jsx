import React, { useState, useEffect, useRef } from "react";
import Sec from "../common/Sec";
import Wrap from "../common/Wrap";
import Heading from "../common/Heading";
import { PROJECTS, SKILL_CATS, EMAIL, GITHUB } from "../../constants/portfolioData";
import "./Playground.css";

export default function Playground() {
  const [activeTab, setActiveTab] = useState("terminal");

  // Terminal State
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState([
    { type: "sys", content: "AnilOS v2026.05 loaded. CPU 0.04% // eth0 status: UP" },
    { type: "sys", content: "Type 'help' to inspect available system commands, or 'game' to test security firewall." },
    { type: "blank", content: "" }
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Firewall Game State
  const [isGameActive, setIsGameActive] = useState(false);
  const [isGameIntro, setIsGameIntro] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [gameCpuLoad, setGameCpuLoad] = useState(10);
  const [gameThreats, setGameThreats] = useState([]);
  const [gameLogs, setGameLogs] = useState([]);
  const threatIdCounter = useRef(0);
  const gameIntervalRef = useRef(null);

  // Packet Simulator State
  const [selectedProtocol, setSelectedProtocol] = useState("TCP_SYN"); // TCP_SYN, HTTP_GET, DNS_QUERY, DDOS
  const [ebpfEnabled, setEbpfEnabled] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animStage, setAnimStage] = useState(-1); // -1: idle, 0: NIC, 1: eBPF, 2: kmod, 3: userspace, 4: alert
  const [activeHeaderInfo, setActiveHeaderInfo] = useState(null);
  const [pcapLogs, setPcapLogs] = useState([
    "08:31:00.000000 tracepoint:init: BPF filter engine enabled on device eth0",
    "08:31:00.001050 tracepoint:kmod: NetGuardX kernel hooks registered successfully"
  ]);
  const [simulatedCpuLoad, setSimulatedCpuLoad] = useState(4);

  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);
  const pcapLogEndRef = useRef(null);

  // Auto Scroll Terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory, isGameActive, gameThreats]);

  // Auto Scroll PCAP
  useEffect(() => {
    pcapLogEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [pcapLogs]);

  // Handle Tab Change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "terminal") {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const executeCommand = (cmdStr) => {
    const fullCmd = cmdStr.trim();
    if (!fullCmd) return;

    // Add to raw history
    setCommandHistory(prev => [fullCmd, ...prev]);
    setHistoryIndex(-1);

    const parts = fullCmd.split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    let output = [];

    // Print command input line
    output.push({ type: "prompt", content: `anil@vennapureddy:~$ ${fullCmd}` });

    switch (cmd) {
      case "help":
        output.push({ type: "success", content: "Systems Shell Simulator Core Commands:" });
        output.push({ type: "text", content: "  help              Display active commands menu" });
        output.push({ type: "text", content: "  neofetch          Render system specifications and statistics" });
        output.push({ type: "text", content: "  about             View bio summary of Vennapureddy Anil" });
        output.push({ type: "text", content: "  skills            View technical skill metrics (progress meters)" });
        output.push({ type: "text", content: "  projects          List repositories/projects" });
        output.push({ type: "text", content: "  cat <project>     Inspect detailed code block configurations (e.g. 'cat ids')" });
        output.push({ type: "text", content: "  ping <host>       Test packet transmission latency (e.g. 'ping google.com')" });
        output.push({ type: "text", content: "  ebpf              Trace live kernel hook statistics feed" });
        output.push({ type: "text", content: "  game / firewall   Launch the Firewall Threat Mitigator mini-game" });
        output.push({ type: "text", content: "  clear             Wipe terminal buffer" });
        break;

      case "clear":
        setTerminalHistory([]);
        return;

      case "neofetch":
        output.push({
          type: "raw",
          content: `   _               _ _  ___ ___ 
  / \\   _ __   ___| | |/ _ \\_ _|
 / _ \\ | '_ \\ / _ \\ | | | | | | 
/ ___ \\| | | |  __/ | | |_| | | 
/_/   \\_\\_| |_|\\___|_|_|\\___/___|
`
        });
        output.push({ type: "text", content: `OS: AnilOS 6.12-ebpf-x86_64` });
        output.push({ type: "text", content: `Host: Vennapureddy Brain v1.0` });
        output.push({ type: "text", content: `Kernel: Linux v6.12-systems` });
        output.push({ type: "text", content: `Uptime: 24 years (approx)` });
        output.push({ type: "text", content: `GPA Index: 8.0 CGPA (ITM University Gwalior)` });
        output.push({ type: "text", content: `Dev Status: Graduated (Ready for System Roles)` });
        output.push({ type: "text", content: `Core Stack: C++20 · eBPF · Linux Kernel · TCP/IP` });
        break;

      case "about":
        output.push({ type: "text", content: "System Bio Profile:" });
        output.push({ type: "text", content: "Anil Kumar Vennapureddy is a low-level systems developer focusing on custom Linux kernel modules, network bypass packet captures (eBPF/XDP), and low-latency multithreaded routing engines in C++20." });
        output.push({ type: "text", content: "Open for Systems Engineer, Network Developer, and Backend Software Engineering roles." });
        break;

      case "skills":
        output.push({ type: "success", content: "TECHNICAL ARSENAL DEPTH:" });
        SKILL_CATS.forEach((cat) => {
          const bar = "=".repeat(Math.ceil(cat.items.length * 1.5)).padEnd(15, ".");
          output.push({
            type: "text",
            content: `  ${cat.cat.padEnd(20)} [${bar}] ${cat.items.length * 10}% depth`
          });
        });
        break;

      case "projects":
        output.push({ type: "success", content: "Available codebases in /etc/projects/:" });
        PROJECTS.forEach((p) => {
          output.push({
            type: "text",
            content: `  - ${p.short.toLowerCase().padEnd(15)} : ${p.title} (${p.stack.slice(0, 3).join(", ")})`
          });
        });
        output.push({ type: "text", content: "\nType 'cat <short_name>' (e.g., 'cat ids') to inspect files." });
        break;

      case "cat":
        if (!args[0]) {
          output.push({ type: "error", content: "Error: No target file declared. Usage: 'cat <short_name>'" });
        } else {
          const target = args[0].toLowerCase();
          const proj = PROJECTS.find(
            (p) => p.short.toLowerCase() === target || p.id === target
          );
          if (proj) {
            output.push({ type: "success", content: `// File: /etc/projects/${proj.short.toLowerCase()}.conf` });
            output.push({ type: "text", content: `Title: ${proj.title}` });
            output.push({ type: "text", content: `Status: Completed (${proj.year})` });
            output.push({ type: "text", content: `Stack: ${proj.stack.join(" | ")}` });
            output.push({ type: "text", content: `Architecture: ${proj.desc}` });
            output.push({ type: "text", content: "Highlights:" });
            proj.bullets.forEach((b) => {
              output.push({ type: "text", content: `  * ${b}` });
            });
          } else {
            output.push({ type: "error", content: `Error: File '/etc/projects/${target}' not found.` });
          }
        }
        break;

      case "ping":
        if (!args[0]) {
          output.push({ type: "error", content: "Usage: ping <host_ip_or_domain>" });
        } else {
          const host = args[0];
          output.push({ type: "text", content: `PING ${host} (127.0.0.1) 56(84) bytes of data.` });
          output.push({ type: "text", content: `64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.082 ms` });
          output.push({ type: "text", content: `64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.114 ms` });
          output.push({ type: "text", content: `64 bytes from 127.0.0.1: icmp_seq=3 ttl=64 time=0.075 ms` });
          output.push({ type: "success", content: `--- ${host} ping statistics ---` });
          output.push({ type: "text", content: `3 packets transmitted, 3 received, 0% packet loss, time 2005ms` });
          output.push({ type: "text", content: `rtt min/avg/max/mdev = 0.075/0.090/0.114/0.017 ms` });
        }
        break;

      case "theme":
        output.push({ type: "text", content: "Portfolio uses a fixed clean layout. Theme switching is disabled." });
        break;

      case "ebpf":
        output.push({ type: "success", content: "Listening on eBPF Kernel tracepoints... Press [Ctrl+C] (or type 'clear'/'exit') to stop." });
        output.push({ type: "text", content: "08:32:01.0124 sys_enter_write: PID 4591 [chrome] fd=5 size=1024" });
        output.push({ type: "text", content: "08:32:02.1904 tc_ingress_packet: INGRESS hook triggered. 64 bytes captured." });
        output.push({ type: "text", content: "08:32:03.5824 kfree_skb: Packet dropped by kernel network stack. Protocol 0x800." });
        output.push({ type: "text", content: "08:32:05.1009 sys_enter_connect: PID 1205 [tinyshell] socket_fd=12 addr=127.0.0.1" });
        break;

      case "game":
      case "firewall":
        setIsGameIntro(true);
        setTerminalInput("");
        return;

      default:
        // Shortcut checks (e.g. if they typed a project short name directly)
        const projShortcut = PROJECTS.find((p) => p.short.toLowerCase() === cmd);
        if (projShortcut) {
          output.push({ type: "success", content: `// File: /etc/projects/${projShortcut.short.toLowerCase()}.conf` });
          output.push({ type: "text", content: `Title: ${projShortcut.title}` });
          output.push({ type: "text", content: `Stack: ${projShortcut.stack.join(" | ")}` });
          output.push({ type: "text", content: `Architecture: ${projShortcut.desc}` });
          projShortcut.bullets.forEach((b) => {
            output.push({ type: "text", content: `  * ${b}` });
          });
        } else {
          output.push({ type: "error", content: `bash: command not found: ${cmd}. Type 'help' for support.` });
        }
        break;
    }

    setTerminalHistory((prev) => [...prev, ...output, { type: "blank", content: "" }]);
    setTerminalInput("");
  };

  // Keyboard navigation for command history
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeCommand(terminalInput);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIndex(nextIdx);
          setTerminalInput(commandHistory[nextIdx]);
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIdx = historyIndex - 1;
      if (nextIdx >= 0) {
        setHistoryIndex(nextIdx);
        setTerminalInput(commandHistory[nextIdx]);
      } else {
        setHistoryIndex(-1);
        setTerminalInput("");
      }
    }
  };

  // FIREWALL GAME LOGIC
  const startGame = () => {
    setIsGameIntro(false);
    setIsGameActive(true);
    setGameScore(0);
    setGameCpuLoad(15);
    setGameThreats([]);
    setGameLogs([{ time: "0s", content: "Firewall protection initialized. Listening for threats on port 80..." }]);
    threatIdCounter.current = 0;

    // Start Game Interval
    if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);

    gameIntervalRef.current = setInterval(() => {
      setGameCpuLoad((prevLoad) => {
        // CPU load creep
        let newLoad = prevLoad + 3;

        // Increase CPU for remaining active threats
        setGameThreats((threats) => {
          threats.forEach((t) => {
            newLoad += 4; // Each unblocked threat drains CPU
          });

          // Randomly spawn threat
          if (Math.random() > 0.35 && threats.length < 5) {
            threatIdCounter.current += 1;
            const newThreat = {
              id: threatIdCounter.current,
              ip: `192.168.1.${100 + Math.floor(Math.random() * 150)}`,
              type: Math.random() > 0.5 ? "SYN Flood" : "Port Scan",
              severity: Math.random() > 0.6 ? "CRITICAL" : "HIGH",
              timer: 6 // 6 seconds to block
            };
            threats.push(newThreat);
            setGameLogs((prevLogs) => [
              ...prevLogs.slice(-6),
              { time: "ALERT", content: `Threat detected from ${newThreat.ip} (${newThreat.type})!` }
            ]);
          }

          // Count down threat timers, damage CPU if timer hit 0
          const updatedThreats = threats.map((t) => ({ ...t, timer: t.timer - 1 })).filter((t) => {
            if (t.timer <= 0) {
              newLoad += 18; // Heavy impact
              setGameLogs((prevLogs) => [
                ...prevLogs.slice(-6),
                { time: "HIT", content: `Threat bypass from ${t.ip}! CPU spikes +18%` }
              ]);
              return false; // Remove
            }
            return true;
          });

          return updatedThreats;
        });

        if (newLoad >= 100) {
          // Crash!
          clearInterval(gameIntervalRef.current);
          setIsGameActive(false);
          setTerminalHistory((prev) => [
            ...prev,
            { type: "prompt", content: `anil@vennapureddy:~$ firewall` },
            { type: "error", content: "==============================================" },
            { type: "error", content: "!!! FIREWALL CRITICAL FAIL: CPU EXHAUSTED !!!" },
            { type: "error", content: `Intrusions Blocked: ${gameScore}` },
            { type: "error", content: "System core temperature limit reached. Kernel panic." },
            { type: "error", content: "==============================================" },
            { type: "blank", content: "" }
          ]);
        }

        return Math.min(newLoad, 100);
      });
    }, 1000);
  };

  const blockThreat = (id) => {
    setGameThreats((prevThreats) => {
      const threat = prevThreats.find((t) => t.id === id);
      if (threat) {
        setGameScore((score) => score + 1);
        setGameCpuLoad((load) => Math.max(load - 8, 10)); // Relieve CPU
        setGameLogs((prevLogs) => [
          ...prevLogs.slice(-6),
          { time: "DROP", content: `Successfully dropped payload from ${threat.ip}` }
        ]);
        return prevThreats.filter((t) => t.id !== id);
      }
      return prevThreats;
    });
  };

  const stopGame = () => {
    if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
    setIsGameActive(false);
    setIsGameIntro(false);
    setTerminalHistory((prev) => [
      ...prev,
      { type: "prompt", content: "anil@vennapureddy:~$ exit" },
      { type: "success", content: `Firewall test session terminated. Intrusions Mitigated: ${gameScore}.` },
      { type: "blank", content: "" }
    ]);
  };

  useEffect(() => {
    return () => {
      if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
    };
  }, []);

  // PACKET SIMULATOR ANIMATION CORE
  const injectPacket = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setAnimStage(0);

    // Initial PCAP Log lines
    const timestamp = new Date().toLocaleTimeString();
    let newLogs = [];
    const srcIP = selectedProtocol === "DDOS" ? `182.50.4.${Math.floor(Math.random() * 200)}` : "192.168.1.42";
    const srcPort = Math.floor(1024 + Math.random() * 60000);

    if (selectedProtocol === "TCP_SYN") {
      newLogs.push(`${timestamp} IP ${srcIP}.${srcPort} > 10.0.0.8.80: Flags [S], seq 3192083, win 64240`);
      setActiveHeaderInfo({
        layer: "Ethernet Frame",
        desc: "Ingress packet received on NIC eth0 (L2 boundary)",
        srcMac: "00:0a:95:9d:68:16",
        dstMac: "02:42:ac:11:00:02",
        type: "IPv4 (0x0800)",
        details: {
          srcIP,
          dstIP: "10.0.0.8",
          proto: "TCP (6)",
          srcPort,
          dstPort: 80,
          flags: "SYN",
          payload: "None (Handshake Connection Request)"
        }
      });
    } else if (selectedProtocol === "HTTP_GET") {
      newLogs.push(`${timestamp} IP ${srcIP}.${srcPort} > 10.0.0.8.80: Flags [.], ack 1, win 502, length 84`);
      setActiveHeaderInfo({
        layer: "Ethernet Frame",
        desc: "Ingress HTTP payload framing captured on L2",
        srcMac: "00:0a:95:9d:68:16",
        dstMac: "02:42:ac:11:00:02",
        type: "IPv4 (0x0800)",
        details: {
          srcIP,
          dstIP: "10.0.0.8",
          proto: "TCP (6)",
          srcPort,
          dstPort: 80,
          flags: "ACK + PSH",
          payload: "GET /api/v1/projects HTTP/1.1\\r\\nHost: anil.dev"
        }
      });
    } else if (selectedProtocol === "DNS_QUERY") {
      newLogs.push(`${timestamp} IP ${srcIP}.${srcPort} > 10.0.0.8.53: UDP, length 34`);
      setActiveHeaderInfo({
        layer: "Ethernet Frame",
        desc: "DNS Resolve socket request bound on eth0",
        srcMac: "00:0a:95:9d:68:16",
        dstMac: "02:42:ac:11:00:02",
        type: "IPv4 (0x0800)",
        details: {
          srcIP,
          dstIP: "10.0.0.8",
          proto: "UDP (17)",
          srcPort,
          dstPort: 53,
          flags: "N/A",
          payload: "Query: github.com.vennapureddy.in"
        }
      });
    } else if (selectedProtocol === "DDOS") {
      newLogs.push(`${timestamp} IP ${srcIP}.${srcPort} > 10.0.0.8.80: Flags [S], seq 0, length 1024 (Malicious payload)`);
      setActiveHeaderInfo({
        layer: "Ethernet Frame",
        desc: "High volume ingress flood signature detected",
        srcMac: "00:0a:95:9d:68:16",
        dstMac: "02:42:ac:11:00:02",
        type: "IPv4 (0x0800)",
        details: {
          srcIP,
          dstIP: "10.0.0.8",
          proto: "TCP (6)",
          srcPort,
          dstPort: 80,
          flags: "SYN",
          payload: "Flood signature: x90x90x90... [DDOS]"
        }
      });
    }

    setPcapLogs((prev) => [...prev, ...newLogs]);

    // Animate stage loops
    let currentStage = 0;
    const interval = setInterval(() => {
      currentStage += 1;

      if (currentStage === 1) {
        // eBPF Stage
        setAnimStage(1);
        setActiveHeaderInfo((prev) => ({
          ...prev,
          layer: "eBPF TC Ingress Hook",
          desc: "In-Kernel hook executes BPF filter code prior to socket allocation."
        }));

        if (selectedProtocol === "DDOS" && ebpfEnabled) {
          // INTERCEPTED & DROPPED!
          clearInterval(interval);
          setPcapLogs((prev) => [
            ...prev,
            `[eBPF tc_ingress] DROPPED flood packet from suspicious node: ${srcIP}. Reason: Rate exceeded.`,
            "Latency saved: <0.02ms"
          ]);
          setAnimStage(99); // Dropped stage
          setSimulatedCpuLoad(4);
          setTimeout(() => {
            setIsAnimating(false);
          }, 1500);
          return;
        }
      } else if (currentStage === 2) {
        // kmod Stage
        setAnimStage(2);
        setActiveHeaderInfo((prev) => ({
          ...prev,
          layer: "Kernel Module (ids_kmod.ko)",
          desc: "Intercepts network structures for direct L3/L4 inspection."
        }));
      } else if (currentStage === 3) {
        // Userspace Stage
        setAnimStage(3);
        setActiveHeaderInfo((prev) => ({
          ...prev,
          layer: "Userspace IDS Engine",
          desc: "Alert parser matches signatures and computes Random Forest anomaly checks."
        }));

        if (selectedProtocol === "DDOS" && !ebpfEnabled) {
          setSimulatedCpuLoad(92);
          setPcapLogs((prev) => [
            ...prev,
            `[Userspace Engine] CRITICAL ALERT: SYN flood attack from ${srcIP}. CPU utilization spiked.`,
            `Latency calculated: 2.76ms`
          ]);
        }
      } else if (currentStage === 4) {
        // Console visual alerts
        setAnimStage(4);
        setActiveHeaderInfo((prev) => ({
          ...prev,
          layer: "Operations Console (Qt6)",
          desc: "Logs visual alarm metrics to live systems dashboard."
        }));

        if (selectedProtocol === "TCP_SYN") {
          setPcapLogs((prev) => [...prev, "Connection established. Active socket descriptor: socket::eth0:80"]);
        } else if (selectedProtocol === "HTTP_GET") {
          setPcapLogs((prev) => [...prev, "HTTP/1.1 200 OK. Projects list payload transmitted (1284 bytes)"]);
        } else if (selectedProtocol === "DNS_QUERY") {
          setPcapLogs((prev) => [...prev, "DNS resolve successful: 140.82.121.4 (GitHub IP)"]);
        }
      } else if (currentStage > 4) {
        clearInterval(interval);
        setIsAnimating(false);
        setAnimStage(-1);
        setSimulatedCpuLoad(4);
      }
    }, 1200);
  };

  return (
    <Sec id="sandbox">
      <Wrap>
        <Heading num="04" title="Systems Sandbox" />

        <div className="sandbox-intro-container">
          <p className="sandbox-intro-desc">
            Interact with the systems engineer simulator below. Test terminal command controls, mitigate DDoS intrusions inside our firewall sandbox game, or monitor packet layers passing through eBPF kernels.
          </p>
        </div>

        <div className="sandbox-ide">
          {/* Header OS Control panel */}
          <div className="sandbox-ide-header">
            <div className="ide-dots">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <div className="ide-title">
              {activeTab === "terminal" ? "Terminal" : "Packet Monitor"}
            </div>
            <div className="ide-status">
              <span className="ide-status-label">SYS_STATE:</span>
              <span className="ide-status-val">RUNNING</span>
            </div>
          </div>

          {/* IDE Tab Switcher */}
          <div className="sandbox-ide-tabs">
            <button
              onClick={() => handleTabChange("terminal")}
              className={`ide-tab ${activeTab === "terminal" ? "active" : ""}`}
            >
              <svg className="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
              terminal.sh
            </button>
            <button
              onClick={() => handleTabChange("pcap")}
              className={`ide-tab ${activeTab === "pcap" ? "active" : ""}`}
            >
              <svg className="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
              network_monitor.pcap
            </button>
          </div>

          <div className="sandbox-ide-content">
            {/* TAB 1: TERMINAL */}
            {activeTab === "terminal" && (
              <div className="terminal-container font-mono">
                {/* Standard Shell Screen */}
                {!isGameIntro && !isGameActive && (
                  <div className="terminal-history">
                    {terminalHistory.map((h, i) => {
                      if (h.type === "prompt") {
                        return <div key={i} className="t-prompt">{h.content}</div>;
                      } else if (h.type === "success") {
                        return <div key={i} className="t-success">{h.content}</div>;
                      } else if (h.type === "error") {
                        return <div key={i} className="t-error">{h.content}</div>;
                      } else if (h.type === "sys") {
                        return <div key={i} className="t-sys">{h.content}</div>;
                      } else if (h.type === "raw") {
                        return <pre key={i} className="t-raw">{h.content}</pre>;
                      } else if (h.type === "blank") {
                        return <div key={i} className="t-blank" />;
                      }
                      return <div key={i} className="t-text">{h.content}</div>;
                    })}
                    <div ref={terminalEndRef} />
                  </div>
                )}

                {/* Game Intro Screen */}
                {isGameIntro && (
                  <div className="game-intro font-mono">
                    <div className="t-error">============================================================</div>
                    <div className="t-error">!!! SYSTEMS INTEGRITY UNDER ATTACK !!!</div>
                    <div className="t-text">Firewall status: ACTIVE (eBPF bypassed, handling in userspace)</div>
                    <div className="t-text">Current system CPU Load: {gameCpuLoad}%</div>
                    <div className="t-success">Your Mission: Block DDoS IP streams before system load hits 100%!</div>
                    <div className="t-dim">Commands:</div>
                    <div className="t-text">  * Click [BLOCK] next to active threats.</div>
                    <div className="t-text">  * Or type 'exit' inside the prompt to abort.</div>
                    <div className="t-error">============================================================</div>
                    <div className="game-actions">
                      <button onClick={startGame} className="btn-game-start">
                        INITIALIZE_MITIGATION()
                      </button>
                      <button onClick={() => setIsGameIntro(false)} className="btn-game-exit">
                        ABORT_SESSION
                      </button>
                    </div>
                  </div>
                )}

                {/* Active Game Screen */}
                {isGameActive && (
                  <div className="game-screen font-mono">
                    <div className="game-stats-row">
                      <div>Mitigated Streams: <span className="t-success">{gameScore}</span></div>
                      <div className="cpu-load-container">
                        CPU Load:{" "}
                        <span className={gameCpuLoad > 70 ? "t-error" : gameCpuLoad > 40 ? "t-warning" : "t-success"}>
                          {gameCpuLoad}%
                        </span>
                        <div className="cpu-progress-track">
                          <div className="cpu-progress-fill" style={{ width: `${gameCpuLoad}%`, background: gameCpuLoad > 70 ? "var(--rose)" : gameCpuLoad > 40 ? "var(--amber)" : "var(--green)" }} />
                        </div>
                      </div>
                    </div>

                    <div className="game-body-grid">
                      {/* Active Threat Stream */}
                      <div className="threats-panel">
                        <div className="panel-title">// ACTIVE ATTACK THREADS (Port 80 Ingress)</div>
                        {gameThreats.length === 0 ? (
                          <div className="no-threats t-success">SYSTEM PROTECTED - NO ACTIVE ATTACKS</div>
                        ) : (
                          <div className="threat-items-container">
                            {gameThreats.map((t) => (
                              <div key={t.id} className="threat-item">
                                <div className="threat-meta">
                                  <span className="t-error font-bold">[{t.id}] {t.ip}</span>
                                  <span className="t-dim">({t.type})</span>
                                  <span className={`threat-timer ${t.timer <= 2 ? "t-error pulse-fast" : "t-warning"}`}>
                                    EXP: {t.timer}s
                                  </span>
                                </div>
                                <button onClick={() => blockThreat(t.id)} className="btn-block-threat">
                                  BLOCK
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Log Panel */}
                      <div className="game-logs-panel">
                        <div className="panel-title">// SECURITY AUDIT FEED</div>
                        <div className="game-logs-container">
                          {gameLogs.map((log, idx) => (
                            <div key={idx} className="game-log-line">
                              <span className="t-dim">[{log.time}]</span> {log.content}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="game-footer">
                      <div className="t-dim">Type 'exit' to quit game, or click option below:</div>
                      <button onClick={stopGame} className="btn-game-terminate">
                        SHUTDOWN_GAME
                      </button>
                    </div>
                  </div>
                )}

                {/* Shell Input Row */}
                {!isGameIntro && !isGameActive && (
                  <div className="terminal-input-row">
                    <span className="terminal-prompt-label">anil@vennapureddy:~$</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="terminal-field font-mono"
                      placeholder="Type command here... ('help')"
                      autoFocus
                    />
                  </div>
                )}

                {/* Mobile Helper Chips */}
                {!isGameIntro && !isGameActive && (
                  <div className="mobile-helper-chips">
                    <span className="helper-label">Quick Commands:</span>
                    {["help", "neofetch", "skills", "projects", "game", "ebpf"].map((helper) => (
                      <button
                        key={helper}
                        onClick={() => executeCommand(helper)}
                        className="helper-btn"
                      >
                        {helper}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: PACKET SIMULATOR */}
            {activeTab === "pcap" && (
              <div className="pcap-container">
                {/* Control Panel */}
                <div className="pcap-controls">
                  <div className="controls-group">
                    <label className="controls-label">PACKET PROTOCOL SIGNATURE</label>
                    <div className="protocol-buttons">
                      {[
                        { id: "TCP_SYN", label: "TCP SYN" },
                        { id: "HTTP_GET", label: "HTTP GET" },
                        { id: "DNS_QUERY", label: "DNS query" },
                        { id: "DDOS", label: "DDoS SYN flood" }
                      ].map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setSelectedProtocol(p.id)}
                          className={`btn-protocol ${selectedProtocol === p.id ? "active" : ""}`}
                          disabled={isAnimating}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="controls-group">
                    <label className="controls-label flex-between">
                      <span>eBPF KERNEL INGRESS FILTER</span>
                      <span className={`badge ${ebpfEnabled ? "badge-success" : "badge-error"}`}>
                        {ebpfEnabled ? "ACTIVE" : "BYPASSED"}
                      </span>
                    </label>
                    <div className="toggle-switch-container">
                      <label className="toggle-label">
                        <input
                          type="checkbox"
                          checked={ebpfEnabled}
                          onChange={(e) => setEbpfEnabled(e.target.checked)}
                          disabled={isAnimating}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                      <span className="toggle-desc text-dim">
                        Toggle eBPF TC hooks to drop DDoS payloads directly inside the kernel, bypassing user-space allocations.
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={injectPacket}
                    disabled={isAnimating}
                    className={`btn-inject ${isAnimating ? "loading" : ""}`}
                  >
                    {isAnimating ? "TRANSMITTING PACKET..." : "INJECT_NETWORK_PACKET()"}
                  </button>

                  {/* CPU indicator */}
                  <div className="simulated-cpu-card">
                    <div className="flex-between">
                      <span className="text-dim">Simulated Core Load:</span>
                      <span className={simulatedCpuLoad > 70 ? "t-error" : "t-success"}>{simulatedCpuLoad}%</span>
                    </div>
                    <div className="progress-track-small">
                      <div
                        className="progress-fill-small"
                        style={{
                          width: `${simulatedCpuLoad}%`,
                          background: simulatedCpuLoad > 70 ? "var(--rose)" : "var(--green)"
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Visualization Canvas Grid */}
                <div className="pcap-workspace">
                  {/* Interactive Pipeline View */}
                  <div className="pipeline-panel">
                    <div className="pipeline-panel-title">// NETWORK PROCESSING PIPELINE</div>
                    <div className="pipeline-flow">
                      {/* Node 0: NIC */}
                      <div className={`pipeline-node ${animStage === 0 ? "active" : ""}`}>
                        <div className="node-status-dot green" />
                        <div className="node-info">
                          <div className="node-name">NIC Ingress (eth0)</div>
                          <div className="node-desc text-dim">L2 Packet Capture</div>
                        </div>
                      </div>

                      <div className={`pipeline-connector ${animStage === 0 ? "animating" : ""}`} />

                      {/* Node 1: eBPF */}
                      <div className={`pipeline-node ${
                        animStage === 1 ? "active" : animStage === 99 ? "dropped" : ""
                      }`}>
                        <div className={`node-status-dot ${
                          animStage === 99 ? "red" : "orange"
                        }`} />
                        <div className="node-info">
                          <div className="node-name flex-between">
                            <span>eBPF TC Ingress Hook</span>
                            {animStage === 99 && <span className="dropped-badge">DROPPED</span>}
                          </div>
                          <div className="node-desc text-dim">Kernel Ingress Program</div>
                        </div>
                      </div>

                      {animStage !== 99 && (
                        <>
                          <div className={`pipeline-connector ${animStage === 1 ? "animating" : ""}`} />

                          {/* Node 2: kmod */}
                          <div className={`pipeline-node ${animStage === 2 ? "active" : ""}`}>
                            <div className="node-status-dot purple" />
                            <div className="node-info">
                              <div className="node-name">ids_kmod.ko</div>
                              <div className="node-desc text-dim">Linux Kernel Module</div>
                            </div>
                          </div>

                          <div className={`pipeline-connector ${animStage === 2 ? "animating" : ""}`} />

                          {/* Node 3: Userspace */}
                          <div className={`pipeline-node ${animStage === 3 ? "active" : ""}`}>
                            <div className="node-status-dot sky" />
                            <div className="node-info">
                              <div className="node-name">Userspace IDS</div>
                              <div className="node-desc text-dim">C++ Core Alert Parser</div>
                            </div>
                          </div>

                          <div className={`pipeline-connector ${animStage === 3 ? "animating" : ""}`} />

                          {/* Node 4: Qt6 */}
                          <div className={`pipeline-node ${animStage === 4 ? "active" : ""}`}>
                            <div className="node-status-dot amber" />
                            <div className="node-info">
                              <div className="node-name">Operations Dashboard</div>
                              <div className="node-desc text-dim">System Alert UI</div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Header Detail Inspector */}
                  <div className="inspector-panel">
                    <div className="inspector-panel-title">// PACKET HEADERS INSPECTOR</div>
                    {activeHeaderInfo ? (
                      <div className="inspector-body">
                        <div className="inspector-layer-badge">{activeHeaderInfo.layer}</div>
                        <p className="inspector-layer-desc">{activeHeaderInfo.desc}</p>

                        <div className="header-fields font-mono text-dim">
                          <div className="field-row">
                            <span className="field-label">L2 Dest MAC:</span>
                            <span className="field-val">{activeHeaderInfo.srcMac}</span>
                          </div>
                          <div className="field-row">
                            <span className="field-label">L2 Src MAC:</span>
                            <span className="field-val">{activeHeaderInfo.dstMac}</span>
                          </div>
                          <div className="field-row">
                            <span className="field-label">L2 Type:</span>
                            <span className="field-val">{activeHeaderInfo.type}</span>
                          </div>
                          <div className="divider" />
                          <div className="field-row">
                            <span className="field-label">L3 Src IP:</span>
                            <span className="field-val-high">{activeHeaderInfo.details.srcIP}</span>
                          </div>
                          <div className="field-row">
                            <span className="field-label">L3 Dst IP:</span>
                            <span className="field-val-high">{activeHeaderInfo.details.dstIP}</span>
                          </div>
                          <div className="field-row">
                            <span className="field-label">L3 Protocol:</span>
                            <span className="field-val">{activeHeaderInfo.details.proto}</span>
                          </div>
                          <div className="divider" />
                          <div className="field-row">
                            <span className="field-label">L4 Src Port:</span>
                            <span className="field-val">{activeHeaderInfo.details.srcPort}</span>
                          </div>
                          <div className="field-row">
                            <span className="field-label">L4 Dst Port:</span>
                            <span className="field-val">{activeHeaderInfo.details.dstPort}</span>
                          </div>
                          <div className="field-row">
                            <span className="field-label">L4 TCP Flags:</span>
                            <span className="field-val-flags">{activeHeaderInfo.details.flags}</span>
                          </div>
                          <div className="divider" />
                          <div className="field-row payload-row">
                            <span className="field-label">L7 Payload:</span>
                            <span className="field-val-payload">{activeHeaderInfo.details.payload}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="no-inspector-data text-dim">
                        INJECT A NETWORK PACKET TO START INTERCEPT ANALYZER.
                      </div>
                    )}
                  </div>
                </div>

                {/* PCAP Stream Logs at Bottom */}
                <div className="pcap-log-panel">
                  <div className="pcap-log-title font-mono">// live tcpdump traces (port 80 or 53 filter)</div>
                  <div className="pcap-log-container font-mono">
                    {pcapLogs.map((log, i) => (
                      <div key={i} className="pcap-log-line">
                        {log}
                      </div>
                    ))}
                    <div ref={pcapLogEndRef} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Wrap>
    </Sec>
  );
}
