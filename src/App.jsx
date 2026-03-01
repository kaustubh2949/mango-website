import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────
   GLOBAL KEYFRAME STYLES
───────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Oswald:wght@700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { display: none; }

    @keyframes slideInLeft {
      from { transform: translateX(-60px); opacity: 0; }
      to   { transform: translateX(0);    opacity: 1; }
    }
    @keyframes slideInRight {
      from { transform: translateX(60px); opacity: 0; }
      to   { transform: translateX(0);    opacity: 1; }
    }
    @keyframes fadeUp {
      from { transform: translateY(30px); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }
    @keyframes pulse {
      0%,100% { box-shadow: 0 0 0 0 rgba(249,156,0,0.7); }
      50%      { box-shadow: 0 0 0 10px rgba(249,156,0,0); }
    }
    @keyframes glow {
      0%,100% { text-shadow: 0 0 10px #f90, 0 0 30px #f904; }
      50%      { text-shadow: 0 0 25px #f90, 0 0 60px #f906; }
    }
    @keyframes blink {
      0%,100% { opacity: 1; }
      50%      { opacity: 0.3; }
    }
    @keyframes float {
      0%,100% { transform: translateY(0px) scale(1); }
      50%      { transform: translateY(-8px) scale(1.04); }
    }
    @keyframes marqueeScroll {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes ripple {
      0%   { transform: scale(0); opacity: 0.5; }
      100% { transform: scale(4); opacity: 0; }
    }
    @keyframes slideDown {
      from { transform: translateY(-20px); opacity: 0; }
      to   { transform: translateY(0);     opacity: 1; }
    }
    @keyframes cardEntrance {
      from { transform: translateY(40px) scale(0.95); opacity: 0; }
      to   { transform: translateY(0) scale(1);       opacity: 1; }
    }
    @keyframes liveGlow {
      0%,100% { background: #e00; box-shadow: 0 0 6px #e006; }
      50%      { background: #ff4444; box-shadow: 0 0 14px #ff44448a; }
    }
    @keyframes oddsFlash {
      0%,100% { background: linear-gradient(135deg,#7c4dff,#b44dff); color:#fff; }
      40%     { background: linear-gradient(135deg,#ff6d00,#ffd740); color:#000; }
    }
    @keyframes bannerFade {
      0%   { opacity: 0; transform: scale(1.04) translateX(30px); }
      12%  { opacity: 1; transform: scale(1)    translateX(0); }
      80%  { opacity: 1; transform: scale(1)    translateX(0); }
      100% { opacity: 0; transform: scale(0.97) translateX(-20px); }
    }
    @keyframes particleFloat {
      0%,100% { transform: translateY(0) rotate(0deg);   opacity: 0.15; }
      50%      { transform: translateY(-20px) rotate(180deg); opacity: 0.3; }
    }

    .nav-btn:hover        { background: linear-gradient(135deg,#7c4dff,#b44dff) !important; color:#fff !important; transform: translateY(-2px) !important; }
    .game-card:hover      { transform: scale(1.06) translateY(-5px) !important; }
    .odds-btn:hover       { transform: scale(1.08) !important; filter: brightness(1.25) !important; }
    .menu-btn:hover       { transform: translateY(-2px) !important; border-color: #f90 !important; color: #f90 !important; }
    .sport-tab:hover      { background: rgba(124,77,255,0.3) !important; color: #fff !important; }
    .bottom-nav-btn:hover { color: #f90 !important; transform: translateY(-3px) !important; }
    .match-card:hover     { border-color: #7c4dff !important; transform: translateY(-3px) !important; box-shadow: 0 10px 36px rgba(124,77,255,0.3) !important; }
    .header-btn:hover     { transform: scale(1.06) !important; }
    .sidebar-item:hover   { background: #7c4dff22 !important; color: #fff !important; padding-left: 18px !important; }
  `}</style>
);

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const BANNERS = [
  {
    type: "mango_welcome",
    title: "WELCOME TO",
    brand: "MANGO",
    sub: "ONLINE BOOK",
    bonus: "GET 10% BONUS ON NEW ID",
    bg: "linear-gradient(135deg,#0a0025 0%,#1a0050 40%,#0a1a40 100%)",
    accent: "#f90",
    emoji: "🏏",
    particle: "⭐"
  },
  {
    title: "LIVE CASINO",
    brand: "EVOLUTION",
    sub: "GAMING",
    bonus: "🃏 UNLIMITED WINS AWAIT YOU",
    bg: "linear-gradient(135deg,#200000 0%,#4a0010 45%,#001800 100%)",
    accent: "#ff4444",
    emoji: "🎰",
    particle: "💎"
  },
  {
    title: "INSTANT WIN",
    brand: "COLOR",
    sub: "PREDICTION",
    bonus: "🎲 WIN UP TO 9X YOUR BET",
    bg: "linear-gradient(135deg,#001a40 0%,#003380 45%,#000d1a 100%)",
    accent: "#00ccff",
    emoji: "🎲",
    particle: "✨"
  },
  {
    title: "MINES GAME",
    brand: "INSTANT",
    sub: "PAYOUT",
    bonus: "💣 MAX MULTIPLIER 2500X",
    bg: "linear-gradient(135deg,#001400 0%,#003300 45%,#000a00 100%)",
    accent: "#00ff88",
    emoji: "💣",
    particle: "🔥"
  },
];

const SPORT_TABS = [
  { label:"Teen Patti",  icon:"🃏" },
  { label:"Cricket",     icon:"🏏" },
  { label:"Football",    icon:"⚽" },
  { label:"Satta Matka", icon:"🎯" },
  { label:"Andar Bahar", icon:"🀄" },
  { label:"Lucky 7",     icon:"🎰" },
];

const GAME_CARDS = [
  { label:"AVIATOR",          bg:"linear-gradient(135deg,#1a0000,#6a0000)", emoji:"✈️", glow:"#ff3333" },
  { label:"MINES",            bg:"linear-gradient(135deg,#004080,#0088ff)", emoji:"💣", glow:"#0088ff" },
  { label:"FUN GAMES",        bg:"linear-gradient(135deg,#400040,#880088)", emoji:"🎮", glow:"#cc00cc" },
  { label:"COLOR PREDICTION", bg:"linear-gradient(135deg,#003300,#008844)", emoji:"🎲", glow:"#00cc66" },
];

const MENU_ITEMS = [
  { label:"Sportsbook",   icon:"🏆" },
  { label:"Evolution",    icon:"👑" },
  { label:"Casino",       icon:"🎰" },
  { label:"Royal Gaming", icon:"♠️" },
];

const LIVE_MATCHES = [
  { sport:"Cricket - IPL 2026", icon:"🏏", t1:"Royal Challengers Bengaluru",t2:"Chennai Super Kings",    time:"28/03 (19:30)", h:"2.15", hv:"3.1M",  d:"-", a:"1.80", av:"2.9M",  live:true,  matchNo:"Match 1 • SEASON OPENER", venue:"M. Chinnaswamy Stadium, Bengaluru" },
  { sport:"Cricket - IPL 2026", icon:"🏏", t1:"Mumbai Indians",             t2:"Kolkata Knight Riders",  time:"29/03 (19:30)", h:"1.95", hv:"2.0M",  d:"-", a:"2.05", av:"1.8M",  live:false, matchNo:"Match 2", venue:"Wankhede Stadium, Mumbai" },
  { sport:"Cricket - IPL 2026", icon:"🏏", t1:"Gujarat Titans",             t2:"Rajasthan Royals",       time:"29/03 (19:30)", h:"1.88", hv:"1.2M",  d:"-", a:"2.15", av:"1.1M",  live:false, matchNo:"Match 3", venue:"Narendra Modi Stadium, Ahmedabad" },
  { sport:"Cricket - IPL 2026", icon:"🏏", t1:"Delhi Capitals",             t2:"Punjab Kings",           time:"30/03 (19:30)", h:"1.98", hv:"980k",  d:"-", a:"2.02", av:"950k",  live:false, matchNo:"Match 4", venue:"Arun Jaitley Stadium, Delhi" },
  { sport:"Cricket - IPL 2026", icon:"🏏", t1:"Lucknow Super Giants",       t2:"Sunrisers Hyderabad",    time:"31/03 (19:30)", h:"2.05", hv:"1.1M",  d:"-", a:"1.92", av:"1.0M",  live:false, matchNo:"Match 5", venue:"Ekana Stadium, Lucknow" },
];

const TICKER = ["🏏 IND vs AUS - Today 7PM  |  ","⚽ UCL Quarterfinals - LIVE NOW  |  ","🎲 Color Prediction - 10X Bonus  |  ","🏆 IPL 2026 Starts 28 March  |  ","💰 New Member? Get 10% Bonus  |  ","🎰 Evolution Casino - Live Tables Open  |  "];

/* ─────────────────────────────────────────────
   RIPPLE EFFECT
───────────────────────────────────────────── */
function addRipple(e) {
  const btn = e.currentTarget;
  const old = btn.querySelector(".ripple-el");
  if (old) old.remove();
  const circle = document.createElement("span");
  const d = Math.max(btn.clientWidth, btn.clientHeight);
  const rect = btn.getBoundingClientRect();
  Object.assign(circle.style, {
    position:"absolute", width:`${d}px`, height:`${d}px`, borderRadius:"50%",
    background:"rgba(255,255,255,0.25)", pointerEvents:"none", zIndex:10,
    top:`${e.clientY - rect.top - d/2}px`, left:`${e.clientX - rect.left - d/2}px`,
    animation:"ripple 0.6s ease-out forwards",
  });
  circle.className = "ripple-el";
  btn.style.position = "relative";
  btn.style.overflow = "hidden";
  btn.appendChild(circle);
  setTimeout(() => circle.remove(), 650);
}

/* ─────────────────────────────────────────────
   LIVE BADGE
───────────────────────────────────────────── */
function LiveBadge() {
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:4, background:"#e00", borderRadius:4, padding:"2px 7px", fontSize:9, fontWeight:700, animation:"liveGlow 1.2s infinite", letterSpacing:1 }}>
      <span style={{ width:5, height:5, borderRadius:"50%", background:"#fff", animation:"blink 1s infinite", display:"inline-block" }} />
      LIVE
    </span>
  );
}

/* ─────────────────────────────────────────────
   ODDS BUTTON
───────────────────────────────────────────── */
function OddsButton({ value, volume }) {
  const [flash, setFlash] = useState(false);
  useEffect(() => {
    if (value === "-") return;
    const t = setInterval(() => {
      setFlash(true);
      setTimeout(() => setFlash(false), 420);
    }, 3000 + Math.random() * 5000);
    return () => clearInterval(t);
  }, [value]);

  if (value === "-") return (
    <div style={{ background:"#1a1a35", borderRadius:8, padding:"10px 4px", textAlign:"center", color:"#444", fontSize:14 }}>—</div>
  );

  return (
    <button
      className="odds-btn"
      onClick={addRipple}
      style={{
        background: flash ? "linear-gradient(135deg,#ff6d00,#ffd740)" : "linear-gradient(135deg,#7c4dff,#b44dff)",
        border:"none", borderRadius:8, padding:"8px 4px", cursor:"pointer",
        color: flash ? "#000" : "#fff", fontWeight:700, fontSize:14,
        display:"flex", flexDirection:"column", alignItems:"center", gap:2,
        transition:"background 0.3s, transform 0.2s, filter 0.2s", width:"100%",
      }}
    >
      <span>{value}</span>
      {volume && <span style={{ fontSize:9, opacity:0.8, fontWeight:400 }}>{volume}</span>}
    </button>
  );
}

/* ─────────────────────────────────────────────
   HERO BANNER - EXACT MATCH FROM IMAGE
───────────────────────────────────────────── */
function MangoWelcomeBanner({ animKey }) {
  return (
    <div style={{ position:"relative", overflow:"hidden", minHeight:180, background:"linear-gradient(135deg,#0a0015 0%,#1e0040 35%,#0d1040 70%,#050a20 100%)" }}>
      
      {/* Star/sparkle particles background */}
      {[...Array(16)].map((_,i) => (
        <div key={i} style={{
          position:"absolute",
          width: i%3===0 ? 3 : 2, height: i%3===0 ? 3 : 2,
          borderRadius:"50%",
          background: i%4===0 ? "#f90" : "#ffffff",
          top:`${3 + i*6}%`, left:`${2 + i*7}%`,
          opacity: 0.2 + (i%5)*0.1,
          animation:`particleFloat ${2 + i*0.3}s ease-in-out infinite`,
          animationDelay:`${i*0.15}s`,
          pointerEvents:"none",
          boxShadow: i%4===0 ? "0 0 4px #f90" : "0 0 3px #fff"
        }} />
      ))}

      {/* Diagonal light sweep */}
      <div style={{ position:"absolute", top:"-20%", left:"10%", width:"35%", height:"140%", background:"rgba(255,255,255,0.02)", transform:"rotate(18deg)", pointerEvents:"none" }} />

      {/* LEFT: Text content - EXACT as image */}
      <div key={`content-${animKey}`} style={{ position:"relative", zIndex:2, padding:"24px 18px", display:"flex", alignItems:"center", minHeight:180 }}>
        <div style={{ flex:"0 0 60%", display:"flex", flexDirection:"column", justifyContent:"center", gap:2 }}>
          <div key={`t1-${animKey}`} style={{
            fontSize:13, fontWeight:700, color:"#ffffff", letterSpacing:1, marginBottom:2,
            animation:"slideInLeft 0.4s ease both"
          }}>
            WELCOME TO
          </div>

          <div key={`t2-${animKey}`} style={{
            fontSize:42, fontWeight:900, lineHeight:0.9,
            fontFamily:"'Oswald',sans-serif", letterSpacing:3,
            background:"linear-gradient(135deg,#a0d0ff,#4a9eff,#a0d0ff)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            backgroundClip:"text",
            filter:"drop-shadow(0 0 12px #4a9effaa)",
            marginBottom:2,
            animation:"slideInLeft 0.5s ease both"
          }}>
            MANGO
          </div>

          <div key={`t3-${animKey}`} style={{
            fontSize:22, fontWeight:900, color:"#ffffff", letterSpacing:1,
            fontFamily:"'Oswald',sans-serif",
            marginBottom:8,
            animation:"slideInLeft 0.6s ease both"
          }}>
            ONLINE BOOK
          </div>

          {/* Bonus pill - EXACT green border style from image */}
          <div key={`t4-${animKey}`} style={{
            marginTop:4,
            border:"2px solid #00dd44",
            borderRadius:30, padding:"6px 16px",
            display:"inline-flex", alignItems:"center", gap:6,
            fontSize:11, fontWeight:700,
            width:"fit-content",
            animation:"fadeUp 0.8s ease both"
          }}>
            <span style={{ color:"#00dd44", fontSize:14 }}>🎁</span>
            <span style={{ color:"#00dd44" }}>GET </span>
            <span style={{ color:"#ffaa00", fontWeight:900 }}>10% BONUS</span>
            <span style={{ color:"#00dd44" }}> ON NEW ID</span>
          </div>
        </div>

        {/* RIGHT: Sports emojis collage - EXACT as image */}
        <div key={`right-${animKey}`} style={{
          flex:"0 0 40%", position:"relative", height:140,
          animation:"slideInRight 0.6s ease both"
        }}>
          {/* Cricket player - blue jersey, center */}
          <div style={{
            position:"absolute", bottom:10, left:"10%",
            fontSize:70, lineHeight:1,
            filter:"drop-shadow(0 0 15px #4488ff)",
            transform:"scaleX(-1)",
            animation:"float 3s ease-in-out infinite"
          }}>🏏</div>

          {/* Football player - top right */}
          <div style={{
            position:"absolute", top:5, right:"5%",
            fontSize:45, lineHeight:1,
            filter:"drop-shadow(0 0 10px #ff5555)",
            animation:"float 2.8s ease-in-out infinite",
            animationDelay:"0.5s"
          }}>⚽</div>

          {/* Basketball or ball - middle */}
          <div style={{
            position:"absolute", top:"35%", right:"30%",
            fontSize:30, lineHeight:1,
            opacity:0.9,
            filter:"drop-shadow(0 0 8px #f9a826)",
            animation:"float 3.2s ease-in-out infinite",
            animationDelay:"0.2s"
          }}>🏀</div>

          {/* Tennis ball - bottom */}
          <div style={{
            position:"absolute", bottom:20, right:"15%",
            fontSize:28, lineHeight:1,
            opacity:0.8,
            filter:"drop-shadow(0 0 8px #ccff00)",
            animation:"float 2.5s ease-in-out infinite",
            animationDelay:"0.7s"
          }}>🎾</div>
        </div>
      </div>
    </div>
  );
}

function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent(c => (c + 1) % BANNERS.length);
      setAnimKey(k => k + 1);
    }, 3800);
    return () => clearInterval(t);
  }, []);

  const b = BANNERS[current];
  const particles = [0,1,2,3,4,5,6];

  /* Slide 0 = exact Mango Welcome layout from image */
  if (b.type === "mango_welcome") {
    return (
      <div style={{ position:"relative" }}>
        <MangoWelcomeBanner animKey={animKey} />
        {/* Dot indicators */}
        <div style={{ position:"absolute", bottom:8, left:"50%", transform:"translateX(-50%)", display:"flex", gap:6, zIndex:3 }}>
          {BANNERS.map((_,i) => (
            <div key={i} onClick={() => { setCurrent(i); setAnimKey(k=>k+1); }}
              style={{ width:i===current?20:6, height:6, borderRadius:3, background:i===current?"#f90":"#ffffff33", transition:"all 0.4s", cursor:"pointer" }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ position:"relative", overflow:"hidden", minHeight:175 }}>
      {/* Animated bg */}
      <div key={`bg-${animKey}`} style={{ position:"absolute", inset:0, background:b.bg, animation:"bannerFade 3.8s ease forwards" }} />

      {/* Floating particles */}
      {particles.map(i => (
        <div key={i} style={{ position:"absolute", fontSize:12+i*3, opacity:0.1+i*0.02,
          top:`${8+i*11}%`, left:`${4+i*13}%`,
          animation:`particleFloat ${2.4+i*0.5}s ease-in-out infinite`, animationDelay:`${i*0.25}s`,
          pointerEvents:"none" }}>{b.particle}</div>
      ))}

      {/* Diagonal glare */}
      <div style={{ position:"absolute", top:0, left:"-30%", width:"60%", height:"200%", background:"rgba(255,255,255,0.04)", transform:"rotate(15deg)", pointerEvents:"none" }} />

      {/* Content */}
      <div style={{ position:"relative", zIndex:2, padding:"22px 18px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ flex:1 }}>
          <div key={`a-${animKey}`} style={{ fontSize:11, color:"#bbb", letterSpacing:3, animation:"slideInLeft 0.5s ease both" }}>{b.title}</div>
          <div key={`b-${animKey}`} style={{ fontSize:38, fontWeight:900, color:b.accent, lineHeight:1, fontFamily:"'Oswald',sans-serif", letterSpacing:2, animation:"glow 2s infinite, slideInLeft 0.6s ease both" }}>{b.brand}</div>
          <div key={`c-${animKey}`} style={{ fontSize:17, fontWeight:700, color:"#fff", letterSpacing:1, animation:"slideInLeft 0.7s ease both" }}>{b.sub}</div>
          <div key={`d-${animKey}`} style={{ marginTop:12, background:`linear-gradient(90deg,${b.accent}cc,${b.accent}44)`, borderRadius:20, padding:"5px 14px", display:"inline-block", fontSize:11, fontWeight:700, color:"#fff", border:`1px solid ${b.accent}66`, animation:"pulse 2s infinite, fadeUp 0.9s ease both" }}>
            {b.bonus}
          </div>
        </div>
        <div key={`e-${animKey}`} style={{ fontSize:70, lineHeight:1, animation:"slideInRight 0.6s ease both, float 3s ease-in-out infinite", filter:`drop-shadow(0 0 24px ${b.accent}99)`, flexShrink:0, marginLeft:12 }}>
          {b.emoji}
        </div>
      </div>

      {/* Dot indicators */}
      <div style={{ position:"absolute", bottom:8, left:"50%", transform:"translateX(-50%)", display:"flex", gap:6, zIndex:3 }}>
        {BANNERS.map((_,i) => (
          <div key={i} onClick={() => { setCurrent(i); setAnimKey(k=>k+1); }}
            style={{ width:i===current?20:6, height:6, borderRadius:3, background:i===current?b.accent:"#ffffff33", transition:"all 0.4s", cursor:"pointer" }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TICKER
───────────────────────────────────────────── */
function TickerBar() {
  return (
    <div style={{ background:"#090916", borderTop:"1px solid #7c4dff22", borderBottom:"1px solid #7c4dff22", padding:"6px 0", overflow:"hidden", whiteSpace:"nowrap" }}>
      <div style={{ display:"inline-block", animation:"marqueeScroll 20s linear infinite" }}>
        {[...TICKER,...TICKER].map((t,i) => <span key={i} style={{ fontSize:11, color:"#f90", marginRight:6 }}>{t}</span>)}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   INPUT
───────────────────────────────────────────── */
function Input({ placeholder, type="text" }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type} placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{ width:"100%", padding:"11px 14px", borderRadius:9, border:`1.5px solid ${focused?"#7c4dff":"#7c4dff33"}`, background:"#0d0d1a", color:"#fff", marginBottom:12, fontSize:13, outline:"none", transition:"border 0.2s, box-shadow 0.2s", boxShadow: focused?"0 0 12px #7c4dff44":"none" }}
    />
  );
}

/* ─────────────────────────────────────────────
   MODAL
───────────────────────────────────────────── */
function Modal({ title, open, onClose, children }) {
  if (!open) return null;
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.88)", zIndex:300, display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(5px)" }}>
      <div style={{ background:"linear-gradient(160deg,#16162e,#0d0d20)", borderRadius:18, padding:28, width:320, border:"2px solid #7c4dff", animation:"slideDown 0.3s ease", maxHeight:"90vh", overflowY:"auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <h2 style={{ color:"#f90", fontFamily:"'Oswald',sans-serif", letterSpacing:2 }}>{title}</h2>
          <span onClick={onClose} style={{ cursor:"pointer", fontSize:20, color:"#888", transition:"color 0.2s" }}
            onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="#888"}>✕</span>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────── */
export default function App() {
  const [activeTab,  setActiveTab]  = useState("Cricket");
  const [activeMenu, setActiveMenu] = useState("Sportsbook");
  const [loginOpen,  setLoginOpen]  = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [cardsVis,   setCardsVis]   = useState(false);

  useEffect(() => { setTimeout(() => setCardsVis(true), 400); }, []);

  return (
    <>
      <GlobalStyles />
      <div style={{ fontFamily:"'Rajdhani','Segoe UI',sans-serif", background:"#0d0d1a", minHeight:"100vh", color:"#fff", maxWidth:480, margin:"0 auto", position:"relative", overflowX:"hidden" }}>

        {/* ═══ HEADER ═══ */}
        <header style={{ background:"#0a0a20", padding:"10px 14px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:200, borderBottom:"2px solid #f9060", boxShadow:"0 4px 24px rgba(0,0,0,0.7)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span onClick={()=>setMenuOpen(o=>!o)} style={{ fontSize:22, cursor:"pointer", transition:"transform 0.35s", transform:menuOpen?"rotate(90deg)":"none", display:"inline-block" }}>☰</span>
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              <span style={{ fontSize:28, animation:"float 3s ease-in-out infinite" }}>🥭</span>
              <div>
                <div style={{ color:"#f90", fontWeight:900, fontSize:18, lineHeight:1, letterSpacing:2, fontFamily:"'Oswald',sans-serif", animation:"glow 2.5s infinite" }}>MANGO</div>
                <div style={{ color:"#888", fontSize:8, letterSpacing:3 }}>ONLINE BOOK</div>
              </div>
            </div>
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            <LiveBadge />
            <button className="header-btn" onClick={e=>{addRipple(e);setLoginOpen(true);}} style={{ background:"transparent", border:"2px solid #7c4dff", color:"#fff", borderRadius:7, padding:"6px 16px", fontWeight:700, cursor:"pointer", fontSize:13, transition:"all 0.2s" }}>Login</button>
            <button className="header-btn" onClick={e=>{addRipple(e);setSignupOpen(true);}} style={{ background:"linear-gradient(90deg,#7c4dff,#b44dff)", border:"none", color:"#fff", borderRadius:7, padding:"6px 16px", fontWeight:700, cursor:"pointer", fontSize:13, boxShadow:"0 0 16px #7c4dff66", transition:"all 0.2s" }}>Sign up</button>
          </div>
        </header>

        {/* ═══ SIDE MENU OVERLAY ═══ */}
        {menuOpen && (
          <div style={{ position:"fixed", inset:0, zIndex:250 }} onClick={()=>setMenuOpen(false)}>
            <div onClick={e=>e.stopPropagation()} style={{ position:"absolute", left:0, top:0, bottom:0, width:260, background:"linear-gradient(160deg,#11112a,#0a0a18)", padding:20, animation:"slideInLeft 0.3s ease", borderRight:"2px solid #7c4dff44", overflowY:"auto" }}>
              <div style={{ fontSize:26, marginBottom:24, fontFamily:"'Oswald',sans-serif" }}>🥭 <span style={{ color:"#f90" }}>MANGO</span></div>
              {["🏠 Home","🏏 Cricket","⚽ Football","🎾 Tennis","🏀 Basketball","🐴 Racing","🎰 Casino","🎲 Games","💰 Promotions","👤 My Account","📞 Support","⚙️ Settings"].map(item => (
                <div key={item} className="sidebar-item" style={{ padding:"12px 10px", borderRadius:8, cursor:"pointer", fontSize:14, fontWeight:600, color:"#ccc", borderBottom:"1px solid #ffffff07", transition:"all 0.2s", paddingLeft:10 }}>{item}</div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ TICKER ═══ */}
        <TickerBar />

        {/* ═══ HERO BANNER WITH ALL SLIDES ═══ */}
        <HeroBanner />

        {/* ═══ SPORT TABS ═══ */}
        <div style={{ display:"flex", overflowX:"auto", background:"#16162e", padding:"4px 6px", gap:4, borderBottom:"2px solid #7c4dff22" }}>
          {SPORT_TABS.map((tab, i) => (
            <button key={tab.label} className="sport-tab" onClick={e=>{setActiveTab(tab.label);addRipple(e);}}
              style={{ flexShrink:0, padding:"8px 12px", background:activeTab===tab.label?"linear-gradient(135deg,#7c4dff,#b44dff)":"transparent", border:"none", color:activeTab===tab.label?"#fff":"#888", fontWeight:700, fontSize:11, borderRadius:8, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:2, minWidth:62, transition:"all 0.2s", animation:`fadeUp 0.4s ease ${i*0.06}s both`, boxShadow:activeTab===tab.label?"0 0 14px #7c4dff88":"none" }}>
              <span style={{ fontSize:18 }}>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ═══ GAME CARDS ═══ */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, padding:"10px 10px 6px" }}>
          {GAME_CARDS.map((card, i) => (
            <div key={card.label} className="game-card"
              style={{ background:card.bg, borderRadius:14, padding:"18px 14px", display:"flex", alignItems:"center", justifyContent:"space-between", boxShadow:`0 0 22px ${card.glow}44`, cursor:"pointer", minHeight:74, transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)", animation:`cardEntrance 0.5s ease ${0.1+i*0.1}s both`, border:`1px solid ${card.glow}22` }}>
              <span style={{ fontWeight:900, fontSize:12, color:"#fff", maxWidth:80, lineHeight:1.3, fontFamily:"'Oswald',sans-serif", letterSpacing:1 }}>{card.label}</span>
              <span style={{ fontSize:34, animation:`float ${2.5+i*0.3}s ease-in-out infinite`, animationDelay:`${i*0.2}s` }}>{card.emoji}</span>
            </div>
          ))}
        </div>

        {/* ═══ MENU BUTTONS ═══ */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, padding:"4px 10px" }}>
          {MENU_ITEMS.map((item, i) => (
            <button key={item.label} className="menu-btn" onClick={e=>{setActiveMenu(item.label);addRipple(e);}}
              style={{ background:activeMenu===item.label?"linear-gradient(90deg,#7c4dff,#b44dff)":"#1a1a35", border:`1px solid ${activeMenu===item.label?"#7c4dff":"#7c4dff33"}`, color:"#fff", borderRadius:9, padding:"11px 12px", fontWeight:700, fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", gap:8, transition:"all 0.2s", animation:`fadeUp 0.4s ease ${0.2+i*0.08}s both`, boxShadow:activeMenu===item.label?"0 0 18px #7c4dff55":"none" }}>
              <span style={{ fontSize:16 }}>{item.icon}</span>{item.label}
            </button>
          ))}

          <button className="menu-btn" onClick={e=>{setActiveMenu("Inplay");addRipple(e);}}
            style={{ gridColumn:"1 / -1", background:activeMenu==="Inplay"?"linear-gradient(90deg,#7c4dff,#b44dff)":"#1a1a35", border:`1px solid ${activeMenu==="Inplay"?"#7c4dff":"#7c4dff33"}`, color:"#fff", borderRadius:9, padding:"11px 14px", fontWeight:700, fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", gap:10, transition:"all 0.2s", boxShadow:activeMenu==="Inplay"?"0 0 18px #7c4dff55":"none" }}>
            <span style={{ animation:"blink 1s infinite", fontSize:16 }}>📡</span>
            <span style={{ animation:"glow 2s infinite", color:"#f90", fontFamily:"'Oswald',sans-serif", letterSpacing:2 }}>((·)) INPLAY</span>
            <LiveBadge />
          </button>
        </div>

        {/* ═══ IPL SPECIAL BANNER ═══ */}
        <div style={{ background:"linear-gradient(90deg,#ff4d4d,#ff9933)", padding:"8px 12px", display:"flex", alignItems:"center", justifyContent:"space-between", margin:"10px 10px 4px", borderRadius:10, boxShadow:"0 0 20px #ff993366", animation:"cardEntrance 0.5s ease both" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:28, animation:"float 2.5s ease-in-out infinite" }}>🏆</span>
            <div>
              <div style={{ fontWeight:900, fontSize:14, color:"#000", fontFamily:"'Oswald',sans-serif", letterSpacing:1 }}>IPL 2026 — SEASON OPENER</div>
              <div style={{ fontSize:11, color:"#000", opacity:0.75 }}>MI vs CSK  •  23 Mar 19:30</div>
            </div>
          </div>
          <span style={{ background:"#000", color:"#ff9933", padding:"4px 12px", borderRadius:16, fontSize:11, fontWeight:700, animation:"pulse 2s infinite", flexShrink:0 }}>LIVE SOON</span>
        </div>

        {/* ═══ IPL MATCHES HEADER ═══ */}
        <div style={{ padding:"10px 12px 4px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:20 }}>🏏</span>
            <span style={{ fontWeight:800, fontSize:16, color:"#f90", fontFamily:"'Oswald',sans-serif", letterSpacing:1, animation:"glow 2.5s infinite" }}>IPL 2026 • TATA IPL</span>
            <LiveBadge />
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:12, background:"#7c4dff33", padding:"4px 10px", borderRadius:12, color:"#aaa", fontWeight:600 }}>10 Matches</span>
            <span style={{ fontSize:11, color:"#7c4dff", cursor:"pointer", fontWeight:700, transition:"color 0.2s" }}
              onMouseEnter={e=>e.target.style.color="#f90"} onMouseLeave={e=>e.target.style.color="#7c4dff"}>VIEW ALL →</span>
          </div>
        </div>

        {/* ═══ IPL MATCH CARDS ═══ */}
        <div style={{ padding:"4px 10px 80px" }}>
          {LIVE_MATCHES.map((match, i) => (
            <div key={i} className="match-card"
              style={{ background:"#16162e", borderRadius:12, marginBottom:10, overflow:"hidden", border:"1px solid #7c4dff22", transition:"all 0.25s", cursor:"pointer", animation:cardsVis?`cardEntrance 0.5s ease ${i*0.08}s both`:"none", opacity:cardsVis?1:0 }}>
              {/* Card Header */}
              <div style={{ background:"linear-gradient(90deg,#1e1e40,#1a1a38)", padding:"6px 12px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ fontSize:13 }}>{match.icon}</span>
                  <span style={{ fontWeight:700, fontSize:11, color:"#f90" }}>{match.sport}</span>
                  {match.live && <LiveBadge />}
                  <span style={{ fontSize:10, color:"#7c4dff", fontWeight:600 }}>{match.matchNo}</span>
                </div>
                <span style={{ fontSize:10, color:"#666" }}>{match.time}</span>
              </div>
              {/* Card Body */}
              <div style={{ padding:"10px 12px" }}>
                <div style={{ fontSize:13, fontWeight:700, marginBottom:4 }}>
                  {match.t1} <span style={{ color:"#555", fontWeight:400 }}>v</span> {match.t2}
                </div>
                <div style={{ fontSize:10, color:"#888", marginBottom:10, display:"flex", alignItems:"center", gap:4 }}>
                  📍 {match.venue}
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:6 }}>
                  <OddsButton value={match.h} volume={`Vol: ${match.hv}`} />
                  <OddsButton value={match.d} />
                  <OddsButton value={match.a} volume={`Vol: ${match.av}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ═══ BOTTOM NAV ═══ */}
        <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:480, background:"rgba(10,10,28,0.97)", borderTop:"2px solid #7c4dff33", display:"flex", justifyContent:"space-around", padding:"8px 0 4px", zIndex:100, backdropFilter:"blur(12px)" }}>
          {[{icon:"🏠",label:"Home"},{icon:"⚽",label:"Sports"},{icon:"🎰",label:"Casino"},{icon:"🎁",label:"Offers"},{icon:"👤",label:"Account"}].map((item,i) => (
            <button key={item.label} className="bottom-nav-btn"
              style={{ background:"none", border:"none", color:"#777", display:"flex", flexDirection:"column", alignItems:"center", gap:2, cursor:"pointer", fontSize:10, fontWeight:700, transition:"all 0.2s", animation:`fadeUp 0.5s ease ${i*0.07}s both` }}>
              <span style={{ fontSize:20 }}>{item.icon}</span>{item.label}
            </button>
          ))}
        </div>

        {/* ═══ SUPPORT BUBBLE ═══ */}
        <div style={{ position:"fixed", bottom:70, right:16, zIndex:150, animation:"float 3s ease-in-out infinite" }}>
          <div style={{ background:"linear-gradient(135deg,#7c4dff,#b44dff)", borderRadius:"50%", width:50, height:50, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, cursor:"pointer", boxShadow:"0 0 22px #7c4dff99", transition:"transform 0.2s" }}
            onMouseEnter={e=>e.currentTarget.style.transform="scale(1.15)"}
            onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
          >💬</div>
          <div style={{ position:"absolute", top:-8, right:-4, background:"#e00", borderRadius:"50%", width:18, height:18, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:900, animation:"liveGlow 1s infinite" }}>24</div>
        </div>

        {/* ═══ LOGIN MODAL ═══ */}
        <Modal title="LOGIN" open={loginOpen} onClose={()=>setLoginOpen(false)}>
          <Input placeholder="Username / Email" />
          <Input placeholder="Password" type="password" />
          <div style={{ textAlign:"right", marginBottom:16 }}>
            <span style={{ fontSize:12, color:"#7c4dff", cursor:"pointer" }}>Forgot Password?</span>
          </div>
          <button onClick={addRipple} style={{ width:"100%", background:"linear-gradient(90deg,#7c4dff,#b44dff)", border:"none", color:"#fff", padding:13, borderRadius:9, fontWeight:800, fontSize:15, cursor:"pointer", letterSpacing:1, boxShadow:"0 0 22px #7c4dff55", marginBottom:12, fontFamily:"'Oswald',sans-serif", position:"relative", overflow:"hidden", transition:"filter 0.2s" }}>
            LOGIN NOW
          </button>
          <div style={{ textAlign:"center", fontSize:12, color:"#888" }}>
            No account? <span onClick={()=>{setLoginOpen(false);setSignupOpen(true);}} style={{ color:"#f90", cursor:"pointer", fontWeight:700 }}>Sign Up Free →</span>
          </div>
        </Modal>

        {/* ═══ SIGNUP MODAL ═══ */}
        <Modal title="CREATE ACCOUNT" open={signupOpen} onClose={()=>setSignupOpen(false)}>
          <div style={{ background:"linear-gradient(90deg,#f9060,#ffcc0033)", border:"1px solid #f906", borderRadius:8, padding:"8px 12px", marginBottom:16, fontSize:12, fontWeight:700, color:"#f90", textAlign:"center" }}>
            🎁 10% BONUS ON FIRST DEPOSIT
          </div>
          {["Full Name","Username","Email","Mobile Number","Password","Confirm Password"].map(ph => (
            <Input key={ph} placeholder={ph} type={ph.toLowerCase().includes("password")?"password":"text"} />
          ))}
          <button onClick={addRipple} style={{ width:"100%", background:"linear-gradient(90deg,#f90,#ffcc00)", border:"none", color:"#000", padding:13, borderRadius:9, fontWeight:800, fontSize:15, cursor:"pointer", letterSpacing:1, marginBottom:10, fontFamily:"'Oswald',sans-serif", position:"relative", overflow:"hidden" }}>
            JOIN NOW — IT'S FREE
          </button>
          <div style={{ textAlign:"center", fontSize:11, color:"#555" }}>
            Already a member? <span onClick={()=>{setSignupOpen(false);setLoginOpen(true);}} style={{ color:"#7c4dff", cursor:"pointer", fontWeight:700 }}>Login Here</span>
          </div>
        </Modal>

      </div>
    </>
  );
}