import { useState, useEffect } from "react";

/* ─────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Oswald:wght@700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { display: none; }

    html { background: #eef1f7; }
    body {
      background: #eef1f7;
      min-height: 100vh;
      font-family: 'Rajdhani', 'Segoe UI', sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    .app-container {
      width: 100%;
      margin: 0 auto;
      min-height: 100vh;
      background: #eef1f7;
      position: relative;
    }
    @media (min-width: 1024px) {
      .app-container { max-width: 1200px; box-shadow: 0 0 60px rgba(0,0,0,0.08); }
    }

    /* ── White section card — the universal light wrapper ── */
    .sc {
      background: #ffffff;
      border-radius: 14px;
      border: 1px solid #e6e8f2;
      box-shadow: 0 8px 24px rgba(0,0,0,0.07);
      padding: 14px 10px;
      margin: 0 8px 22px;
    }

    /* ── Animations ── */
    @keyframes slideInLeft   { from{transform:translateX(-60px);opacity:0} to{transform:translateX(0);opacity:1} }
    @keyframes slideInRight  { from{transform:translateX( 60px);opacity:0} to{transform:translateX(0);opacity:1} }
    @keyframes fadeUp        { from{transform:translateY(30px);opacity:0}  to{transform:translateY(0);opacity:1} }
    @keyframes pulse         { 0%,100%{box-shadow:0 0 0 0 rgba(249,156,0,.7)} 50%{box-shadow:0 0 0 10px rgba(249,156,0,0)} }
    @keyframes glow          { 0%,100%{text-shadow:0 0 10px #f90,0 0 30px #f904} 50%{text-shadow:0 0 25px #f90,0 0 60px #f906} }
    @keyframes blink         { 0%,100%{opacity:1} 50%{opacity:0.3} }
    @keyframes float         { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-8px) scale(1.04)} }
    @keyframes marqueeScroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
    @keyframes ripple        { 0%{transform:scale(0);opacity:0.5} 100%{transform:scale(4);opacity:0} }
    @keyframes slideDown     { from{transform:translateY(-20px);opacity:0} to{transform:translateY(0);opacity:1} }
    @keyframes cardEntrance  { from{transform:translateY(40px) scale(0.95);opacity:0} to{transform:translateY(0) scale(1);opacity:1} }
    @keyframes liveGlow      { 0%,100%{background:#e00;box-shadow:0 0 6px #e006} 50%{background:#ff4444;box-shadow:0 0 14px #ff44448a} }
    @keyframes bannerFade    { 0%{opacity:0} 15%{opacity:1} 85%{opacity:1} 100%{opacity:0} }
    @keyframes particleFloat { 0%,100%{transform:translateY(0) rotate(0deg);opacity:.15} 50%{transform:translateY(-20px) rotate(180deg);opacity:.3} }
    @keyframes shimmer       { 0%{left:-100%} 100%{left:200%} }
    @keyframes shimmerSlide  { 0%{transform:translateX(-100%) skewX(-15deg);opacity:0} 40%{opacity:1} 100%{transform:translateX(300%) skewX(-15deg);opacity:0} }
    @keyframes orbitGlow     { 0%{transform:rotate(0deg) translateX(38px) rotate(0deg);opacity:0.7} 100%{transform:rotate(360deg) translateX(38px) rotate(-360deg);opacity:0.7} }
    @keyframes scanLine      { 0%{top:-4px;opacity:0.6} 100%{top:110%;opacity:0} }
    @keyframes textReveal    { 0%{opacity:0;transform:translateY(18px) skewX(-6deg)} 100%{opacity:1;transform:translateY(0) skewX(0)} }
    @keyframes accentPop     { 0%{opacity:0;transform:scale(0.7) rotate(-8deg)} 60%{transform:scale(1.08) rotate(2deg)} 100%{opacity:1;transform:scale(1) rotate(0)} }
    @keyframes glowRing      { 0%,100%{box-shadow:0 0 0 0 rgba(255,170,0,0.6),0 0 30px rgba(255,170,0,0.2)} 50%{box-shadow:0 0 0 8px rgba(255,170,0,0),0 0 60px rgba(255,170,0,0.35)} }
    @keyframes floatEmoji    { 0%,100%{transform:translateY(0) scale(1) rotate(-3deg)} 50%{transform:translateY(-12px) scale(1.08) rotate(3deg)} }
    @keyframes bgPan         { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
    @keyframes starburst     { 0%,100%{transform:scale(1) rotate(0deg);opacity:0.08} 50%{transform:scale(1.4) rotate(180deg);opacity:0.18} }

    /* ── Hover classes ── */
    .odds-btn:hover        { transform:scale(1.06) !important; filter:brightness(1.25) !important; }
    .menu-btn-light:hover  { background:#f0eeff !important; border-color:#7c4dff !important; color:#7c4dff !important; transform:translateY(-1px) !important; }
    .menu-btn-dark:hover   { transform:translateY(-2px) !important; border-color:#f90 !important; color:#f90 !important; }
    .bottom-nav-btn:hover  { color:#f90 !important; transform:translateY(-3px) !important; }
    .match-card:hover      { border-color:#7c4dff !important; transform:translateY(-2px) !important; box-shadow:0 8px 28px rgba(124,77,255,0.18) !important; }
    .header-btn:hover      { transform:scale(1.06) !important; }
    .sidebar-item:hover    { background:#7c4dff18 !important; color:#fff !important; padding-left:18px !important; }
    .game-card:hover       { transform:translateY(-4px) !important; box-shadow:0 14px 34px rgba(0,0,0,0.18) !important; }
    .step-row:hover        { background:#f7f6ff !important; border-color:#7c4dff55 !important; transform:translateX(4px) !important; }
    .bonus-tile:hover      { transform:translateY(-4px) !important; }
    .review-tile:hover     { border-color:#c5b8ff !important; box-shadow:0 6px 20px rgba(124,77,255,0.10) !important; }
    .feat-tile:hover       { border-color:#7c4dff66 !important; background:#f7f4ff !important; transform:translateY(-2px) !important; }
    .pay-chip:hover        { border-color:#7c4dff88 !important; background:#eeebff !important; }
  `}</style>
);

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const BANNERS = [
  { type:"join_cta"      },
  { type:"how_it_works"  },
  { type:"bonuses"       },
];

const CATEGORY_TABS = [
  { label:"Teen Patti",  glow:"#cc44ff", bg:"linear-gradient(135deg,#2a0050,#6a00aa)", scene:(<svg viewBox="0 0 80 52" width="80" height="52" style={{position:"absolute",inset:0}}><ellipse cx="40" cy="38" rx="36" ry="12" fill="#1a4a1a" opacity="0.6"/><rect x="6" y="10" width="22" height="30" rx="3" fill="#fff" opacity="0.9"/><text x="9" y="25" fontSize="13" fontWeight="900" fill="#cc0000" fontFamily="Georgia,serif">A</text><rect x="29" y="6" width="22" height="30" rx="3" fill="#fff" opacity="0.95"/><text x="32" y="21" fontSize="13" fontWeight="900" fill="#000066" fontFamily="Georgia,serif">K</text><rect x="52" y="10" width="22" height="30" rx="3" fill="#fff"/><text x="55" y="27" fontSize="13" fontWeight="900" fill="#cc0000" fontFamily="Georgia,serif">Q</text><circle cx="20" cy="44" r="5" fill="#ffcc00" stroke="#ff9900" strokeWidth="1"/><circle cx="60" cy="44" r="5" fill="#ff4444" stroke="#cc0000" strokeWidth="1"/></svg>) },
  { label:"Cricket",     glow:"#ffaa00", bg:"linear-gradient(135deg,#1a0a00,#3a1800)", scene:(<svg viewBox="0 0 80 52" width="80" height="52" style={{position:"absolute",inset:0}}><ellipse cx="40" cy="50" rx="42" ry="28" fill="#1a4a00" opacity="0.5"/><circle cx="22" cy="26" r="10" fill="#cc2200"/><path d="M14 22C17 18 27 18 30 22" stroke="#fff" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.85"/><path d="M14 30C17 34 27 34 30 30" stroke="#fff" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.85"/><rect x="47" y="11" width="12" height="22" rx="3.5" fill="#d4b060"/><rect x="34" y="20" width="12" height="30" rx="2" fill="#d4aa60" opacity="0.7"/></svg>) },
  { label:"Football",    glow:"#44dd44", bg:"linear-gradient(135deg,#001800,#004400)", scene:(<svg viewBox="0 0 80 52" width="80" height="52" style={{position:"absolute",inset:0}}><rect x="0" y="30" width="80" height="22" fill="#166a10" opacity="0.6"/><circle cx="54" cy="24" r="14" fill="#f0f0f0"/><polygon points="54,14 59,19 57,25 51,25 49,19" fill="#222" opacity="0.85"/><polygon points="62,20 66,25 62,30 58,29 57,24 60,19" fill="#222" opacity="0.85"/><polygon points="46,20 49,19 51,25 50,30 46,30 42,25" fill="#222" opacity="0.85"/></svg>) },
  { label:"Satta Matka", glow:"#ff8822", bg:"linear-gradient(135deg,#1a0800,#4a2000)", scene:(<svg viewBox="0 0 80 52" width="80" height="52" style={{position:"absolute",inset:0}}><ellipse cx="40" cy="18" rx="18" ry="7" fill="#cc5500"/><path d="M22 18C19 26 17 36 21 42C24 46 56 46 59 42C63 36 61 26 58 18Z" fill="#dd6600"/><ellipse cx="40" cy="18" rx="18" ry="7" stroke="#ff9944" strokeWidth="2.5" fill="none"/><text x="8" y="24" fontSize="12" fontWeight="900" fill="#ffcc00" opacity="0.9" fontFamily="Oswald,sans-serif">4</text><text x="61" y="24" fontSize="12" fontWeight="900" fill="#ffcc00" opacity="0.9" fontFamily="Oswald,sans-serif">2</text></svg>) },
  { label:"Andar Bahar", glow:"#00ddff", bg:"linear-gradient(135deg,#001828,#003858)", scene:(<svg viewBox="0 0 80 52" width="80" height="52" style={{position:"absolute",inset:0}}><rect x="5" y="8" width="20" height="28" rx="2.5" fill="#fff" stroke="#ccc" strokeWidth="0.6"/><text x="8" y="26" fontSize="13" fontWeight="900" fill="#cc0000" fontFamily="Georgia,serif">A</text><rect x="32" y="14" width="16" height="22" rx="2.5" fill="#fff" stroke="#ffcc00" strokeWidth="1.5"/><text x="35" y="29" fontSize="12" fontWeight="900" fill="#cc0000" fontFamily="Georgia,serif">J</text><rect x="55" y="8" width="20" height="28" rx="2.5" fill="#fff" stroke="#ccc" strokeWidth="0.6"/><text x="57" y="26" fontSize="13" fontWeight="900" fill="#000088" fontFamily="Georgia,serif">K</text></svg>) },
  { label:"Lucky 7",     glow:"#ffdd00", bg:"linear-gradient(135deg,#1a1000,#3a2800)", scene:(<svg viewBox="0 0 80 52" width="80" height="52" style={{position:"absolute",inset:0}}><rect x="4" y="6" width="72" height="40" rx="8" fill="#2a1a00" stroke="#ffaa00" strokeWidth="1.5"/><rect x="9" y="10" width="18" height="32" rx="4" fill="#111" stroke="#ff8800" strokeWidth="1.2"/><rect x="31" y="10" width="18" height="32" rx="4" fill="#111" stroke="#ff8800" strokeWidth="1.2"/><rect x="53" y="10" width="18" height="32" rx="4" fill="#111" stroke="#ff8800" strokeWidth="1.2"/><text x="12" y="31" fontSize="20" fontWeight="900" fill="#ffcc00" fontFamily="Arial,sans-serif">7</text><text x="34" y="31" fontSize="20" fontWeight="900" fill="#ffcc00" fontFamily="Arial,sans-serif">7</text><text x="56" y="31" fontSize="20" fontWeight="900" fill="#ffcc00" fontFamily="Arial,sans-serif">7</text></svg>) },
];

const GAME_CARDS = [
  { label:"AVIATOR",          sub:"Crash Game",    img:"/games/aviator_card.png",         badge:"🔥 HOT",     mult:"1000x", glow:"#ff3333", accent:"#ff8888", bg:"linear-gradient(145deg,#1c0000,#4a0008 50%,#1a0010)" },
  { label:"MINES",            sub:"Instant Win",   img:"/games/mines_card.png",           badge:"⚡ NEW",     mult:"2500x", glow:"#0088ff", accent:"#55ccff", bg:"linear-gradient(145deg,#000c20,#001a50 50%,#000820)" },
  { label:"TEEN PATTI",       sub:"Card Game",     img:"/games/teenpatti_card.png",       badge:"🃏 POPULAR", mult:"500x",  glow:"#cc44ff", accent:"#ee99ff", bg:"linear-gradient(145deg,#1a0030,#3a0065 50%,#180028)" },
  { label:"COLOR PREDICTION", sub:"Predict & Win", img:"/games/colorprediction_card.png", badge:"🔴 LIVE",    mult:"9x",    glow:"#00cc66", accent:"#55ffaa", bg:"linear-gradient(145deg,#001408,#003018 50%,#001208)" },
];

const MENU_ITEMS = [
  { label:"Sportsbook",   icon:"🏆" },
  { label:"Evolution",    icon:"👑" },
  { label:"Casino",       icon:"🎰" },
  { label:"Royal Gaming", icon:"♠️" },
];

const TEAM_COLORS = {
  "Mumbai Indians":              { bg:"linear-gradient(135deg,#003da5,#0052cc)", accent:"#003da5", badge:"#d4a843" },
  "Chennai Super Kings":         { bg:"linear-gradient(135deg,#f9a800,#e08c00)", accent:"#f9a800", badge:"#1a1a2e" },
  "Royal Challengers Bengaluru": { bg:"linear-gradient(135deg,#c8102e,#8b0000)", accent:"#c8102e", badge:"#f5a623" },
  "Kolkata Knight Riders":       { bg:"linear-gradient(135deg,#3a225d,#6a0dad)", accent:"#3a225d", badge:"#f5c518" },
  "Delhi Capitals":              { bg:"linear-gradient(135deg,#004c97,#ef3340)", accent:"#004c97", badge:"#ef3340"  },
  "Punjab Kings":                { bg:"linear-gradient(135deg,#aa0000,#dd0000)", accent:"#aa0000", badge:"#c0c0c0" },
  "Rajasthan Royals":            { bg:"linear-gradient(135deg,#254aa5,#e8578a)", accent:"#254aa5", badge:"#e8578a" },
  "Sunrisers Hyderabad":         { bg:"linear-gradient(135deg,#f7491a,#c43d10)", accent:"#f7491a", badge:"#000"    },
  "Gujarat Titans":              { bg:"linear-gradient(135deg,#1c2951,#4a90d9)", accent:"#1c2951", badge:"#4a90d9" },
  "Lucknow Super Giants":        { bg:"linear-gradient(135deg,#004b8d,#00a0e3)", accent:"#004b8d", badge:"#00a0e3" },
};

const LIVE_MATCHES = [
  { sport:"Cricket - IPL 2026", icon:"🏏", t1:"Royal Challengers Bengaluru", t2:"Chennai Super Kings",   time:"28/03 (19:30)", h:"2.15", hv:"3.1M", d:"-", a:"1.80", av:"2.9M", live:true,  matchNo:"Match 1 • SEASON OPENER", venue:"M. Chinnaswamy Stadium, Bengaluru" },
  { sport:"Cricket - IPL 2026", icon:"🏏", t1:"Mumbai Indians",              t2:"Kolkata Knight Riders", time:"29/03 (19:30)", h:"1.95", hv:"2.0M", d:"-", a:"2.05", av:"1.8M", live:false, matchNo:"Match 2",                 venue:"Wankhede Stadium, Mumbai" },
  { sport:"Cricket - IPL 2026", icon:"🏏", t1:"Gujarat Titans",              t2:"Rajasthan Royals",      time:"29/03 (19:30)", h:"1.88", hv:"1.2M", d:"-", a:"2.15", av:"1.1M", live:false, matchNo:"Match 3",                 venue:"Narendra Modi Stadium, Ahmedabad" },
  { sport:"Cricket - IPL 2026", icon:"🏏", t1:"Delhi Capitals",              t2:"Punjab Kings",          time:"30/03 (19:30)", h:"1.98", hv:"980k", d:"-", a:"2.02", av:"950k", live:false, matchNo:"Match 4",                 venue:"Arun Jaitley Stadium, Delhi" },
  { sport:"Cricket - IPL 2026", icon:"🏏", t1:"Lucknow Super Giants",        t2:"Sunrisers Hyderabad",   time:"31/03 (19:30)", h:"2.05", hv:"1.1M", d:"-", a:"1.92", av:"1.0M", live:false, matchNo:"Match 5",                 venue:"Ekana Stadium, Lucknow" },
];

const TICKER = ["🏏 World Cup Final IND vs NZ - Today 7PM  |  ","🎲 Color Prediction - 10X Bonus  |  ","🏆 IPL 2026 Starts 26 March 2026  |  ","💰 New Member? Get 10% Bonus  |  ","🎰 Evolution Casino - Live Tables Open  |  ","🔥 Teen Patti - Play & Win Big  |  "];

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */
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
    top:`${e.clientY-rect.top-d/2}px`, left:`${e.clientX-rect.left-d/2}px`,
    animation:"ripple 0.6s ease-out forwards",
  });
  circle.className = "ripple-el";
  btn.style.position = "relative";
  btn.style.overflow = "hidden";
  btn.appendChild(circle);
  setTimeout(() => circle.remove(), 650);
}

const WA = ["919119429785","917888215202"];
let waIdx = 0;
function openWhatsApp(msg = "Hello, I want to create my ID on MangoPlay!") {
  const n = WA[waIdx++ % WA.length];
  window.open(`https://wa.me/${n}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
}

/* ─────────────────────────────────────────
   SMALL COMPONENTS
───────────────────────────────────────── */
function LiveBadge() {
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:4, background:"#e00", color:"#fff", borderRadius:4, padding:"2px 7px", fontSize:9, fontWeight:700, animation:"liveGlow 1.2s infinite", letterSpacing:1 }}>
      <span style={{ width:5, height:5, borderRadius:"50%", background:"#fff", animation:"blink 1s infinite", display:"inline-block" }} />LIVE
    </span>
  );
}

/* Light section label chip */
function Chip({ color="#7c4dff", children }) {
  return (
    <span style={{ display:"inline-block", background:`${color}14`, border:`1px solid ${color}30`, borderRadius:20, padding:"3px 14px", fontSize:10, fontWeight:700, color, letterSpacing:2, marginBottom:10 }}>
      {children}
    </span>
  );
}

/* Section heading — dark text + gold accent */
function SHead({ pre, gold, suf }) {
  return (
    <div style={{ fontSize:22, fontWeight:900, fontFamily:"'Oswald',sans-serif", letterSpacing:2, lineHeight:1.1, marginBottom:4 }}>
      {pre && <span style={{ color:"#1a1a1a" }}>{pre} </span>}
      <span style={{ background:"linear-gradient(135deg,#f90,#ffcc00)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{gold}</span>
      {suf && <span style={{ color:"#1a1a1a" }}> {suf}</span>}
    </div>
  );
}

/* ── OddsCell (slightly smaller) ── */
function OddsCell({ value, volume }) {
  const [flash, setFlash] = useState(false);
  useEffect(() => {
    if (value === "-") return;
    const t = setInterval(() => { setFlash(true); setTimeout(() => setFlash(false), 420); }, 3000 + Math.random()*5000);
    return () => clearInterval(t);
  }, [value]);

  if (value === "-") {
    return (
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", background:"#f2f2f8", borderRadius:6, minHeight:32, border:"1px solid #e4e4f0" }}>
        <span style={{ color:"#ccc", fontSize:11 }}>—</span>
      </div>
    );
  }
  return (
    <button className="odds-btn" onClick={addRipple}
      style={{ background: flash ? "linear-gradient(135deg,#ff6d00,#ffd740)" : "linear-gradient(135deg,#1e1560,#2d1f80)", border: flash ? "1px solid #ffd740" : "1px solid #7c4dff55", borderRadius:6, padding:"3px 2px", cursor:"pointer", color: flash ? "#000" : "#fff", fontWeight:800, fontSize:11, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:1, transition:"background 0.3s,transform 0.2s", width:"100%", minHeight:32, position:"relative", overflow:"hidden" }}>
      <span style={{ lineHeight:1, letterSpacing:0.4, fontSize:12 }}>{value}</span>
      {volume && <span style={{ fontSize:7, opacity: flash ? 0.7 : 0.5, fontWeight:600, color: flash ? "#000" : "#a990ff" }}>{volume}</span>}
    </button>
  );
}

/* ── MatchCard — dark interior on white shell ── */
function MatchCard({ match, index, visible }) {
  const c1 = TEAM_COLORS[match.t1] || { bg:"linear-gradient(135deg,#1a1a40,#2a2a60)", accent:"#7c4dff", badge:"#f90" };
  const c2 = TEAM_COLORS[match.t2] || { bg:"linear-gradient(135deg,#1a1a40,#2a2a60)", accent:"#7c4dff", badge:"#f90" };
  return (
    <div className="match-card"
      onClick={() => openWhatsApp(`Hello, I want to bet on ${match.t1} vs ${match.t2} on MangoPlay!`)}
      style={{ borderRadius:12, marginBottom:10, overflow:"hidden", border:"1px solid #e8e8f2", transition:"all 0.25s", cursor:"pointer", animation: visible ? `cardEntrance 0.5s ease ${index*0.07}s both` : "none", opacity: visible ? 1 : 0, boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>

      {/* header row */}
      <div style={{ background:"linear-gradient(90deg,#0f0f22,#1a1a38)", padding:"5px 10px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <span style={{ fontSize:12 }}>{match.icon}</span>
          <span style={{ fontWeight:700, fontSize:10, color:"#f90", letterSpacing:0.5 }}>{match.sport}</span>
          <span style={{ fontSize:9, color:"#7c4dff99", fontWeight:600 }}>{match.matchNo}</span>
          {match.live && <LiveBadge />}
        </div>
        <span style={{ fontSize:9, color:"#888", fontWeight:600 }}>{match.time}</span>
      </div>

      {/* teams */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr" }}>
        <div style={{ background:c1.bg, padding:"9px 11px", display:"flex", flexDirection:"column", justifyContent:"center", gap:2 }}>
          <span style={{ display:"inline-block", background:c1.badge, borderRadius:3, padding:"1px 5px", fontSize:7, fontWeight:800, color: c1.accent===c1.badge ? "#fff" : c1.accent, letterSpacing:0.5, width:"fit-content", marginBottom:2 }}>HOME</span>
          <span style={{ fontSize:11, fontWeight:800, color:"#fff", lineHeight:1.25 }}>{match.t1}</span>
        </div>
        <div style={{ background:"#0a0a1e", display:"flex", alignItems:"center", justifyContent:"center", padding:"0 9px", borderLeft:"1px solid #ffffff08", borderRight:"1px solid #ffffff08" }}>
          <span style={{ fontSize:9, fontWeight:900, color:"#555", letterSpacing:2 }}>VS</span>
        </div>
        <div style={{ background:c2.bg, padding:"9px 11px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"flex-end", gap:2 }}>
          <span style={{ display:"inline-block", background:c2.badge, borderRadius:3, padding:"1px 5px", fontSize:7, fontWeight:800, color: c2.accent===c2.badge ? "#fff" : c2.accent, letterSpacing:0.5, width:"fit-content", marginBottom:2 }}>AWAY</span>
          <span style={{ fontSize:11, fontWeight:800, color:"#fff", lineHeight:1.25, textAlign:"right" }}>{match.t2}</span>
        </div>
      </div>

      {/* venue */}
      <div style={{ background:"#f8f8fc", padding:"3px 10px", fontSize:9, color:"#888", display:"flex", alignItems:"center", gap:3, borderTop:"1px solid #ebebf5" }}>📍 {match.venue}</div>

      {/* odds labels */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", padding:"5px 8px 0", gap:5, background:"#f4f4fb" }}>
        {["1","X","2"].map(l => (
          <div key={l} style={{ textAlign:"center", fontSize:9, color:"#7c4dff", fontWeight:800, letterSpacing:1, background:"#7c4dff14", borderRadius:"4px 4px 0 0", padding:"2px 0" }}>{l}</div>
        ))}
      </div>

      {/* odds cells */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", padding:"0 8px 8px", gap:5, background:"#f4f4fb" }}>
        <OddsCell value={match.h} volume={`Vol: ${match.hv}`} />
        <OddsCell value={match.d} />
        <OddsCell value={match.a} volume={`Vol: ${match.av}`} />
      </div>
    </div>
  );
}

/* ── MangoWelcomeBanner (dark hero — premium) ── */
function MangoWelcomeBanner({ animKey }) {
  return (
    <div style={{ position:"relative", overflow:"hidden", minHeight:200, background:"linear-gradient(135deg,#0a0015,#1e0040 35%,#0d1040 70%,#050a20)" }}>

      {/* Animated bg gradient pan */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(120deg,#0a0015,#2a0060,#0d1040,#1a0035)", backgroundSize:"300% 300%", animation:"bgPan 8s ease infinite", opacity:0.7, zIndex:0 }} />

      {/* Starburst decorative rings */}
      <div style={{ position:"absolute", top:"50%", left:"58%", width:180, height:180, borderRadius:"50%", border:"1px solid rgba(255,170,0,0.08)", transform:"translate(-50%,-50%)", animation:"starburst 6s ease-in-out infinite", zIndex:1 }} />
      <div style={{ position:"absolute", top:"50%", left:"58%", width:120, height:120, borderRadius:"50%", border:"1px solid rgba(100,100,255,0.10)", transform:"translate(-50%,-50%)", animation:"starburst 4s ease-in-out infinite reverse", zIndex:1 }} />

      {/* Shimmer sweep */}
      <div style={{ position:"absolute", inset:0, zIndex:2, pointerEvents:"none", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:0, bottom:0, width:"40%", background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.04),transparent)", animation:"shimmerSlide 3.5s ease-in-out infinite", animationDelay:"1s" }} />
      </div>

      {/* Scan line */}
      <div style={{ position:"absolute", left:0, right:0, height:2, background:"linear-gradient(90deg,transparent,rgba(124,77,255,0.4),transparent)", animation:"scanLine 3s linear infinite", zIndex:3, pointerEvents:"none" }} />

      {/* Particles */}
      {[...Array(20)].map((_,i) => (
        <div key={i} style={{ position:"absolute", width: i%3===0?3:2, height: i%3===0?3:2, borderRadius:"50%", background:i%4===0?"#f90":i%4===1?"#7c4dff":i%4===2?"#00dd88":"#fff", top:`${4+i*5}%`, left:`${3+i*6}%`, opacity:0.15+(i%5)*0.08, animation:`particleFloat ${2.2+i*0.25}s ease-in-out infinite`, animationDelay:`${i*0.12}s`, pointerEvents:"none" }} />
      ))}

      {/* Content */}
      <div key={`c-${animKey}`} style={{ position:"relative", zIndex:4, padding:"22px 16px", display:"flex", alignItems:"center", minHeight:200 }}>

        {/* Left text */}
        <div style={{ flex:"0 0 58%", display:"flex", flexDirection:"column", gap:2 }}>
          <div style={{ fontSize:10, fontWeight:700, color:"#a78bfa", letterSpacing:4, marginBottom:2, animation:"textReveal 0.4s cubic-bezier(.2,.8,.3,1) both", textTransform:"uppercase" }}>
            🥭 Welcome To
          </div>
          <div style={{ fontSize:46, fontWeight:900, lineHeight:0.88, fontFamily:"'Oswald',sans-serif", letterSpacing:3, background:"linear-gradient(135deg,#ffffff,#c0a0ff,#7c4dff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", animation:"textReveal 0.5s cubic-bezier(.2,.8,.3,1) both", animationDelay:"0.05s", filter:"drop-shadow(0 0 20px rgba(124,77,255,0.6))" }}>
            MANGO
          </div>
          <div style={{ fontSize:16, fontWeight:900, color:"#e0d0ff", letterSpacing:2, fontFamily:"'Oswald',sans-serif", animation:"textReveal 0.5s cubic-bezier(.2,.8,.3,1) both", animationDelay:"0.1s" }}>
            ONLINE BOOK
          </div>

          {/* Bonus badge */}
          <div style={{ marginTop:8, display:"inline-flex", alignItems:"center", gap:6, background:"rgba(255,170,0,0.12)", border:"1.5px solid rgba(255,170,0,0.4)", borderRadius:20, padding:"4px 12px", width:"fit-content", animation:"accentPop 0.6s cubic-bezier(.2,.8,.3,1) both", animationDelay:"0.2s", boxShadow:"0 0 16px rgba(255,170,0,0.2)" }}>
            <span style={{ fontSize:12 }}>🎁</span>
            <span style={{ fontSize:10, fontWeight:800, color:"#ffcc00", letterSpacing:0.5 }}>10% BONUS ON NEW ID</span>
          </div>

          {/* CTA button */}
          <button onClick={() => openWhatsApp("Hello, I want to create my ID on MangoPlay!")}
            style={{ marginTop:10, background:"linear-gradient(135deg,#25D366,#128C7E)", border:"none", color:"#fff", padding:"9px 18px", borderRadius:30, fontWeight:800, fontSize:11, cursor:"pointer", fontFamily:"'Oswald',sans-serif", letterSpacing:1.2, boxShadow:"0 4px 20px rgba(37,211,102,0.45)", display:"inline-flex", alignItems:"center", gap:6, animation:"accentPop 0.6s cubic-bezier(.2,.8,.3,1) both", animationDelay:"0.3s", width:"fit-content" }}>
            <span style={{ fontSize:14 }}>💬</span> CREATE ID ON WHATSAPP
          </button>
        </div>

        {/* Right emoji cluster */}
        <div style={{ flex:"0 0 42%", position:"relative", height:160, animation:"textReveal 0.6s ease both", animationDelay:"0.15s" }}>
          {/* Glow ring behind main emoji */}
          <div style={{ position:"absolute", bottom:14, left:"8%", width:72, height:72, borderRadius:"50%", background:"radial-gradient(circle,rgba(68,136,255,0.3),transparent 70%)", animation:"glowRing 2.5s ease-in-out infinite" }} />
          <div style={{ position:"absolute", bottom:8, left:"6%", fontSize:68, lineHeight:1, filter:"drop-shadow(0 0 18px #4488ff) drop-shadow(0 4px 12px rgba(0,0,0,0.5))", transform:"scaleX(-1)", animation:"floatEmoji 3s ease-in-out infinite" }}>🏏</div>
          <div style={{ position:"absolute", top:4, right:"4%", fontSize:42, filter:"drop-shadow(0 0 12px #ff5555)", animation:"floatEmoji 2.8s ease-in-out infinite", animationDelay:"0.5s" }}>⚽</div>
          <div style={{ position:"absolute", top:"38%", right:"32%", fontSize:28, filter:"drop-shadow(0 0 10px #f9a826)", animation:"floatEmoji 3.2s ease-in-out infinite", animationDelay:"0.2s" }}>🏀</div>
          <div style={{ position:"absolute", bottom:22, right:"12%", fontSize:24, filter:"drop-shadow(0 0 8px #ccff00)", animation:"floatEmoji 2.5s ease-in-out infinite", animationDelay:"0.7s" }}>🎾</div>
          {/* Sparkle dots around emojis */}
          <div style={{ position:"absolute", top:"15%", left:"20%", width:4, height:4, borderRadius:"50%", background:"#f90", animation:"blink 1.4s ease-in-out infinite", boxShadow:"0 0 6px #f90" }} />
          <div style={{ position:"absolute", bottom:"30%", right:"22%", width:3, height:3, borderRadius:"50%", background:"#7c4dff", animation:"blink 1.8s ease-in-out infinite", animationDelay:"0.6s", boxShadow:"0 0 6px #7c4dff" }} />
          <div style={{ position:"absolute", top:"55%", left:"12%", width:3, height:3, borderRadius:"50%", background:"#00dd88", animation:"blink 2.1s ease-in-out infinite", animationDelay:"0.3s", boxShadow:"0 0 6px #00dd88" }} />
        </div>
      </div>
    </div>
  );
}

/* ── shared dark slide shell ── */
function SlideShell({ animKey, accentColor, children, dots }) {
  return (
    <div style={{ position:"relative", overflow:"hidden", minHeight:200, background:"linear-gradient(135deg,#060010 0%,#1a0845 35%,#0b1040 65%,#001828 100%)" }}>
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(120deg,#0a0015,#2a0060,#0d1040,#001828)", backgroundSize:"300% 300%", animation:"bgPan 8s ease infinite", opacity:0.7, pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:"10%", left:"5%", width:140, height:140, borderRadius:"50%", background:`radial-gradient(circle,${accentColor}22,transparent 70%)`, pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"5%", right:"6%", width:110, height:110, borderRadius:"50%", background:"radial-gradient(circle,rgba(37,211,102,0.15),transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:2 }}>
        <div style={{ position:"absolute", top:0, bottom:0, width:"35%", background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.04),transparent)", animation:"shimmerSlide 3.5s ease-in-out infinite", animationDelay:"1s" }} />
      </div>
      <div style={{ position:"absolute", left:0, right:0, height:1.5, background:`linear-gradient(90deg,transparent,${accentColor}66,transparent)`, animation:"scanLine 3s linear infinite", zIndex:3, pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg,transparent,#7c4dff,#f90,#25D366,transparent)", zIndex:4 }} />
      {[...Array(12)].map((_,i) => (
        <div key={i} style={{ position:"absolute", width:i%3===0?3:2, height:i%3===0?3:2, borderRadius:"50%", background:i%4===0?"#f90":i%4===1?"#7c4dff":i%4===2?"#25D366":"#fff", top:`${4+i*8}%`, left:`${4+i*9}%`, opacity:0.08+(i%4)*0.05, animation:`particleFloat ${2+i*0.28}s ease-in-out infinite`, animationDelay:`${i*0.13}s`, pointerEvents:"none" }} />
      ))}
      <div key={`s-${animKey}`} style={{ position:"relative", zIndex:4, minHeight:200, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"16px 18px 28px", textAlign:"center" }}>
        {children}
      </div>
      {dots}
    </div>
  );
}

/* ── SLIDE 2 — JOIN MANGO TODAY ── */
function JoinCtaSlide({ animKey, dots }) {
  return (
    <SlideShell animKey={animKey} accentColor="#25D366" dots={dots}>
      <div style={{ display:"inline-flex", alignItems:"center", gap:5, background:"rgba(255,170,0,0.10)", border:"1px solid rgba(255,170,0,0.28)", borderRadius:20, padding:"3px 12px", marginBottom:8, animation:"textReveal 0.4s cubic-bezier(.2,.8,.3,1) both" }}>
        <span style={{ fontSize:11 }}>🥭</span>
        <span style={{ fontSize:8, fontWeight:700, color:"#f90", letterSpacing:2, textTransform:"uppercase" }}>India's Trusted Online Book · Since 2001</span>
      </div>
      <div style={{ fontFamily:"'Oswald',sans-serif", letterSpacing:2, lineHeight:1, marginBottom:4, animation:"textReveal 0.45s cubic-bezier(.2,.8,.3,1) both", animationDelay:"0.06s" }}>
        <span style={{ fontSize:32, fontWeight:900, color:"#fff" }}>JOIN </span>
        <span style={{ fontSize:32, fontWeight:900, background:"linear-gradient(135deg,#f90,#ffcc00)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", filter:"drop-shadow(0 0 16px rgba(255,153,0,0.55))" }}>MANGO </span>
        <span style={{ fontSize:32, fontWeight:900, color:"#fff" }}>TODAY</span>
      </div>
      <div style={{ fontSize:10, color:"#90a8c8", fontWeight:600, letterSpacing:1, marginBottom:14, animation:"textReveal 0.45s cubic-bezier(.2,.8,.3,1) both", animationDelay:"0.1s" }}>
        ⚡ Instant ID &nbsp;·&nbsp; 💸 Same-Day Withdrawal &nbsp;·&nbsp; 🎧 24/7 Support
      </div>
      <button onClick={() => openWhatsApp("Hello, I want to create my ID on MangoPlay!")}
        style={{ position:"relative", overflow:"hidden", display:"inline-flex", alignItems:"center", gap:8, background:"linear-gradient(135deg,#25D366,#128C7E)", border:"none", color:"#fff", padding:"11px 22px", borderRadius:40, fontWeight:900, fontSize:12, cursor:"pointer", fontFamily:"'Oswald',sans-serif", letterSpacing:1.2, boxShadow:"0 0 0 3px rgba(37,211,102,0.2),0 6px 26px rgba(37,211,102,0.5)", marginBottom:14, animation:"accentPop 0.55s cubic-bezier(.2,.8,.3,1) both", animationDelay:"0.18s" }}>
        <div style={{ position:"absolute", top:0, left:"-100%", width:"60%", height:"100%", background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)", animation:"shimmer 2.2s infinite" }} />
        <span style={{ fontSize:16, position:"relative", zIndex:1 }}>💬</span>
        <span style={{ position:"relative", zIndex:1 }}>GET YOUR ID ON WHATSAPP</span>
      </button>
      <div style={{ display:"flex", justifyContent:"center", gap:8, flexWrap:"wrap", animation:"accentPop 0.55s cubic-bezier(.2,.8,.3,1) both", animationDelay:"0.24s" }}>
        {[{ icon:"👥", val:"50K+", label:"Players" },{ icon:"💰", val:"₹2Cr+", label:"Paid Daily" },{ icon:"🎁", val:"10%", label:"Welcome Bonus" }].map(s => (
          <div key={s.label} style={{ display:"flex", alignItems:"center", gap:5, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.10)", borderRadius:10, padding:"5px 11px" }}>
            <span style={{ fontSize:12 }}>{s.icon}</span>
            <div style={{ lineHeight:1.2, textAlign:"left" }}>
              <div style={{ fontSize:11, fontWeight:900, color:"#f90", fontFamily:"'Oswald',sans-serif" }}>{s.val}</div>
              <div style={{ fontSize:7, color:"#778899", letterSpacing:0.5, textTransform:"uppercase" }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}

/* ── SLIDE 3 — HOW IT WORKS ── */
function HowItWorksSlide({ animKey, dots }) {
  const steps = [
    { num:"01", icon:"💬", title:"Message Us",    desc:"Click WhatsApp & send a message to create your free ID instantly", color:"#25D366" },
    { num:"02", icon:"💳", title:"Add Funds",     desc:"Deposit via PhonePe, GPay, Paytm or UPI — minimum just ₹100",    color:"#f90"    },
    { num:"03", icon:"🏆", title:"Start Winning", desc:"Place bets on IPL, Casino, Color Prediction & win real cash",      color:"#7c4dff" },
  ];
  return (
    <SlideShell animKey={animKey} accentColor="#7c4dff" dots={dots}>
      {/* Chip */}
      <div style={{ display:"inline-flex", alignItems:"center", gap:5, background:"rgba(124,77,255,0.12)", border:"1px solid rgba(124,77,255,0.3)", borderRadius:20, padding:"3px 12px", marginBottom:6, animation:"textReveal 0.4s cubic-bezier(.2,.8,.3,1) both" }}>
        <span style={{ fontSize:9, fontWeight:700, color:"#a78bfa", letterSpacing:2, textTransform:"uppercase" }}>⚡ Simple &amp; Fast</span>
      </div>
      {/* Heading */}
      <div style={{ fontFamily:"'Oswald',sans-serif", letterSpacing:2, lineHeight:1, marginBottom:2, animation:"textReveal 0.4s cubic-bezier(.2,.8,.3,1) both", animationDelay:"0.05s" }}>
        <span style={{ fontSize:26, fontWeight:900, color:"#fff" }}>HOW IT </span>
        <span style={{ fontSize:26, fontWeight:900, background:"linear-gradient(135deg,#f90,#ffcc00)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>WORKS</span>
      </div>
      <div style={{ fontSize:9, color:"#90a8c8", fontWeight:600, marginBottom:10, animation:"textReveal 0.4s both", animationDelay:"0.08s" }}>Get started in under 2 minutes</div>
      {/* Steps */}
      <div style={{ display:"flex", flexDirection:"column", gap:6, width:"100%", maxWidth:340, animation:"textReveal 0.45s cubic-bezier(.2,.8,.3,1) both", animationDelay:"0.12s" }}>
        {steps.map((s,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:10, background:"rgba(255,255,255,0.05)", border:`1px solid ${s.color}22`, borderRadius:10, padding:"7px 11px", textAlign:"left" }}>
            <span style={{ fontSize:9, fontWeight:900, fontFamily:"'Oswald',sans-serif", color:s.color, opacity:0.5, minWidth:18 }}>{s.num}</span>
            <span style={{ fontSize:16 }}>{s.icon}</span>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:11, fontWeight:800, color:"#fff", lineHeight:1.1 }}>{s.title}</div>
              <div style={{ fontSize:8, color:"#778899", lineHeight:1.3, marginTop:1 }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
      {/* CTA */}
      <button onClick={() => openWhatsApp("Hello, I want to create my ID on MangoPlay!")}
        style={{ position:"relative", overflow:"hidden", display:"inline-flex", alignItems:"center", gap:8, background:"linear-gradient(135deg,#25D366,#128C7E)", border:"none", color:"#fff", padding:"9px 20px", borderRadius:40, fontWeight:900, fontSize:11, cursor:"pointer", fontFamily:"'Oswald',sans-serif", letterSpacing:1.2, boxShadow:"0 4px 20px rgba(37,211,102,0.45)", marginTop:10, animation:"accentPop 0.5s cubic-bezier(.2,.8,.3,1) both", animationDelay:"0.2s" }}>
        <div style={{ position:"absolute", top:0, left:"-100%", width:"60%", height:"100%", background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)", animation:"shimmer 2.2s infinite" }} />
        <span style={{ fontSize:14, position:"relative", zIndex:1 }}>💬</span>
        <span style={{ position:"relative", zIndex:1 }}>CREATE YOUR ID NOW</span>
      </button>
    </SlideShell>
  );
}

/* ── SLIDE 4 — BONUSES & REWARDS ── */
function BonusesSlide({ animKey, dots }) {
  const bonuses = [
    { icon:"🎁", val:"10%",  title:"Welcome Bonus", desc:"On your first deposit", color:"#f90"    },
    { icon:"👥", val:"₹200", title:"Refer & Earn",  desc:"Per friend you refer",  color:"#25D366" },
    { icon:"💰", val:"5%",   title:"Daily Reload",  desc:"On every redeposit",    color:"#00ccff" },
    { icon:"🏆", val:"2%",   title:"Win Cashback",  desc:"On every losing bet",   color:"#b44dff" },
  ];
  return (
    <SlideShell animKey={animKey} accentColor="#f90" dots={dots}>
      {/* Chip */}
      <div style={{ display:"inline-flex", alignItems:"center", gap:5, background:"rgba(255,153,0,0.10)", border:"1px solid rgba(255,153,0,0.3)", borderRadius:20, padding:"3px 12px", marginBottom:6, animation:"textReveal 0.4s cubic-bezier(.2,.8,.3,1) both" }}>
        <span style={{ fontSize:9, fontWeight:700, color:"#f90", letterSpacing:2, textTransform:"uppercase" }}>🔥 Exclusive Offers</span>
      </div>
      {/* Heading */}
      <div style={{ fontFamily:"'Oswald',sans-serif", letterSpacing:2, lineHeight:1, marginBottom:2, animation:"textReveal 0.4s cubic-bezier(.2,.8,.3,1) both", animationDelay:"0.05s" }}>
        <span style={{ fontSize:26, fontWeight:900, background:"linear-gradient(135deg,#f90,#ffcc00)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>BONUSES </span>
        <span style={{ fontSize:26, fontWeight:900, color:"#fff" }}>&amp; REWARDS</span>
      </div>
      <div style={{ fontSize:9, color:"#90a8c8", fontWeight:600, marginBottom:10, animation:"textReveal 0.4s both", animationDelay:"0.08s" }}>More ways to win every day</div>
      {/* 2×2 grid */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, width:"100%", maxWidth:320, animation:"accentPop 0.5s cubic-bezier(.2,.8,.3,1) both", animationDelay:"0.12s" }}>
        {bonuses.map((b,i) => (
          <div key={i}
            onClick={() => openWhatsApp(`Hello, I want to claim the ${b.title} on MangoPlay!`)}
            style={{ background:"rgba(255,255,255,0.05)", border:`1px solid ${b.color}25`, borderRadius:10, padding:"8px 8px 6px", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
            <span style={{ fontSize:18 }}>{b.icon}</span>
            <div style={{ fontSize:13, fontWeight:900, color:b.color, fontFamily:"'Oswald',sans-serif", lineHeight:1 }}>{b.val}</div>
            <div style={{ fontSize:9, fontWeight:800, color:"#e0d8ff", lineHeight:1.1 }}>{b.title}</div>
            <div style={{ fontSize:7, color:"#556677", lineHeight:1.2, marginBottom:2 }}>{b.desc}</div>
            <div style={{ background:`${b.color}18`, border:`1px solid ${b.color}33`, borderRadius:6, padding:"2px 8px", fontSize:7, fontWeight:700, color:b.color, letterSpacing:0.5 }}>CLAIM NOW</div>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}

/* ── dot accent colors per slide index ── */
const SLIDE_ACCENT = ["#25D366", "#7c4dff", "#f90"];

function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  useEffect(() => {
    const t = setInterval(() => { setCurrent(c => (c+1)%BANNERS.length); setAnimKey(k => k+1); }, 4000);
    return () => clearInterval(t);
  }, []);
  const b = BANNERS[current];
  const dots = (
    <div style={{ position:"absolute", bottom:8, left:"50%", transform:"translateX(-50%)", display:"flex", gap:6, zIndex:5 }}>
      {BANNERS.map((_,i) => (
        <div key={i} onClick={() => { setCurrent(i); setAnimKey(k=>k+1); }}
          style={{ width:i===current?20:6, height:6, borderRadius:3, background:i===current?SLIDE_ACCENT[i]:"#ffffff33", transition:"all 0.4s", cursor:"pointer" }} />
      ))}
    </div>
  );
  if (b.type === "mango_welcome")  return <div style={{ position:"relative" }}><MangoWelcomeBanner animKey={animKey} />{dots}</div>;
  if (b.type === "join_cta")       return <JoinCtaSlide      animKey={animKey} dots={dots} />;
  if (b.type === "how_it_works")   return <HowItWorksSlide   animKey={animKey} dots={dots} />;
  if (b.type === "bonuses")        return <BonusesSlide      animKey={animKey} dots={dots} />;
  return null;
}

/* ── TickerBar — dark, below hero ── */
function TickerBar() {
  return (
    <div style={{ background:"#13132b", padding:"6px 0", overflow:"hidden", whiteSpace:"nowrap" }}>
      <div style={{ display:"inline-block", animation:"marqueeScroll 20s linear infinite" }}>
        {[...TICKER,...TICKER].map((t,i) => <span key={i} style={{ fontSize:11, color:"#f90", marginRight:6 }}>{t}</span>)}
      </div>
    </div>
  );
}

/* ── CategoryBar — dark strip ── */
function CategoryBar({ activeTab, setActiveTab }) {
  const [hov, setHov] = useState(null);
  return (
    <div style={{ display:"flex", overflowX:"auto", background:"#1a1a2e", padding:"6px 8px", gap:8, borderBottom:"2px solid #7c4dff22" }}>
      {CATEGORY_TABS.map((tab, i) => {
        const active = activeTab === tab.label;
        const lit    = active || hov === i;
        return (
          <button key={tab.label}
            onClick={() => { setActiveTab(tab.label); openWhatsApp(`Hello, I want to play ${tab.label} on MangoPlay!`); }}
            onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
            style={{ flexShrink:0, padding:0, background:"none", border:"none", cursor:"pointer", outline:"none", display:"flex", flexDirection:"column", alignItems:"center", gap:4, animation:`fadeUp 0.4s ease ${i*0.07}s both` }}>
            <div style={{ width:82, height:58, borderRadius:10, position:"relative", overflow:"hidden", border: lit ? `2px solid ${tab.glow}` : "2px solid rgba(255,255,255,0.07)", boxShadow: active ? `0 0 22px ${tab.glow}99` : "0 2px 8px rgba(0,0,0,0.5)", transform: lit ? "translateY(-4px)" : "none", transition:"all 0.3s cubic-bezier(.2,.8,.3,1)" }}>
              <div style={{ position:"absolute", inset:0, background:tab.bg }}/>
              <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>{tab.scene}</div>
              <div style={{ position:"absolute", bottom:0, left:0, right:0, height:22, background:"linear-gradient(to top,rgba(0,0,0,0.85),transparent)", zIndex:3 }}/>
              <div style={{ position:"absolute", bottom:4, left:0, right:0, textAlign:"center", zIndex:4, fontSize:8, fontWeight:900, color:"#fff", letterSpacing:0.5, textTransform:"uppercase", fontFamily:"'Oswald',sans-serif" }}>{tab.label}</div>
            </div>
            <span style={{ fontSize:9, fontWeight:700, color: active ? tab.glow : "#888", whiteSpace:"nowrap", textTransform:"uppercase" }}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ── Modal / Input (dark — stays dark) ── */
function Input({ placeholder, type="text" }) {
  const [focused, setFocused] = useState(false);
  return (
    <input type={type} placeholder={placeholder}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      style={{ width:"100%", padding:"11px 14px", borderRadius:9, border:`1.5px solid ${focused?"#7c4dff":"#7c4dff33"}`, background:"#0d0d1a", color:"#fff", marginBottom:12, fontSize:13, outline:"none", transition:"border 0.2s", boxShadow: focused?"0 0 12px #7c4dff44":"none" }} />
  );
}
function Modal({ title, open, onClose, children }) {
  if (!open) return null;
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.88)", zIndex:300, display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(5px)" }}>
      <div style={{ background:"linear-gradient(160deg,#16162e,#0d0d20)", borderRadius:18, padding:28, width:320, border:"2px solid #7c4dff", animation:"slideDown 0.3s ease", maxHeight:"90vh", overflowY:"auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <h2 style={{ color:"#f90", fontFamily:"'Oswald',sans-serif", letterSpacing:2 }}>{title}</h2>
          <span onClick={onClose} style={{ cursor:"pointer", fontSize:20, color:"#888" }}>✕</span>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ── GameCard — dark card, subtle hover ── */
function GameCard({ card, index }) {
  const [hov, setHov] = useState(false);
  return (
    <div className="game-card"
      onClick={() => openWhatsApp(`Hello, I want to play ${card.label} on MangoPlay!`)}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position:"relative", borderRadius:16, overflow:"hidden", height:170, cursor:"pointer", background:card.bg, animation:`cardEntrance 0.5s ease ${0.05+index*0.1}s both`, transform: hov ? "translateY(-4px)" : "none", boxShadow: hov ? `0 14px 34px rgba(0,0,0,0.18), 0 0 0 1.5px ${card.glow}` : `0 5px 20px ${card.glow}33`, transition:"transform 0.28s cubic-bezier(.2,.8,.3,1),box-shadow 0.28s ease" }}>
      <img src={card.img} alt={card.label} style={{ position:"absolute", width:"100%", height:"100%", objectFit:"cover", zIndex:1 }} />
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:70, background:"linear-gradient(to top,rgba(0,0,0,0.97),rgba(0,0,0,0.5) 65%,transparent)", zIndex:6 }}/>
      <div style={{ position:"absolute", inset:0, borderRadius:16, zIndex:7, pointerEvents:"none", border: hov ? `1.5px solid ${card.glow}` : "1.5px solid rgba(255,255,255,0.06)", transition:"border 0.28s" }}/>
      <div style={{ position:"absolute", top:9, left:9,  zIndex:9, background:`linear-gradient(135deg,${card.glow},${card.glow}88)`, borderRadius:7, padding:"2px 9px", fontSize:8, fontWeight:900, color:"#000" }}>{card.badge}</div>
      <div style={{ position:"absolute", top:9, right:9, zIndex:9, background:"rgba(0,0,0,0.75)", border:`1px solid ${card.glow}55`, borderRadius:7, padding:"2px 8px", fontSize:9, fontWeight:900, color:card.accent }}>UP TO {card.mult}</div>
      <div style={{ position:"absolute", zIndex:9, bottom: hov ? 33 : 10, left:10, right:10, transition:"bottom 0.28s cubic-bezier(.2,.8,.3,1)" }}>
        <div style={{ fontSize:14, fontWeight:900, color:"#fff", fontFamily:"'Oswald',sans-serif", letterSpacing:1.5, lineHeight:1, textShadow:`0 0 18px ${card.glow}` }}>{card.label}</div>
        <div style={{ fontSize:9, color:card.accent, marginTop:3, fontWeight:600 }}>{card.sub}</div>
      </div>
      <div style={{ position:"absolute", bottom:0, left:0, right:0, zIndex:9, background:`linear-gradient(90deg,${card.glow}ee,${card.glow}aa)`, padding:"8px 0", textAlign:"center", fontSize:11, fontWeight:900, color:"#000", letterSpacing:1.5, fontFamily:"'Oswald',sans-serif", transform: hov ? "translateY(0%)" : "translateY(100%)", opacity: hov ? 1 : 0, transition:"transform 0.28s cubic-bezier(.2,.8,.3,1),opacity 0.28s ease" }}>▶ &nbsp;PLAY NOW</div>
    </div>
  );
}

/* ─────────────────────────────────────────
   LIGHT SECTION COMPONENTS
───────────────────────────────────────── */

/* PromoBanner — dark pill on light bg */
function PromoBanner() {
  return (
    <div className="sc" style={{ background:"linear-gradient(135deg,#1a1535,#0f0f22)", padding:"14px 20px" }}>
      <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"center", gap:"5px 14px", textAlign:"center" }}>
        <span style={{ fontSize:12, fontWeight:900, color:"#f90", letterSpacing:1.5, fontFamily:"'Oswald',sans-serif", whiteSpace:"nowrap" }}>🥭 JOIN MANGO TODAY –</span>
        <span style={{ color:"#ffffff25", fontSize:14 }}>•</span>
        <span style={{ fontSize:11, fontWeight:700, color:"#ffd580", whiteSpace:"nowrap" }}>GET YOUR ID ON WHATSAPP</span>
        <span style={{ color:"#ffffff25", fontSize:14 }}>•</span>
        <span style={{ fontSize:11, fontWeight:700, color:"#00e090", whiteSpace:"nowrap" }}>⚡ INSTANT WITHDRAWAL</span>
        <span style={{ color:"#ffffff25", fontSize:14 }}>•</span>
        <span style={{ fontSize:11, fontWeight:700, color:"#99bbff", whiteSpace:"nowrap" }}>🎧 24/7 SUPPORT</span>
        <span style={{ color:"#ffffff25", fontSize:14 }}>•</span>
        <span style={{ fontSize:11, fontWeight:700, color:"#f90", whiteSpace:"nowrap" }}>SINCE 2001</span>
      </div>
    </div>
  );
}

/* HowItWorks */
function HowItWorks() {
  const steps = [
    { num:"01", icon:"💬", title:"Message Us",   desc:"Click WhatsApp & send us a message to create your free ID instantly", color:"#25D366" },
    { num:"02", icon:"💳", title:"Add Funds",    desc:"Deposit via PhonePe, GPay, Paytm or UPI — minimum just ₹100",       color:"#f90"    },
    { num:"03", icon:"🏆", title:"Start Winning",desc:"Place bets on IPL, Casino, Color Prediction & win real cash",        color:"#7c4dff" },
  ];
  return (
    <div className="sc">
      <div style={{ textAlign:"center", marginBottom:20 }}>
        <Chip color="#7c4dff">⚡ SIMPLE &amp; FAST</Chip>
        <SHead pre="HOW IT" gold="WORKS" />
        <p style={{ fontSize:11, color:"#6b6b6b", marginTop:4 }}>Get started in under 2 minutes</p>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {steps.map((s, i) => (
          <div key={i} className="step-row"
            style={{ display:"flex", alignItems:"center", gap:14, background:"#fafafa", border:`1.5px solid ${s.color}22`, borderRadius:12, padding:"13px 14px", transition:"all 0.2s", cursor:"default" }}>
            <div style={{ fontSize:26, fontWeight:900, fontFamily:"'Oswald',sans-serif", color:s.color, opacity:0.18, minWidth:30, lineHeight:1 }}>{s.num}</div>
            <div style={{ width:42, height:42, borderRadius:"50%", background:`${s.color}14`, border:`2px solid ${s.color}35`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:19, flexShrink:0 }}>{s.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:800, color:"#1a1a1a", marginBottom:2 }}>{s.title}</div>
              <div style={{ fontSize:10, color:"#6b6b6b", lineHeight:1.5 }}>{s.desc}</div>
            </div>
            <div style={{ fontSize:16, color:s.color, opacity:0.5 }}>→</div>
          </div>
        ))}
      </div>
      <div style={{ textAlign:"center", marginTop:18 }}>
        <button onClick={() => openWhatsApp("Hello, I want to create my ID on MangoPlay!")}
          style={{ background:"linear-gradient(135deg,#25D366,#128C7E)", border:"none", color:"#fff", padding:"12px 28px", borderRadius:40, fontWeight:800, fontSize:13, cursor:"pointer", fontFamily:"'Oswald',sans-serif", letterSpacing:1, boxShadow:"0 4px 20px rgba(37,211,102,0.35)", display:"inline-flex", alignItems:"center", gap:8 }}>
          <span>💬</span> CREATE YOUR ID NOW
        </button>
      </div>
    </div>
  );
}

/* BonusSection */
function BonusSection() {
  const bonuses = [
    { icon:"🎁", title:"Welcome Bonus", value:"10%",  desc:"On your first deposit", color:"#f90",    bg:"linear-gradient(145deg,#fff8ee,#fff3dc)" },
    { icon:"👥", title:"Refer & Earn",  value:"₹200", desc:"Per friend you refer",  color:"#25D366", bg:"linear-gradient(145deg,#f0fff5,#dff8ea)" },
    { icon:"💰", title:"Daily Reload",  value:"5%",   desc:"On every redeposit",    color:"#0099ee", bg:"linear-gradient(145deg,#eef6ff,#dceeff)" },
    { icon:"🏆", title:"Win Cashback",  value:"2%",   desc:"On every losing bet",   color:"#9b44ff", bg:"linear-gradient(145deg,#f6eeff,#eedeff)" },
  ];
  return (
    <div className="sc">
      <div style={{ textAlign:"center", marginBottom:18 }}>
        <Chip color="#f90">🔥 EXCLUSIVE OFFERS</Chip>
        <SHead gold="BONUSES" suf="& REWARDS" />
        <p style={{ fontSize:11, color:"#6b6b6b", marginTop:4 }}>More ways to win every day</p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        {bonuses.map((b, i) => (
          <div key={i} className="bonus-tile"
            onClick={() => openWhatsApp(`Hello, I want to claim the ${b.title} on MangoPlay!`)}
            style={{ background:b.bg, border:`1.5px solid ${b.color}22`, borderRadius:14, padding:"16px 12px", cursor:"pointer", textAlign:"center", transition:"all 0.25s", boxShadow:"0 2px 10px rgba(0,0,0,0.04)" }}
            onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow=`0 10px 26px ${b.color}22`; }}
            onMouseLeave={e=>{ e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 2px 10px rgba(0,0,0,0.04)"; }}>
            <div style={{ fontSize:28, marginBottom:6 }}>{b.icon}</div>
            <div style={{ fontSize:24, fontWeight:900, fontFamily:"'Oswald',sans-serif", color:b.color, lineHeight:1, marginBottom:2 }}>{b.value}</div>
            <div style={{ fontSize:11, fontWeight:800, color:"#1a1a1a", marginBottom:3 }}>{b.title}</div>
            <div style={{ fontSize:9, color:"#6b6b6b" }}>{b.desc}</div>
            <div style={{ marginTop:8, display:"inline-block", background:`${b.color}18`, border:`1px solid ${b.color}33`, borderRadius:10, padding:"2px 10px", fontSize:9, fontWeight:700, color:b.color }}>CLAIM NOW →</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Testimonials */
function Testimonials() {
  const reviews = [
    { name:"Rahul M.",  city:"Mumbai",    avatar:"👨", stars:5, text:"Withdrew ₹18,000 within 10 minutes! Best platform I've used. Support is top class 🔥", won:"₹18,000", game:"IPL Betting"      },
    { name:"Priya S.",  city:"Delhi",     avatar:"👩", stars:5, text:"Color prediction game is so fun and the payouts are instant. Already referred 3 friends!", won:"₹6,500",  game:"Color Prediction" },
    { name:"Arjun K.",  city:"Pune",      avatar:"🧑", stars:5, text:"Got my ID in 2 minutes on WhatsApp. Deposited ₹500 and won ₹4,200 on MI vs CSK!",       won:"₹4,200",  game:"Cricket"          },
    { name:"Vikram T.", city:"Hyderabad", avatar:"👨", stars:5, text:"The welcome bonus is real! Got 10% extra on first deposit. Playing daily now 💪",         won:"₹9,800",  game:"Casino"           },
  ];
  return (
    <div className="sc">
      <div style={{ textAlign:"center", marginBottom:18 }}>
        <Chip color="#7c4dff">⭐ REAL WINNERS</Chip>
        <SHead pre="WHAT OUR" gold="PLAYERS SAY" />
        <p style={{ fontSize:11, color:"#6b6b6b", marginTop:4 }}>50,000+ happy players across India</p>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {reviews.map((r, i) => (
          <div key={i} className="review-tile"
            style={{ background:"#fafafa", border:"1.5px solid #ebebf5", borderRadius:12, padding:"14px", transition:"all 0.2s" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,#7c4dff,#b44dff)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{r.avatar}</div>
                <div>
                  <div style={{ fontSize:12, fontWeight:800, color:"#1a1a1a" }}>{r.name}</div>
                  <div style={{ fontSize:9, color:"#6b6b6b" }}>📍 {r.city}</div>
                </div>
              </div>
              <div style={{ background:"linear-gradient(135deg,#e8fff2,#d0f5e0)", border:"1px solid #25D36628", borderRadius:8, padding:"4px 10px", textAlign:"center" }}>
                <div style={{ fontSize:9, color:"#25D366", fontWeight:600 }}>WON</div>
                <div style={{ fontSize:13, fontWeight:900, color:"#25D366", fontFamily:"'Oswald',sans-serif" }}>{r.won}</div>
              </div>
            </div>
            <div style={{ display:"flex", gap:2, marginBottom:6 }}>
              {[...Array(r.stars)].map((_,j) => <span key={j} style={{ fontSize:11, color:"#f90" }}>★</span>)}
              <span style={{ fontSize:9, color:"#6b6b6b", marginLeft:4, alignSelf:"center" }}>via {r.game}</span>
            </div>
            <div style={{ fontSize:11, color:"#555", lineHeight:1.65, fontStyle:"italic" }}>"{r.text}"</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* TrustFooter — stats bar (dark) + CTA card (light) */
function TrustFooter() {
  const stats    = [{ value:"50K+", label:"Active Players", icon:"👥" },{ value:"₹2Cr+", label:"Paid Out Daily", icon:"💰" },{ value:"24/7", label:"Live Support", icon:"🎧" }];
  const features = [{ icon:"⚡", title:"Instant ID", desc:"Get your ID in under 2 mins" },{ icon:"💸", title:"Fast Withdrawal", desc:"Money in your account same day" },{ icon:"🔒", title:"100% Secure", desc:"Encrypted & safe transactions" },{ icon:"🎧", title:"24/7 Support", desc:"Always here to help you" }];
  const payments = [{ label:"PhonePe", icon:"📱" },{ label:"GPay", icon:"💳" },{ label:"Paytm", icon:"💰" },{ label:"UPI", icon:"🔗" }];
  return (
    <>
      {/* Dark stats strip */}
      <div style={{ margin:"0 8px 22px", background:"linear-gradient(135deg,#1a0a35,#0f0f28)", borderRadius:16, display:"grid", gridTemplateColumns:"1fr 1fr 1fr", overflow:"hidden", boxShadow:"0 8px 28px rgba(0,0,0,0.14)" }}>
        {stats.map((s,i) => (
          <div key={i} style={{ textAlign:"center", padding:"16px 8px 12px", borderRight:i<2?"1px solid #7c4dff20":"none" }}>
            <div style={{ fontSize:18, marginBottom:2 }}>{s.icon}</div>
            <div style={{ fontSize:20, fontWeight:900, fontFamily:"'Oswald',sans-serif", background:"linear-gradient(135deg,#f90,#ffcc00)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{s.value}</div>
            <div style={{ fontSize:9, color:"#aaa", fontWeight:600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* White CTA card */}
      <div className="sc" style={{ textAlign:"center" }}>
        <Chip color="#7c4dff">🥭 INDIA'S TRUSTED ONLINE BOOK</Chip>
        <div style={{ fontSize:24, fontWeight:900, fontFamily:"'Oswald',sans-serif", letterSpacing:2, color:"#1a1a1a", marginBottom:6, lineHeight:1.1 }}>
          JOIN&nbsp;
          <span style={{ background:"linear-gradient(135deg,#f90,#ffcc00)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", animation:"glow 2.5s infinite" }}>MANGO&nbsp;</span>
          TODAY
        </div>
        <p style={{ fontSize:11, color:"#6b6b6b", marginBottom:20 }}>Over <span style={{ color:"#f90", fontWeight:700 }}>50,000 players</span> trust us every day</p>

        {/* WA CTA button */}
        <div style={{ position:"relative", display:"inline-block", marginBottom:22 }}>
          <a href="#" onClick={e=>{ e.preventDefault(); openWhatsApp("Hello, I want to create my ID on MangoPlay!"); }}
            style={{ position:"relative", display:"inline-flex", alignItems:"center", gap:10, background:"linear-gradient(135deg,#25D366,#128C7E)", color:"#fff", padding:"13px 30px", borderRadius:50, fontWeight:900, fontSize:14, textDecoration:"none", boxShadow:"0 6px 28px rgba(37,211,102,0.4)", fontFamily:"'Oswald',sans-serif", letterSpacing:1, overflow:"hidden" }}>
            <div style={{ position:"absolute", top:0, left:"-100%", width:"60%", height:"100%", background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)", animation:"shimmer 2.5s infinite" }} />
            <span style={{ fontSize:22 }}>💬</span>GET YOUR ID ON WHATSAPP
          </a>
        </div>

        {/* Feature grid */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:18 }}>
          {features.map((f,i) => (
            <div key={i} className="feat-tile"
              style={{ background:"#f9f9fc", border:"1.5px solid #e8e8f4", borderRadius:12, padding:"11px 10px", textAlign:"left", display:"flex", alignItems:"center", gap:10, transition:"all 0.2s" }}>
              <div style={{ fontSize:20, flexShrink:0 }}>{f.icon}</div>
              <div>
                <div style={{ fontSize:11, fontWeight:800, color:"#1a1a1a" }}>{f.title}</div>
                <div style={{ fontSize:9, color:"#6b6b6b", marginTop:1 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Payments */}
        <div style={{ display:"flex", alignItems:"center", gap:8, justifyContent:"center", marginBottom:10 }}>
          <div style={{ height:1, flex:1, background:"linear-gradient(90deg,transparent,#ddd)" }} />
          <span style={{ fontSize:9, color:"#aaa", fontWeight:700, letterSpacing:2 }}>SECURE PAYMENTS</span>
          <div style={{ height:1, flex:1, background:"linear-gradient(90deg,#ddd,transparent)" }} />
        </div>
        <div style={{ display:"flex", justifyContent:"center", gap:8, flexWrap:"wrap", marginBottom:16 }}>
          {payments.map(p => (
            <div key={p.label} className="pay-chip"
              style={{ background:"#f4f4fb", padding:"7px 13px", borderRadius:10, fontSize:11, fontWeight:700, color:"#444", border:"1.5px solid #e2e2f0", display:"flex", alignItems:"center", gap:6, transition:"all 0.2s" }}>
              <span style={{ fontSize:15 }}>{p.icon}</span>{p.label}
            </div>
          ))}
        </div>

        <div style={{ fontSize:9, color:"#bbb", marginBottom:8 }}>Mango Online Book — Trusted by 50,000+ players across India</div>
        <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"#fff4f4", border:"1px solid #ffcccc", borderRadius:8, padding:"5px 14px", fontSize:9, color:"#cc3333", fontWeight:700, letterSpacing:1 }}>
          🔞 18+ ONLY &nbsp;•&nbsp; PLEASE PLAY RESPONSIBLY
        </div>
      </div>
    </>
  );
}

/* PageFooter */
function PageFooter() {
  return (
    <div style={{ margin:"0 8px 90px", background:"#fff", borderRadius:16, padding:"18px 16px", textAlign:"center", boxShadow:"0 4px 16px rgba(0,0,0,0.04)", border:"1.5px solid #ebebf4" }}>
      <div style={{ fontSize:11, color:"#888", fontWeight:600, letterSpacing:0.4, lineHeight:1.9 }}>
        © 2026 <span style={{ color:"#f90", fontWeight:700 }}>Mango Online Book</span>
        <span style={{ color:"#e0e0e0", margin:"0 8px" }}>•</span>
        <span style={{ color:"#aaa" }}>Government Approved Platform</span>
      </div>
      <div style={{ marginTop:4, fontSize:9, color:"#ccc", letterSpacing:1 }}>All rights reserved. Play responsibly. 18+</div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════ */
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
      <div className="app-container">

        {/* ══ NAVBAR — dark ══ */}
        <header style={{ background:"#0a0a20", padding:"8px 16px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:200, borderBottom:"2px solid #f9900044", boxShadow:"0 4px 24px rgba(0,0,0,0.7)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span onClick={() => setMenuOpen(o=>!o)} style={{ fontSize:22, cursor:"pointer", color:"#fff", transition:"transform 0.35s", transform: menuOpen?"rotate(90deg)":"none", display:"inline-block" }}>☰</span>
            <div style={{ display:"flex", alignItems:"center", gap:5, cursor:"pointer" }} onClick={() => openWhatsApp("Hello!")}>
              <img src="/logo.png" alt="Mango Online Book" style={{ height:"34px", width:"auto", objectFit:"contain", display:"block", filter:"drop-shadow(0 0 8px rgba(255,170,0,0.7))", flexShrink:0 }} />
            </div>
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            <button className="header-btn" onClick={e=>{ addRipple(e); openWhatsApp("Hello, I want to login to my MangoPlay ID!"); }} style={{ background:"transparent", border:"2px solid #7c4dff", color:"#fff", borderRadius:7, padding:"6px 16px", fontWeight:700, cursor:"pointer", fontSize:13, transition:"all 0.2s" }}>Login</button>
            <button className="header-btn" onClick={e=>{ addRipple(e); openWhatsApp("Hello, I want to create a new ID on MangoPlay!"); }} style={{ background:"linear-gradient(90deg,#7c4dff,#b44dff)", border:"none", color:"#fff", borderRadius:7, padding:"6px 16px", fontWeight:700, cursor:"pointer", fontSize:13, boxShadow:"0 0 16px #7c4dff66", transition:"all 0.2s" }}>Sign up</button>
          </div>
        </header>

        {/* ══ SIDE DRAWER — dark ══ */}
        {menuOpen && (
          <div style={{ position:"fixed", inset:0, zIndex:250 }} onClick={() => setMenuOpen(false)}>
            <div onClick={e=>e.stopPropagation()} style={{ position:"absolute", left:0, top:0, bottom:0, width:260, background:"linear-gradient(160deg,#11112a,#0a0a18)", padding:20, animation:"slideInLeft 0.3s ease", borderRight:"2px solid #7c4dff44", overflowY:"auto" }}>
              <div style={{ fontSize:26, marginBottom:24, fontFamily:"'Oswald',sans-serif" }}>🥭 <span style={{ color:"#f90" }}>MANGO</span></div>
              {["🏠 Home","🏏 Cricket","⚽ Football","🎾 Tennis","🏀 Basketball","🐴 Racing","🎰 Casino","🎲 Games","💰 Promotions","👤 My Account","📞 Support","⚙️ Settings"].map(item => (
                <div key={item} className="sidebar-item"
                  onClick={() => openWhatsApp(`Hello, I want to know more about ${item.replace(/^.+? /,"")} on MangoPlay!`)}
                  style={{ padding:"12px 10px", borderRadius:8, cursor:"pointer", fontSize:14, fontWeight:600, color:"#ccc", borderBottom:"1px solid #ffffff07", transition:"all 0.2s" }}>{item}</div>
              ))}
            </div>
          </div>
        )}

        {/* ══ TICKER + HERO + CATEGORY — all dark ══ */}
        <TickerBar />
        <HeroBanner />
        <CategoryBar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* ════════════════════════════════════════
            LIGHT PAGE STARTS HERE — #eef1f7
        ════════════════════════════════════════ */}
        <div style={{ background:"#eef1f7", paddingTop:6 }}>

          {/* GAME CARDS — white card */}
          <div className="sc">
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
              <span style={{ fontWeight:900, fontSize:16, color:"#1a1a1a", fontFamily:"'Oswald',sans-serif", letterSpacing:1 }}>🎮 POPULAR GAMES</span>
              <span style={{ fontSize:10, color:"#7c4dff", fontWeight:700, cursor:"pointer" }} onClick={() => openWhatsApp("Hello, I want to explore all games on MangoPlay!")}>VIEW ALL →</span>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:12 }}>
              {GAME_CARDS.map((card,i) => <GameCard key={card.label} card={card} index={i} />)}
            </div>
          </div>

          {/* MENU BUTTONS — white card */}
          <div className="sc" style={{ padding:"18px 16px" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              {MENU_ITEMS.map(item => (
                <button key={item.label} className="menu-btn-light"
                  onClick={e=>{ setActiveMenu(item.label); addRipple(e); openWhatsApp(`Hello, I want to know more about ${item.label} on MangoPlay!`); }}
                  style={{ background: activeMenu===item.label ? "linear-gradient(90deg,#7c4dff,#b44dff)" : "#f4f4fb", border:`1.5px solid ${activeMenu===item.label?"#7c4dff":"#e2e2f0"}`, color: activeMenu===item.label?"#fff":"#333", borderRadius:10, padding:"11px 12px", fontWeight:700, fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", gap:8, transition:"all 0.2s", boxShadow: activeMenu===item.label?"0 4px 16px #7c4dff44":"none" }}>
                  <span style={{ fontSize:16 }}>{item.icon}</span>{item.label}
                </button>
              ))}
            </div>
            <button className="menu-btn-dark"
              onClick={e=>{ setActiveMenu("Inplay"); addRipple(e); openWhatsApp("Hello, I want to bet on Inplay matches on MangoPlay!"); }}
              style={{ width:"100%", marginTop:8, background: activeMenu==="Inplay"?"linear-gradient(90deg,#7c4dff,#b44dff)":"#1a1a35", border:`1px solid ${activeMenu==="Inplay"?"#7c4dff":"#7c4dff33"}`, color:"#fff", borderRadius:10, padding:"11px 14px", fontWeight:700, fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", gap:10, transition:"all 0.2s", boxShadow: activeMenu==="Inplay"?"0 4px 18px #7c4dff55":"none" }}>
              <span style={{ animation:"blink 1s infinite", fontSize:16 }}>📡</span>
              <span style={{ animation:"glow 2s infinite", color:"#f90", fontFamily:"'Oswald',sans-serif", letterSpacing:2 }}>((·)) INPLAY</span>
              <LiveBadge />
            </button>
          </div>

          {/* IPL BANNER */}
          <div style={{ margin:"0 8px 22px", background:"linear-gradient(90deg,#ff4d4d,#ff9933)", padding:"10px 14px", display:"flex", alignItems:"center", justifyContent:"space-between", borderRadius:12, boxShadow:"0 6px 22px rgba(255,120,0,0.28)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ fontSize:28, animation:"float 2.5s ease-in-out infinite" }}>🏆</span>
              <div>
                <div style={{ fontWeight:900, fontSize:14, color:"#000", fontFamily:"'Oswald',sans-serif", letterSpacing:1 }}>IPL 2026 — SEASON OPENER</div>
                <div style={{ fontSize:11, color:"#000", opacity:0.7 }}>MI vs CSK  •  23 Mar 19:30</div>
              </div>
            </div>
            <span onClick={() => openWhatsApp("Hello, I want to bet on IPL 2026 on MangoPlay!")}
              style={{ background:"#000", color:"#ff9933", padding:"5px 14px", borderRadius:16, fontSize:11, fontWeight:700, animation:"pulse 2s infinite", flexShrink:0, cursor:"pointer" }}>LIVE SOON</span>
          </div>

          {/* MATCHES — white card */}
          <div className="sc">
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:18 }}>🏏</span>
                <span style={{ fontWeight:800, fontSize:15, color:"#1a1a1a", fontFamily:"'Oswald',sans-serif", letterSpacing:1 }}>IPL 2026 • TATA IPL</span>
                <LiveBadge />
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:11, background:"#eeebff", padding:"3px 10px", borderRadius:12, color:"#7c4dff", fontWeight:700, border:"1px solid #c8bcff" }}>5 Matches</span>
                <span style={{ fontSize:11, color:"#7c4dff", cursor:"pointer", fontWeight:700 }} onClick={() => openWhatsApp("Hello, I want to see all IPL 2026 matches on MangoPlay!")}>VIEW ALL →</span>
              </div>
            </div>
            {LIVE_MATCHES.map((match,i) => <MatchCard key={i} match={match} index={i} visible={cardsVis} />)}
          </div>

          {/* PROMO BANNER */}
          <PromoBanner />

          {/* HOW IT WORKS */}
          <HowItWorks />

          {/* BONUSES */}
          <BonusSection />

          {/* TESTIMONIALS */}
          <Testimonials />

          {/* TRUST / CTA */}
          <TrustFooter />

          {/* FOOTER */}
          <PageFooter />

        </div>{/* ── end #eef1f7 ── */}

        {/* ══ BOTTOM NAV ══ */}
        <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:1200, background:"rgba(10,10,28,0.97)", borderTop:"2px solid #7c4dff33", display:"flex", justifyContent:"space-around", padding:"8px 0 4px", zIndex:100, backdropFilter:"blur(12px)" }}>
          {[{icon:"🏠",label:"Home"},{icon:"⚽",label:"Sports"},{icon:"🎰",label:"Casino"},{icon:"🎁",label:"Offers"},{icon:"👤",label:"Account"}].map(item => (
            <button key={item.label} className="bottom-nav-btn"
              onClick={() => openWhatsApp(`Hello, I want to access ${item.label} on MangoPlay!`)}
              style={{ background:"none", border:"none", color:"#777", display:"flex", flexDirection:"column", alignItems:"center", gap:2, cursor:"pointer", fontSize:10, fontWeight:700, transition:"all 0.2s" }}>
              <span style={{ fontSize:20 }}>{item.icon}</span>{item.label}
            </button>
          ))}
        </div>

        {/* ══ FLOATING WHATSAPP BUTTON ══ */}
        <div
          onClick={() => openWhatsApp("Hello, I want to create my ID on MangoPlay!")}
          style={{ position:"fixed", bottom:76, right:14, zIndex:150, cursor:"pointer", animation:"float 3s ease-in-out infinite" }}>
          <div style={{ background:"linear-gradient(135deg,#25D366,#128C7E)", borderRadius:"50%", width:56, height:56, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, boxShadow:"0 4px 22px rgba(37,211,102,0.55), 0 0 0 3px rgba(37,211,102,0.15)", transition:"transform 0.2s" }}
            onMouseEnter={e=>e.currentTarget.style.transform="scale(1.12)"}
            onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
            💬
          </div>
          <div style={{ position:"absolute", top:-6, right:-4, background:"#e00", borderRadius:"50%", width:18, height:18, display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, fontWeight:900, color:"#fff", animation:"liveGlow 1s infinite", letterSpacing:0 }}>ID</div>
        </div>

        {/* ══ MODALS ══ */}
        <Modal title="LOGIN" open={loginOpen} onClose={() => setLoginOpen(false)}>
          <Input placeholder="Username / Email" />
          <Input placeholder="Password" type="password" />
          <div style={{ textAlign:"right", marginBottom:16 }}><span style={{ fontSize:12, color:"#7c4dff", cursor:"pointer" }}>Forgot Password?</span></div>
          <button onClick={e=>{ addRipple(e); openWhatsApp("Hello, I want to login!"); }} style={{ width:"100%", background:"linear-gradient(90deg,#7c4dff,#b44dff)", border:"none", color:"#fff", padding:13, borderRadius:9, fontWeight:800, fontSize:15, cursor:"pointer", letterSpacing:1, boxShadow:"0 0 22px #7c4dff55", marginBottom:12, fontFamily:"'Oswald',sans-serif", position:"relative", overflow:"hidden" }}>LOGIN NOW</button>
          <div style={{ textAlign:"center", fontSize:12, color:"#888" }}>No account? <span onClick={() => { setLoginOpen(false); setSignupOpen(true); }} style={{ color:"#f90", cursor:"pointer", fontWeight:700 }}>Sign Up Free →</span></div>
        </Modal>

        <Modal title="CREATE ACCOUNT" open={signupOpen} onClose={() => setSignupOpen(false)}>
          <div style={{ background:"#fff8ee", border:"1px solid #f9900044", borderRadius:8, padding:"8px 12px", marginBottom:16, fontSize:12, fontWeight:700, color:"#f90", textAlign:"center" }}>🎁 10% BONUS ON FIRST DEPOSIT</div>
          {["Full Name","Username","Email","Mobile Number","Password","Confirm Password"].map(ph => (
            <Input key={ph} placeholder={ph} type={ph.toLowerCase().includes("password")?"password":"text"} />
          ))}
          <button onClick={e=>{ addRipple(e); openWhatsApp("Hello, I want to create a new ID!"); }} style={{ width:"100%", background:"linear-gradient(90deg,#f90,#ffcc00)", border:"none", color:"#000", padding:13, borderRadius:9, fontWeight:800, fontSize:15, cursor:"pointer", letterSpacing:1, marginBottom:10, fontFamily:"'Oswald',sans-serif", position:"relative", overflow:"hidden" }}>JOIN NOW — IT'S FREE</button>
          <div style={{ textAlign:"center", fontSize:11, color:"#555" }}>Already a member? <span onClick={() => { setSignupOpen(false); setLoginOpen(true); }} style={{ color:"#7c4dff", cursor:"pointer", fontWeight:700 }}>Login Here</span></div>
        </Modal>

      </div>
    </>
  );
}