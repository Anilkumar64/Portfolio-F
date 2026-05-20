import { useState, useEffect, useRef } from "react";

// ── Design System ──────────────────────────────────────────────────────────────
const C = {
  bg:      "#0F0E0C",
  bg2:     "#161410",
  bg3:     "#1D1A15",
  amber:   "#378781",
  cream:   "#F0E6D3",
  orange:  "#E8652A",
  sage:    "#7FB069",
  sky:     "#5BAFD6",
  rose:    "#D4657A",
  dim:     "#7A6E61",
  dimmer:  "#3D3830",
  border:  "rgba(245,166,35,0.12)",
};

const NAV = [
  { id:"home",     label:"Home"     },
  { id:"about",    label:"About"    },
  { id:"skills",   label:"Skills"   },
  { id:"strength", label:"Strength" },
  { id:"projects", label:"Projects" },
  { id:"contact",  label:"Contact"  },
];

const PROJECTS = [
  {
    id:"01", title:"Intelligent Intrusion Detection System", short:"IDS Engine",
    type:"Systems · Security", accent:C.amber, year:"2025–Present",
    github:"https://github.com/Anilkumar64",
    stack:["C++20","libpcap","eBPF","TC Hook","Kernel Module","Qt6","Python ML"],
    desc:"Real-time IDS — libpcap NIC capture, eBPF kernel filtering, dual detection engine, 50K+ pkt/sec lock-free pipeline.",
    bullets:[
      "Custom kernel module (ids_kmod.ko) intercepts packets pre-userspace — near-zero-copy NIC path.",
      "Dual-engine: rule-based (port scans, SYN flood, ARP spoofing) + ML anomaly (Random Forest, CICIDS2017).",
      "eBPF at TC ingress hook — ~60% CPU reduction under heavy traffic.",
      "Lock-free ring buffer (C++20 atomics, acquire/release) — 50K+ pkt/sec, zero drops.",
      "Structured JSON alerts <2ms latency — SIEM/ELK-ready.",
      "Qt6 dashboard: live traffic graph, alert feed, suspicious IP table, protocol chart.",
    ],
  },
  {
    id:"02", title:"TCP/IP Stack Visualizer", short:"NetGuardX",
    type:"Systems · Networking", accent:C.sky, year:"2024",
    github:"https://github.com/Anilkumar64",
    stack:["C++20","libpcap","Qt6","Raw Sockets","Linux"],
    desc:"Live packet capture from NIC, layer-by-layer TCP/IP dissection and real-time animation — Ethernet frame to payload.",
    bullets:[
      "Direct NIC capture via libpcap — no pcap files, pure wire stream processing.",
      "TCP/UDP stream separation, encapsulation visualised: Ethernet → IP → segment → payload.",
      "Animated fragmentation/reassembly across all TCP/IP layers in real time.",
      "Header field dissection: SYN/ACK/FIN/RST flags, seq/ack numbers, TTL, checksum.",
      "Qt6 UI: live stream view, protocol filter panel, per-layer detail inspector.",
    ],
  },
  {
    id:"03", title:"Kernel Traffic Analyzer", short:"KTA Engine",
    type:"Kernel · eBPF", accent:"#B48EF0",
    year:"2024", github:"https://github.com/Anilkumar64",
    stack:["C++20","eBPF/XDP","BPF Maps","Ring Buffers","libpcap","Qt6"],
    desc:"Kernel-aware analyzer combining libpcap with eBPF at XDP hooks for per-flow stats — near-zero-copy path.",
    bullets:[
      "eBPF at TC and XDP hooks — near-zero-copy path from NIC to analysis engine.",
      "BPF hash maps accumulate per-flow stats in kernel space; userspace reads via ring buffers.",
      "Dissector: TCP, UDP, ICMP, DNS query/response, HTTP/1.x method + status + host.",
      "Qt6 dashboard: 1Hz refresh, bandwidth graphs, top-talker table, RTT timeline.",
    ],
  },
  {
    id:"04", title:"Tiny Shell — Remote Client/Server", short:"TinyShell",
    type:"Systems · Linux", accent:C.amber, year:"2023",
    github:"https://github.com/Anilkumar64",
    stack:["C++20","POSIX Sockets","Qt6","Linux","pthreads"],
    desc:"Unix shell from scratch — piping, redirection, background jobs, extended with remote client/server over raw TCP.",
    bullets:[
      "Full Unix shell: piping, I/O redirection, background jobs, POSIX signal handling.",
      "Remote client/server over raw TCP socket with full stdin/stdout forwarding.",
      "Custom wire protocol: command framing, partial reads, connection drops, graceful shutdown.",
      "Qt6 terminal UI: command history, scrollback buffer, live connection status.",
    ],
  },
  {
    id:"05", title:"E-Learning Platform (LMS)", short:"EduStack",
    type:"Full Stack · MERN", accent:C.sage, year:"2024–2025",
    github:"https://github.com/Anilkumar64",
    stack:["React.js","Node.js","Express.js","MongoDB","JWT","Docker","GitHub Actions"],
    desc:"Complete LMS — 3 user roles, JWT auth, 20+ REST endpoints, Redux frontend, multi-stage Docker build.",
    bullets:[
      "Three roles (Student, Instructor, Admin) with JWT session management and RBAC.",
      "20+ REST endpoints with Mongoose aggregation; 90+ Lighthouse score.",
      "Multi-stage Docker build reduced image size 40%; GitHub Actions CI/CD.",
      "Rate limiting, CORS, input sanitization across all routes.",
    ],
  },
  {
    id:"06", title:"E-Grievance Hub", short:"GrievanceOS",
    type:"Full Stack · AI", accent:C.rose, year:"2024",
    github:"https://github.com/Anilkumar64",
    stack:["React.js","Node.js","MySQL","FastAPI","Socket.io","Docker","scikit-learn"],
    desc:"University grievance system with AI auto-categorization + sentiment analysis, real-time WebSocket updates, 3-tier roles.",
    bullets:[
      "AI microservice (FastAPI + scikit-learn): auto-categorizes complaints + sentiment analysis.",
      "Three-tier roles: Student, Admin, Super Admin — full audit log.",
      "Real-time updates via WebSockets; optimized MySQL JOINs — 50% faster queries.",
      "Jest + Supertest 80%+ coverage; Nginx reverse proxy with gzip caching.",
    ],
  },
];

const STRENGTHS = [
  { label:"C++ / Systems Programming",      pct:92, color:C.amber },
  { label:"Network Programming (TCP/IP)",   pct:90, color:C.sky   },
  { label:"Linux Kernel & Internals",       pct:85, color:C.amber },
  { label:"eBPF / XDP Programming",         pct:85, color:"#B48EF0"},
  { label:"Packet Analysis & libpcap",      pct:88, color:C.sky   },
  { label:"Multithreading & Concurrency",   pct:83, color:C.amber },
  { label:"Full Stack (MERN)",              pct:72, color:C.sage   },
  { label:"DevOps & Docker",               pct:68, color:C.rose   },
];

const RADAR = [
  { label:"C++\nSystems",  value:92 },
  { label:"Network\nStack",value:90 },
  { label:"libpcap\nCapture",value:88},
  { label:"Linux\nKernel", value:85 },
  { label:"eBPF/XDP",      value:85 },
  { label:"Concurrency",   value:83 },
  { label:"Full\nStack",   value:72 },
  { label:"DevOps",        value:68 },
];

const TIMELINE = [
  { y:"2022", t:"Started B.Tech CSE (AI & ML), ITM University Gwalior" },
  { y:"2023", t:"Built Tiny Shell — first deep C++ + Linux project" },
  { y:"2024 Q1", t:"TCP/IP Stack Visualizer with live libpcap NIC capture" },
  { y:"2024 Q3", t:"Kernel Traffic Analyzer — eBPF/XDP kernel hooks" },
  { y:"2025 Q1", t:"IDS project — kernel module + eBPF + ML pipeline" },
  { y:"2025",    t:"Internet Society internship — live network diagnostics" },
  { y:"2026",    t:"Graduated May 2026 — open to systems/network roles" },
];

const SKILL_CATS = [
  { cat:"C++ Core", color:C.amber,
    items:["C++20/17/14","Move Semantics","Perfect Forwarding","RAII","Smart Pointers","Template Metaprogramming","Custom Allocators","SFINAE/Concepts","constexpr","STL Internals"] },
  { cat:"Linux / Kernel", color:C.sky,
    items:["Kernel Internals","Process Scheduler","Memory Management","Network Stack","Kernel Modules (.ko)","netfilter/iptables","/proc & /sys","epoll/select/poll","POSIX APIs"] },
  { cat:"eBPF / Networking", color:"#B48EF0",
    items:["eBPF Programs","TC Hook","XDP","BPF Maps","Ring Buffers","libpcap","Raw Sockets","TCP/IP L2–L7","DNS/HTTP/ARP"] },
  { cat:"Concurrency", color:C.orange,
    items:["std::thread/pthreads","Lock-Free Queues","std::atomic","Memory Ordering","Condition Variables","Thread Sanitizer"] },
  { cat:"Full Stack", color:C.sage,
    items:["React.js/Redux","Node.js/Express","MongoDB/Mongoose","MySQL/Joins","JWT/OAuth2/RBAC","WebSockets","REST API"] },
  { cat:"DevOps & Tools", color:C.rose,
    items:["Docker/Compose","GitHub Actions","CMake/GDB","Valgrind/ASan","Wireshark/tcpdump","Nginx/PM2","Jest/GTest"] },
];

// ── Hooks ──────────────────────────────────────────────────────────────────────
function useInView(threshold=0.1){
  const ref=useRef(null);
  const [vis,setVis]=useState(false);
  useEffect(()=>{
    const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVis(true);o.disconnect();}},{threshold});
    if(ref.current) o.observe(ref.current);
    return()=>o.disconnect();
  },[]);
  return [ref,vis];
}

function useWindowWidth(){
  const [w,setW]=useState(typeof window!=="undefined"?window.innerWidth:1200);
  useEffect(()=>{
    const fn=()=>setW(window.innerWidth);
    window.addEventListener("resize",fn);
    return()=>window.removeEventListener("resize",fn);
  },[]);
  return w;
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function Cursor(){
  const [v,setV]=useState(true);
  useEffect(()=>{const t=setInterval(()=>setV(x=>!x),540);return()=>clearInterval(t);},[]);
  return <span style={{opacity:v?1:0,color:C.amber}}>▌</span>;
}

function Typewriter({strings,speed=65,pause=2400}){
  const [text,setText]=useState("");
  const [idx,setIdx]=useState(0);
  const [ci,setCi]=useState(0);
  const [del,setDel]=useState(false);
  useEffect(()=>{
    const cur=strings[idx];
    const t=del
      ?setTimeout(()=>{setText(s=>s.slice(0,-1));if(text.length===1){setDel(false);setIdx(i=>(i+1)%strings.length);setCi(0);}},22)
      :ci<cur.length
        ?setTimeout(()=>{setText(s=>s+cur[ci]);setCi(c=>c+1);},speed)
        :setTimeout(()=>setDel(true),pause);
    return()=>clearTimeout(t);
  },[text,ci,del,idx]);
  return <span>{text}<Cursor/></span>;
}

function Chip({children,color=C.amber}){
  return(
    <span style={{
      display:"inline-block",padding:"3px 10px",borderRadius:4,
      fontSize:11,fontFamily:"monospace",letterSpacing:"0.04em",
      background:`${color}15`,color:color,border:`1px solid ${color}30`,
    }}>{children}</span>
  );
}

// ── Radar ──────────────────────────────────────────────────────────────────────
function Radar({skills,size}){
  const [vis,setVis]=useState(false);
  const [ref,inView]=useInView(0.2);
  useEffect(()=>{if(inView){const t=setTimeout(()=>setVis(true),200);return()=>clearTimeout(t);}},[inView]);
  const cx=size/2,cy=size/2,r=size*0.36,n=skills.length;
  const ang=i=>(i/n)*2*Math.PI-Math.PI/2;
  const pt=(i,pct)=>{const a=ang(i),l=r*(pct/100);return[cx+l*Math.cos(a),cy+l*Math.sin(a)];};
  return(
    <div ref={ref} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <svg width={size} height={size} style={{overflow:"visible"}}>
        <defs>
          <radialGradient id="rg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={C.amber} stopOpacity="0.3"/>
            <stop offset="100%" stopColor={C.amber} stopOpacity="0.02"/>
          </radialGradient>
          <filter id="gl"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        {[25,50,75,100].map(l=>(
          <polygon key={l} points={skills.map((_,i)=>pt(i,l).join(",")).join(" ")}
            fill="none" stroke={`rgba(245,166,35,0.08)`} strokeWidth="1"/>
        ))}
        {skills.map((_,i)=>{const[x,y]=pt(i,100);return<line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(245,166,35,0.1)" strokeWidth="1"/>;;})}
        <polygon
          points={skills.map((s,i)=>pt(i,vis?s.value:0).join(",")).join(" ")}
          fill="url(#rg)" stroke={C.amber} strokeWidth="2" filter="url(#gl)"
          style={{transition:"all 1.4s cubic-bezier(0.34,1.56,0.64,1)"}}
        />
        {skills.map((s,i)=>{const[x,y]=pt(i,vis?s.value:0);return(
          <circle key={i} cx={x} cy={y} r="4" fill={C.amber}
            style={{transition:`all 1.4s cubic-bezier(0.34,1.56,0.64,1) ${i*0.06}s`}}/>
        );})}
        {skills.map((s,i)=>{const[x,y]=pt(i,116);const lines=s.label.split("\n");return(
          <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
            style={{fontFamily:"monospace",fontSize:9,fill:C.dim,letterSpacing:"0.05em"}}>
            {lines.map((l,j)=><tspan key={j} x={x} dy={j===0?(lines.length>1?"-0.55em":"0em"):"1.3em"}>{l}</tspan>)}
          </text>
        );})}
      </svg>
    </div>
  );
}

// ── StrengthBar ────────────────────────────────────────────────────────────────
function SBar({label,pct,color,delay=0}){
  const [ref,vis]=useInView(0.1);
  const [w,setW]=useState(0);
  useEffect(()=>{if(vis){const t=setTimeout(()=>setW(pct),delay);return()=>clearTimeout(t);}},[vis]);
  return(
    <div ref={ref} style={{marginBottom:20}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
        <span style={{fontFamily:"monospace",fontSize:12,color:C.cream,letterSpacing:"0.02em"}}>{label}</span>
        <span style={{fontFamily:"monospace",fontSize:12,color:color,fontWeight:600}}>{pct}%</span>
      </div>
      <div style={{height:3,background:C.dimmer,borderRadius:2,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${w}%`,background:`linear-gradient(90deg,${color}66,${color})`,
          borderRadius:2,boxShadow:`0 0 10px ${color}44`,
          transition:`width 1.3s cubic-bezier(0.16,1,0.3,1) ${delay}ms`}}/>
      </div>
    </div>
  );
}

// ── Section wrapper ────────────────────────────────────────────────────────────
function Sec({id,children,bg=C.bg,pt=100,pb=100}){
  const [ref,vis]=useInView(0.05);
  return(
    <section id={id} ref={ref} style={{
      background:bg,paddingTop:pt,paddingBottom:pb,
      opacity:vis?1:0,transform:vis?"none":"translateY(28px)",
      transition:"all 0.75s ease",
    }}>{children}</section>
  );
}

function Wrap({children}){
  const w=useWindowWidth();
  const px=w<640?20:w<1024?32:48;
  return(
    <div style={{maxWidth:1200,margin:"0 auto",padding:`0 ${px}px`}}>{children}</div>
  );
}

// ── Section Heading ────────────────────────────────────────────────────────────
function Heading({num,title}){
  return(
    <div style={{marginBottom:60}}>
      <div style={{fontFamily:"monospace",fontSize:11,color:C.amber,letterSpacing:"0.3em",
        textTransform:"uppercase",marginBottom:10,display:"flex",alignItems:"center",gap:12}}>
        <span style={{fontFamily:"monospace",color:C.dimmer,fontSize:22,fontWeight:700,letterSpacing:"-0.02em"}}>{num}</span>
        <span style={{flex:1,height:1,background:`linear-gradient(90deg,${C.amber}40,transparent)`}}/>
      </div>
      <h2 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(2.2rem,5vw,3.5rem)",
        fontWeight:700,color:C.cream,margin:0,letterSpacing:"-0.03em",lineHeight:1.1}}>
        {title}
      </h2>
    </div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────────
function Navbar(){
  const [active,setActive]=useState("home");
  const [scrolled,setScrolled]=useState(false);
  const [open,setOpen]=useState(false);
  const w=useWindowWidth();
  const mobile=w<768;

  useEffect(()=>{
    const fn=()=>{
      setScrolled(window.scrollY>40);
      const y=window.scrollY+160;
      for(let i=NAV.length-1;i>=0;i--){
        const el=document.getElementById(NAV[i].id);
        if(el&&el.offsetTop<=y){setActive(NAV[i].id);break;}
      }
    };
    window.addEventListener("scroll",fn);
    return()=>window.removeEventListener("scroll",fn);
  },[]);

  const go=id=>{document.getElementById(id)?.scrollIntoView({behavior:"smooth"});setOpen(false);};

  return(
    <>
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:400,
        background:scrolled?"rgba(15,14,12,0.97)":"transparent",
        backdropFilter:scrolled?"blur(24px)":"none",
        borderBottom:scrolled?`1px solid ${C.border}`:"1px solid transparent",
        transition:"all 0.4s",
      }}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 20px",display:"flex",
          alignItems:"center",justifyContent:"space-between",height:64}}>

          <div onClick={()=>go("home")} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:34,height:34,borderRadius:6,background:`${C.amber}20`,
              border:`1px solid ${C.amber}50`,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontFamily:"monospace",fontSize:13,color:C.amber,fontWeight:700}}>AK</span>
            </div>
            {!mobile&&<span style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:16,
              color:C.cream,letterSpacing:"-0.01em"}}>Anil Kumar</span>}
          </div>

          {!mobile&&(
            <div style={{display:"flex",gap:2}}>
              {NAV.map(n=>(
                <button key={n.id} onClick={()=>go(n.id)} style={{
                  background:active===n.id?`${C.amber}18`:"transparent",
                  border:"none",cursor:"pointer",padding:"7px 15px",borderRadius:6,
                  fontFamily:"monospace",fontSize:13,letterSpacing:"0.03em",
                  color:active===n.id?C.amber:C.dim,transition:"all 0.2s",
                }}
                  onMouseEnter={e=>{if(active!==n.id)e.currentTarget.style.color=C.cream;}}
                  onMouseLeave={e=>{if(active!==n.id)e.currentTarget.style.color=C.dim;}}>
                  {n.label}
                </button>
              ))}
            </div>
          )}

          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <a href="mailto:vennapureddyanil456@gmail.com" style={{
              padding:"8px 18px",borderRadius:6,background:C.amber,color:C.bg,
              textDecoration:"none",fontFamily:"monospace",fontWeight:700,fontSize:12,
              letterSpacing:"0.04em",transition:"all 0.2s",whiteSpace:"nowrap",
              boxShadow:`0 4px 18px ${C.amber}40`,
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";}}>
              Hire Me
            </a>
            {mobile&&(
              <button onClick={()=>setOpen(o=>!o)} style={{
                background:"transparent",border:`1px solid ${C.border}`,
                borderRadius:6,padding:"7px 10px",cursor:"pointer",
                color:C.cream,fontSize:18,lineHeight:1,
              }}>{open?"✕":"☰"}</button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {mobile&&open&&(
          <div style={{background:"rgba(15,14,12,0.98)",borderTop:`1px solid ${C.border}`,
            padding:"16px 20px",display:"flex",flexDirection:"column",gap:4}}>
            {NAV.map(n=>(
              <button key={n.id} onClick={()=>go(n.id)} style={{
                background:"transparent",border:"none",cursor:"pointer",
                padding:"12px 16px",borderRadius:8,textAlign:"left",
                fontFamily:"monospace",fontSize:14,
                color:active===n.id?C.amber:C.dim,letterSpacing:"0.05em",
                borderLeft:active===n.id?`3px solid ${C.amber}`:"3px solid transparent",
              }}>{n.label}</button>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────────
function Hero(){
  const w=useWindowWidth();
  const mobile=w<768;
  const [m,setM]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setM(true),80);return()=>clearTimeout(t);},[]);

  return(
    <section id="home" style={{minHeight:"100vh",display:"flex",alignItems:"center",
      position:"relative",overflow:"hidden",padding:`100px ${mobile?20:48}px 60px`}}>

      {/* Textured bg */}
      <div style={{position:"absolute",inset:0,zIndex:0,
        backgroundImage:`radial-gradient(circle at 20% 50%, ${C.amber}08 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, ${C.sky}06 0%, transparent 45%)`,
      }}/>
      {/* Horizontal rule lines */}
      {[0.2,0.4,0.6,0.8].map(p=>(
        <div key={p} style={{position:"absolute",top:`${p*100}%`,left:0,right:0,height:1,
          background:`linear-gradient(90deg, transparent, ${C.amber}08, transparent)`,zIndex:0}}/>
      ))}

      <div style={{maxWidth:1200,margin:"0 auto",width:"100%",position:"relative",zIndex:1}}>
        {/* Big number */}
        <div style={{
          fontFamily:"monospace",fontSize:"clamp(100px,18vw,200px)",
          fontWeight:900,color:`${C.amber}06`,lineHeight:1,
          position:"absolute",top:"-10%",right:mobile?"-5%":"0%",
          userSelect:"none",letterSpacing:"-0.06em",zIndex:0,
        }}>SWE</div>

        <div style={{position:"relative",zIndex:1,maxWidth:760}}>
          {/* Status pill */}
          <div style={{
            display:"inline-flex",alignItems:"center",gap:8,
            padding:"5px 14px",borderRadius:3,marginBottom:28,
            background:`${C.amber}10`,border:`1px solid ${C.amber}30`,
            opacity:m?1:0,transform:m?"none":"translateY(12px)",
            transition:"all 0.6s ease 0.1s",
          }}>
            <span style={{width:6,height:6,borderRadius:"50%",background:C.sage,
              boxShadow:`0 0 8px ${C.sage}`,display:"inline-block"}}/>
            <span style={{fontFamily:"monospace",fontSize:11,color:C.amber,
              letterSpacing:"0.2em",textTransform:"uppercase"}}>Available · May 2026</span>
          </div>

          <h1 style={{
            fontFamily:"'Playfair Display',Georgia,serif",
            fontSize:`clamp(3rem,${mobile?"10vw":"7vw"},6rem)`,
            fontWeight:700,color:C.cream,margin:"0 0 8px",
            letterSpacing:"-0.04em",lineHeight:0.95,
            opacity:m?1:0,transform:m?"none":"translateY(20px)",
            transition:"all 0.7s ease 0.2s",
          }}>
            Anil Kumar<br/>
            <em style={{color:C.amber,fontStyle:"italic"}}>Vennapureddy</em>
          </h1>

          <div style={{
            fontFamily:"monospace",fontSize:mobile?"14px":"clamp(14px,2vw,18px)",
            color:C.dim,marginBottom:24,marginTop:16,letterSpacing:"0.02em",
            opacity:m?1:0,transform:m?"none":"translateY(16px)",
            transition:"all 0.7s ease 0.35s",
          }}>
            <span style={{color:C.dimmer}}>$ role → </span>
            <Typewriter strings={["C++ Systems Engineer","Linux Kernel Developer","eBPF / Network Programmer","Packet Capture Engineer"]}/>
          </div>

          <p style={{
            fontFamily:"Georgia,serif",fontSize:mobile?15:17,color:C.dim,
            lineHeight:1.85,maxWidth:560,marginBottom:40,
            opacity:m?1:0,transform:m?"none":"translateY(16px)",
            transition:"all 0.7s ease 0.45s",
          }}>
            Four years building at the <span style={{color:C.cream,fontStyle:"italic"}}>kernel level</span> — not on top of it.
            Real packet capture, eBPF programs, lock-free pipelines.
            Linux is home.
          </p>

          <div style={{
            display:"flex",gap:12,flexWrap:"wrap",marginBottom:60,
            opacity:m?1:0,transform:m?"none":"translateY(16px)",
            transition:"all 0.7s ease 0.55s",
          }}>
            <a href="#projects" onClick={e=>{e.preventDefault();document.getElementById("projects")?.scrollIntoView({behavior:"smooth"});}}
              style={{padding:`12px ${mobile?20:28}px`,borderRadius:4,background:C.amber,color:C.bg,
                textDecoration:"none",fontFamily:"monospace",fontWeight:700,fontSize:13,
                letterSpacing:"0.06em",boxShadow:`0 6px 24px ${C.amber}40`,transition:"all 0.2s",
              }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";}}>
              VIEW PROJECTS →
            </a>
            <a href="https://github.com/Anilkumar64" target="_blank" rel="noopener noreferrer"
              style={{padding:`12px ${mobile?20:28}px`,borderRadius:4,background:"transparent",
                color:C.cream,border:`1px solid ${C.dimmer}`,textDecoration:"none",
                fontFamily:"monospace",fontWeight:600,fontSize:13,letterSpacing:"0.06em",transition:"all 0.2s",
              }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=C.amber;e.currentTarget.style.color=C.amber;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=C.dimmer;e.currentTarget.style.color=C.cream;}}>
              GITHUB ↗
            </a>
          </div>

          {/* Stats */}
          <div style={{
            display:"grid",gridTemplateColumns:`repeat(${mobile?2:4},1fr)`,
            gap:mobile?16:0,paddingTop:32,
            borderTop:`1px solid ${C.border}`,
            opacity:m?1:0,transition:"all 0.7s ease 0.7s",
          }}>
            {[["50K+","Pkt/sec IDS"],["8.0","CGPA"],["4+","Yrs Building"],["2Y+","GitHub"]].map(([v,l])=>(
              <div key={l} style={{paddingRight:mobile?0:32,marginRight:mobile?0:32,
                borderRight:mobile?"none":`1px solid ${C.border}`,"&:last-child":{borderRight:"none"}}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:mobile?28:34,fontWeight:700,
                  color:C.amber,letterSpacing:"-0.04em",lineHeight:1}}>{v}</div>
                <div style={{fontFamily:"monospace",fontSize:10,color:C.dim,
                  textTransform:"uppercase",letterSpacing:"0.12em",marginTop:4}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── About ──────────────────────────────────────────────────────────────────────
function About(){
  const w=useWindowWidth();
  const mobile=w<900;
  return(
    <Sec id="about" bg={C.bg2}>
      <Wrap>
        <Heading num="01" title="Who I Am"/>
        <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"1fr 1fr",gap:mobile?48:80,alignItems:"start"}}>
          <div>
            <p style={{fontFamily:"Georgia,serif",fontSize:mobile?15:17,color:C.dim,lineHeight:1.9,marginBottom:20}}>
              Systems programmer, graduated May 2026 from ITM University, Gwalior — B.Tech CSE (AI & ML), CGPA 8.0.
            </p>
            <p style={{fontFamily:"Georgia,serif",fontSize:mobile?15:17,color:C.dim,lineHeight:1.9,marginBottom:36}}>
              Four years of hands-on systems work — not tutorials, not toy projects. Written eBPF kernel programs, built a live IDS handling 50K+ pkt/sec, gone deep into the Linux network stack. <span style={{color:C.cream,fontStyle:"italic"}}>The kernel is not a black box.</span>
            </p>

            {/* Timeline */}
            <div style={{borderLeft:`2px solid ${C.border}`,paddingLeft:24}}>
              {TIMELINE.map((item,i)=>(
                <div key={i} style={{marginBottom:18,position:"relative"}}>
                  <div style={{position:"absolute",left:-29,top:5,width:8,height:8,borderRadius:"50%",
                    background:i===TIMELINE.length-1?C.amber:C.dimmer,
                    boxShadow:i===TIMELINE.length-1?`0 0 10px ${C.amber}`:"none"}}/>
                  <div style={{fontFamily:"monospace",fontSize:10,color:C.amber,
                    letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:2}}>{item.y}</div>
                  <div style={{fontFamily:"Georgia,serif",fontSize:13.5,color:C.dim,lineHeight:1.6}}>{item.t}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            {/* Edu card */}
            <div style={{background:C.bg3,border:`1px solid ${C.border}`,borderLeft:`3px solid ${C.amber}`,
              borderRadius:8,padding:24}}>
              <div style={{fontFamily:"monospace",fontSize:10,color:C.amber,letterSpacing:"0.2em",
                textTransform:"uppercase",marginBottom:14}}>// Education</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,
                color:C.cream,marginBottom:4}}>B.Tech — CSE (AI & ML)</div>
              <div style={{fontFamily:"Georgia,serif",fontSize:14,color:C.dim,marginBottom:2}}>ITM University, Gwalior</div>
              <div style={{fontFamily:"monospace",fontSize:11,color:C.dimmer,marginBottom:16}}>Aug 2022 – May 2026</div>
              <div style={{display:"inline-block",padding:"6px 16px",background:`${C.amber}18`,
                border:`1px solid ${C.amber}40`,borderRadius:4,fontFamily:"monospace",
                fontSize:18,fontWeight:700,color:C.amber}}>8.0 CGPA</div>
            </div>

            {/* Internship */}
            <div style={{background:C.bg3,border:`1px solid ${C.border}`,borderLeft:`3px solid ${C.sky}`,
              borderRadius:8,padding:24}}>
              <div style={{fontFamily:"monospace",fontSize:10,color:C.sky,letterSpacing:"0.2em",
                textTransform:"uppercase",marginBottom:14}}>// Internship</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,color:C.cream,marginBottom:2}}>Internet Society (ISOC)</div>
              <div style={{fontFamily:"monospace",fontSize:12,color:C.sky,marginBottom:12}}>Networking Contributor</div>
              <p style={{fontFamily:"Georgia,serif",fontSize:13.5,color:C.dim,lineHeight:1.7,margin:0}}>
                Deep packet inspection, TCP/IP diagnostics, iptables configuration, Bash automation — reduced manual monitoring ~30%.
              </p>
            </div>

            {/* Currently studying */}
            <div style={{background:C.bg3,border:`1px solid ${C.border}`,borderRadius:8,padding:24}}>
              <div style={{fontFamily:"monospace",fontSize:10,color:"#B48EF0",letterSpacing:"0.2em",
                textTransform:"uppercase",marginBottom:14}}>// Currently Studying</div>
              {["CCNA (in progress)","Linux Kernel Dev — Corbet, Rubini","Advanced eBPF / XDP","DPDK — kernel-bypass","Cilium / Kubernetes eBPF"].map(item=>(
                <div key={item} style={{display:"flex",gap:8,marginBottom:10}}>
                  <span style={{color:C.amber,fontFamily:"monospace",flexShrink:0,fontSize:12}}>→</span>
                  <span style={{fontFamily:"monospace",fontSize:12,color:C.dim,letterSpacing:"0.02em"}}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Wrap>
    </Sec>
  );
}

// ── Skills ─────────────────────────────────────────────────────────────────────
function Skills(){
  const w=useWindowWidth();
  const cols=w<640?1:w<1024?2:3;
  return(
    <Sec id="skills">
      <Wrap>
        <Heading num="02" title="Technical Arsenal"/>
        <div style={{display:"grid",gridTemplateColumns:`repeat(${cols},1fr)`,gap:16}}>
          {SKILL_CATS.map(cat=>(
            <div key={cat.cat} style={{background:C.bg2,border:`1px solid ${C.border}`,
              borderTop:`2px solid ${cat.color}`,borderRadius:8,padding:"22px 20px",
              transition:"transform 0.25s,box-shadow 0.25s",}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow=`0 16px 40px rgba(0,0,0,0.5),0 0 0 1px ${cat.color}18`;}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>
              <div style={{fontFamily:"monospace",fontSize:10,color:cat.color,
                textTransform:"uppercase",letterSpacing:"0.18em",marginBottom:16}}>{cat.cat}</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {cat.items.map(it=><Chip key={it} color={cat.color}>{it}</Chip>)}
              </div>
            </div>
          ))}
        </div>
      </Wrap>
    </Sec>
  );
}

// ── Strength ───────────────────────────────────────────────────────────────────
function Strength(){
  const w=useWindowWidth();
  const mobile=w<900;
  const size=mobile?Math.min(w-80,320):340;
  return(
    <Sec id="strength" bg={C.bg2}>
      <Wrap>
        <Heading num="03" title="How Strong I Am"/>
        <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"1fr 1fr",gap:mobile?48:80,alignItems:"start"}}>
          <div>
            <div style={{fontFamily:"monospace",fontSize:10,color:C.dimmer,
              textTransform:"uppercase",letterSpacing:"0.2em",marginBottom:24}}>// Proficiency</div>
            {STRENGTHS.map((s,i)=><SBar key={s.label} label={s.label} pct={s.pct} color={s.color} delay={i*100}/>)}
            <div style={{marginTop:24,padding:"16px 18px",background:C.bg3,
              borderRadius:8,border:`1px solid ${C.border}`,borderLeft:`3px solid ${C.amber}`}}>
              <div style={{fontFamily:"Georgia,serif",fontSize:13.5,color:C.dim,lineHeight:1.75,fontStyle:"italic"}}>
                "Systems programming, network stack, and eBPF are my deepest skills — genuinely rare at fresher level. MERN and DevOps are solid, not the primary identity."
              </div>
            </div>
          </div>
          <div>
            <div style={{fontFamily:"monospace",fontSize:10,color:C.dimmer,
              textTransform:"uppercase",letterSpacing:"0.2em",marginBottom:24,textAlign:"center"}}>// Skill Radar</div>
            <Radar skills={RADAR} size={size}/>
          </div>
        </div>
      </Wrap>
    </Sec>
  );
}

// ── Projects ───────────────────────────────────────────────────────────────────
function Projects(){
  const [exp,setExp]=useState(null);
  const w=useWindowWidth();
  const cols=w<640?1:w<1100?2:3;
  return(
    <Sec id="projects">
      <Wrap>
        <Heading num="04" title="What I've Built"/>
        <div style={{display:"grid",gridTemplateColumns:`repeat(${cols},1fr)`,gap:20}}>
          {PROJECTS.map((p,i)=>(
            <div key={i} style={{background:C.bg2,border:`1px solid ${C.border}`,
              borderRadius:8,overflow:"hidden",cursor:"pointer",
              transition:"transform 0.25s,box-shadow 0.25s",}}
              onClick={()=>setExp(exp===i?null:i)}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow=`0 24px 50px rgba(0,0,0,0.55),0 0 0 1px ${p.accent}20`;}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>

              {/* Top bar */}
              <div style={{height:2,background:`linear-gradient(90deg,${p.accent},${p.accent}20)`}}/>

              <div style={{padding:"20px 20px 0"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <span style={{fontFamily:"monospace",fontSize:9,color:p.accent,
                    textTransform:"uppercase",letterSpacing:"0.16em"}}>{p.type}</span>
                  <span style={{fontFamily:"monospace",fontSize:9,color:C.dimmer}}>{p.year}</span>
                </div>

                <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8,marginBottom:6}}>
                  <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,
                    color:C.cream,margin:0,lineHeight:1.35,flex:1}}>{p.title}</h3>
                  <span style={{fontFamily:"monospace",fontSize:9,color:C.dimmer,
                    background:C.bg3,padding:"2px 7px",borderRadius:3,
                    whiteSpace:"nowrap",flexShrink:0,marginTop:2}}>/{p.id}</span>
                </div>

                <p style={{fontFamily:"Georgia,serif",fontSize:13,color:C.dim,
                  lineHeight:1.65,margin:"0 0 14px"}}>{p.desc}</p>

                <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:16}}>
                  {p.stack.map(s=><Chip key={s} color={p.accent}>{s}</Chip>)}
                </div>
              </div>

              {/* Expandable */}
              <div style={{maxHeight:exp===i?600:0,overflow:"hidden",transition:"max-height 0.4s ease"}}>
                <div style={{padding:"0 20px 16px",borderTop:`1px solid ${C.border}`,paddingTop:14}}>
                  <ul style={{margin:0,padding:0,listStyle:"none"}}>
                    {p.bullets.map((b,j)=>(
                      <li key={j} style={{display:"flex",gap:8,marginBottom:8}}>
                        <span style={{color:p.accent,fontSize:9,marginTop:5,flexShrink:0}}>▸</span>
                        <span style={{fontFamily:"Georgia,serif",fontSize:12.5,color:C.dim,lineHeight:1.65}}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer */}
              <div style={{padding:"12px 20px",borderTop:`1px solid ${C.border}`,
                display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <a href={p.github} target="_blank" rel="noopener noreferrer"
                  onClick={e=>e.stopPropagation()}
                  style={{fontFamily:"monospace",fontSize:11,color:C.dim,
                    textDecoration:"none",display:"flex",alignItems:"center",gap:5,transition:"color 0.2s"}}
                  onMouseEnter={e=>e.currentTarget.style.color=p.accent}
                  onMouseLeave={e=>e.currentTarget.style.color=C.dim}>
                  ⎇ GitHub →
                </a>
                <span style={{fontFamily:"monospace",fontSize:10,
                  color:exp===i?p.accent:C.dimmer,transition:"color 0.2s"}}>
                  {exp===i?"↑ less":"↓ details"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Wrap>
    </Sec>
  );
}

// ── Contact ────────────────────────────────────────────────────────────────────
function Contact(){
  const w=useWindowWidth();
  const mobile=w<900;
  const links=[
    {label:"Email",   val:"vennapureddyanil456@gmail.com", href:"mailto:vennapureddyanil456@gmail.com", color:C.amber},
    {label:"Phone",   val:"+91 77250 05752",               href:"tel:+917725005752",                   color:C.sky},
    {label:"LinkedIn",val:"AnilKumar64 ↗",                 href:"https://www.linkedin.com/in/vennapu-reddy-anil-kumar-8782a521a/",color:"#B48EF0"},
    {label:"GitHub",  val:"Anilkumar64 ↗",                 href:"https://github.com/Anilkumar64",      color:C.amber},
    {label:"Location",val:"Gwalior, MP — Open to relocate",href:null,                                  color:C.sage},
    {label:"Status",  val:"Available immediately",          href:null,                                  color:C.sage},
  ];
  return(
    <Sec id="contact" bg={C.bg2}>
      <Wrap>
        <Heading num="05" title="Let's Talk"/>
        <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"1fr 1fr",gap:mobile?48:80,alignItems:"start"}}>
          <div>
            <p style={{fontFamily:"Georgia,serif",fontSize:mobile?15:17,color:C.dim,
              lineHeight:1.85,marginBottom:36,maxWidth:460}}>
              Looking for <span style={{color:C.cream,fontStyle:"italic"}}>Systems / C++ / Network Engineering</span> roles at startups where depth actually matters. Ready to join immediately.
            </p>
            <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:36}}>
              <a href="mailto:vennapureddyanil456@gmail.com" style={{
                padding:"12px 28px",borderRadius:4,background:C.amber,color:C.bg,
                textDecoration:"none",fontFamily:"monospace",fontWeight:700,
                fontSize:12,letterSpacing:"0.06em",
                boxShadow:`0 6px 24px ${C.amber}40`,transition:"all 0.2s",
              }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";}}>
                SEND EMAIL →
              </a>
              <a href="https://github.com/Anilkumar64" target="_blank" rel="noopener noreferrer"
                style={{padding:"12px 28px",borderRadius:4,background:"transparent",
                  color:C.cream,border:`1px solid ${C.dimmer}`,textDecoration:"none",
                  fontFamily:"monospace",fontWeight:600,fontSize:12,
                  letterSpacing:"0.06em",transition:"all 0.2s",}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=C.amber;e.currentTarget.style.color=C.amber;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=C.dimmer;e.currentTarget.style.color=C.cream;}}>
                GITHUB ↗
              </a>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:12,padding:"14px 18px",
              background:C.bg3,borderRadius:6,border:`1px solid ${C.border}`,
              borderLeft:`3px solid ${C.sage}`,maxWidth:320}}>
              <span style={{width:8,height:8,borderRadius:"50%",background:C.sage,
                flexShrink:0,boxShadow:`0 0 10px ${C.sage}`}}/>
              <div>
                <div style={{fontFamily:"monospace",fontSize:13,color:C.cream,letterSpacing:"0.02em"}}>Open to opportunities</div>
                <div style={{fontFamily:"monospace",fontSize:10,color:C.dim,marginTop:3,letterSpacing:"0.05em"}}>Graduated May 2026 · India</div>
              </div>
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {links.map(l=>(
              <div key={l.label} style={{background:C.bg3,border:`1px solid ${C.border}`,
                borderRadius:8,padding:"16px 16px",transition:"border-color 0.2s,transform 0.2s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=`${l.color}40`;e.currentTarget.style.transform="translateY(-3px)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.transform="none";}}>
                <div style={{fontFamily:"monospace",fontSize:9,color:l.color,
                  textTransform:"uppercase",letterSpacing:"0.18em",marginBottom:7}}>{l.label}</div>
                {l.href?(
                  <a href={l.href} target={l.href.startsWith("http")?"_blank":undefined}
                    rel="noopener noreferrer"
                    style={{fontFamily:"monospace",fontSize:11,color:C.dim,
                      textDecoration:"none",wordBreak:"break-all",transition:"color 0.2s"}}
                    onMouseEnter={e=>e.target.style.color=l.color}
                    onMouseLeave={e=>e.target.style.color=C.dim}>{l.val}</a>
                ):(
                  <span style={{fontFamily:"monospace",fontSize:11,color:C.dim}}>{l.val}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </Wrap>
    </Sec>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────────
function Footer(){
  return(
    <footer style={{background:C.bg,borderTop:`1px solid ${C.border}`,
      padding:"24px 20px",display:"flex",justifyContent:"space-between",
      alignItems:"center",flexWrap:"wrap",gap:10}}>
      <div style={{fontFamily:"monospace",fontSize:11,color:C.dimmer}}>
        <span style={{color:C.amber,fontFamily:"'Playfair Display',serif",fontStyle:"italic"}}>Anil Kumar Vennapureddy</span>
        <span> · © 2026</span>
      </div>
      <div style={{fontFamily:"monospace",fontSize:10,color:C.dimmer,letterSpacing:"0.08em"}}>
        C++ · Linux · eBPF · Open to work
      </div>
    </footer>
  );
}

// ── App ────────────────────────────────────────────────────────────────────────
export default function App(){
  useEffect(()=>{
    const l=document.createElement("link");
    l.href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap";
    l.rel="stylesheet";
    document.head.appendChild(l);
    document.body.style.margin="0";
    document.body.style.background=C.bg;
    document.body.style.overflowX="hidden";
  },[]);
  return(
    <div style={{fontFamily:"Georgia,serif",background:C.bg,color:C.cream}}>
      <Navbar/>
      <Hero/>
      <About/>
      <Skills/>
      <Strength/>
      <Projects/>
      <Contact/>
      <Footer/>
    </div>
  );
}
