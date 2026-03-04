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
    @keyframes shimmer {
      0%   { left: -100%; }
      100% { left: 200%; }
    }
    @keyframes neonPulse {
      0%,100% { opacity: 0.6; }
      50%      { opacity: 1; }
    }
    @keyframes scanline {
      0%   { transform: translateY(-100%); }
      100% { transform: translateY(400%); }
    }
    @keyframes orbFloat {
      0%,100% { transform: translate(0,0) scale(1); opacity:0.4; }
      33%      { transform: translate(6px,-10px) scale(1.1); opacity:0.7; }
      66%      { transform: translate(-4px,5px) scale(0.95); opacity:0.5; }
    }
    @keyframes sparkle {
      0%,100% { opacity:0; transform:scale(0) rotate(0deg); }
      50%      { opacity:1; transform:scale(1) rotate(180deg); }
    }

    .gc3 { transition: transform 0.35s cubic-bezier(.2,.8,.3,1), box-shadow 0.35s ease !important; }
    .gc3:hover { transform: translateY(-7px) scale(1.04) !important; }
    .gc3:hover .gc3-border { opacity:1 !important; }
    .gc3:hover .gc3-play   { opacity:1 !important; transform:translateY(0) !important; }
    .gc3:hover .gc3-radial { opacity:1 !important; transform:scale(1.3) !important; }
    .gc3:hover .gc3-shine  { left:120% !important; }

    .game-card-v2 { transition: transform 0.35s ease, box-shadow 0.35s ease !important; }
    .game-card-v2:hover { transform: translateY(-8px) scale(1.03) !important; }
    .game-card-v2:hover .gc-img  { transform: scale(1.12) !important; }
    .game-card-v2:hover .gc-play { opacity: 1 !important; transform: translateY(0) !important; }
    .game-card-v2:hover .gc-overlay { opacity: 0.5 !important; }
    .game-card-v2:hover .gc-glow-border { opacity: 1 !important; }

    .nav-btn:hover        { background: linear-gradient(135deg,#7c4dff,#b44dff) !important; color:#fff !important; transform: translateY(-2px) !important; }
    .game-card:hover      { transform: scale(1.08) translateY(-8px) !important; filter: brightness(1.2) !important; border-color: #f90 !important; box-shadow: 0 0 36px rgba(255,153,0,0.5) !important; }
    .game-card:hover .card-glow-ring { opacity: 1 !important; animation: rotateGlow 1.8s linear infinite !important; }
    .game-card:hover .card-emoji     { filter: drop-shadow(0 0 12px #f90) scale(1.1) !important; }
    .odds-btn:hover       { transform: scale(1.05) !important; filter: brightness(1.3) !important; }
    .menu-btn:hover       { transform: translateY(-2px) !important; border-color: #f90 !important; color: #f90 !important; }
    .sport-tab:hover      { background: rgba(124,77,255,0.3) !important; color: #fff !important; }
    button:has(.sport-tile):hover .sport-tile { transform: translateY(-3px) !important; box-shadow: 0 6px 20px rgba(124,77,255,0.5) !important; }
    .bottom-nav-btn:hover { color: #f90 !important; transform: translateY(-3px) !important; }
    .match-card:hover     { border-color: #7c4dff !important; transform: translateY(-2px) !important; box-shadow: 0 8px 28px rgba(124,77,255,0.25) !important; }
    .header-btn:hover     { transform: scale(1.06) !important; }
    .sidebar-item:hover   { background: #7c4dff22 !important; color: #fff !important; padding-left: 18px !important; }
    .odds-cell:hover      { background: linear-gradient(135deg,#9c6dff,#d46dff) !important; transform: scale(1.04) !important; }
    .odds-cell-flash      { background: linear-gradient(135deg,#ff6d00,#ffd740) !important; color: #000 !important; }
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

/* ─────────────────────────────────────────────
   CATEGORY BAR — BULLPLAY MINI BANNER STYLE
───────────────────────────────────────────── */
const CATEGORY_TABS = [
  {
    label:"Teen Patti", glow:"#cc44ff",
    bg:"linear-gradient(135deg,#2a0050,#6a00aa)",
    scene:(
      <svg viewBox="0 0 80 52" width="80" height="52" style={{position:"absolute",inset:0}}>
        {/* Table felt */}
        <ellipse cx="40" cy="38" rx="36" ry="12" fill="#1a4a1a" opacity="0.6"/>
        {/* Card 1 back-left */}
        <rect x="6" y="10" width="22" height="30" rx="3" fill="#fff" opacity="0.9"/>
        <rect x="6" y="10" width="22" height="30" rx="3" fill="none" stroke="#ddd" strokeWidth="0.8"/>
        <text x="9" y="25" fontSize="13" fontWeight="900" fill="#cc0000" fontFamily="Georgia,serif">A</text>
        <path d="M24 13.5C24 12.2 22.8 11.2 22.3 12C21.8 11.2 20.6 12.2 20.6 13.5C20.6 15.2 22.3 16.5 22.3 16.5C22.3 16.5 24 15.2 24 13.5Z" fill="#cc0000"/>
        {/* Card 2 middle */}
        <rect x="29" y="6" width="22" height="30" rx="3" fill="#fff" opacity="0.95"/>
        <rect x="29" y="6" width="22" height="30" rx="3" fill="none" stroke="#ddd" strokeWidth="0.8"/>
        <text x="32" y="21" fontSize="13" fontWeight="900" fill="#000066" fontFamily="Georgia,serif">K</text>
        <path d="M48 9.5C48 8.2 46.8 7.2 46.3 8C45.8 7.2 44.6 8.2 44.6 9.5C44.6 11.2 46.3 12.5 46.3 12.5C46.3 12.5 48 11.2 48 9.5Z" fill="#000066"/>
        {/* Card 3 front */}
        <rect x="52" y="10" width="22" height="30" rx="3" fill="#fff"/>
        <rect x="52" y="10" width="22" height="30" rx="3" fill="none" stroke="#ddd" strokeWidth="0.8"/>
        <text x="55" y="27" fontSize="13" fontWeight="900" fill="#cc0000" fontFamily="Georgia,serif">Q</text>
        <path d="M71 13.5C71 12.2 69.8 11.2 69.3 12C68.8 11.2 67.6 12.2 67.6 13.5C67.6 15.2 69.3 16.5 69.3 16.5C69.3 16.5 71 15.2 71 13.5Z" fill="#cc0000"/>
        {/* Chips */}
        <circle cx="20" cy="44" r="5" fill="#ffcc00" stroke="#ff9900" strokeWidth="1"/>
        <circle cx="60" cy="44" r="5" fill="#ff4444" stroke="#cc0000" strokeWidth="1"/>
        <text x="17.5" y="47" fontSize="5" fontWeight="900" fill="#000">10</text>
        <text x="57.5" y="47" fontSize="5" fontWeight="900" fill="#fff">25</text>
      </svg>
    ),
  },
  {
    label:"Cricket", glow:"#ffaa00",
    bg:"linear-gradient(135deg,#1a0a00,#3a1800)",
    scene:(
      <svg viewBox="0 0 80 52" width="80" height="52" style={{position:"absolute",inset:0}}>
        {/* Stadium arc */}
        <ellipse cx="40" cy="50" rx="42" ry="28" fill="#1a4a00" opacity="0.5"/>
        <ellipse cx="40" cy="50" rx="32" ry="20" fill="#22660a" opacity="0.4"/>
        {/* Pitch */}
        <rect x="34" y="20" width="12" height="30" rx="2" fill="#d4aa60" opacity="0.7"/>
        {/* Cricket bat */}
        <rect x="50" y="8" width="7" height="4" rx="2" fill="#c8a050"/>
        <rect x="47" y="11" width="12" height="22" rx="3.5" fill="#d4b060"/>
        <rect x="47" y="11" width="12" height="22" rx="3.5" fill="none" stroke="#a07820" strokeWidth="0.8"/>
        <line x1="49" y1="17" x2="57" y2="17" stroke="#8b6010" strokeWidth="0.7" opacity="0.7"/>
        <line x1="49" y1="21" x2="57" y2="21" stroke="#8b6010" strokeWidth="0.7" opacity="0.7"/>
        <line x1="49" y1="25" x2="57" y2="25" stroke="#8b6010" strokeWidth="0.7" opacity="0.7"/>
        <rect x="51" y="31" width="4" height="7" rx="2" fill="#8b6010"/>
        {/* Ball */}
        <circle cx="22" cy="26" r="10" fill="#cc2200"/>
        <path d="M14 22C17 18 27 18 30 22" stroke="#fff" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.85"/>
        <path d="M14 30C17 34 27 34 30 30" stroke="#fff" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.85"/>
        <circle cx="18" cy="20" r="2" fill="#fff" opacity="0.2"/>
        {/* Stumps */}
        <line x1="36" y1="20" x2="36" y2="34" stroke="#fff" strokeWidth="1.5" opacity="0.9"/>
        <line x1="40" y1="20" x2="40" y2="34" stroke="#fff" strokeWidth="1.5" opacity="0.9"/>
        <line x1="44" y1="20" x2="44" y2="34" stroke="#fff" strokeWidth="1.5" opacity="0.9"/>
        <line x1="34" y1="21" x2="42" y2="20" stroke="#fff" strokeWidth="1.2" opacity="0.9"/>
        <line x1="38" y1="21" x2="46" y2="20" stroke="#fff" strokeWidth="1.2" opacity="0.9"/>
      </svg>
    ),
  },
  {
    label:"Football", glow:"#44dd44",
    bg:"linear-gradient(135deg,#001800,#004400)",
    scene:(
      <svg viewBox="0 0 80 52" width="80" height="52" style={{position:"absolute",inset:0}}>
        {/* Pitch lines */}
        <rect x="0" y="30" width="80" height="22" fill="#166a10" opacity="0.6"/>
        <line x1="40" y1="30" x2="40" y2="52" stroke="#fff" strokeWidth="0.7" opacity="0.4"/>
        <ellipse cx="40" cy="42" rx="12" ry="6" fill="none" stroke="#fff" strokeWidth="0.7" opacity="0.4"/>
        {/* Goal post */}
        <line x1="10" y1="20" x2="10" y2="36" stroke="#fff" strokeWidth="2" opacity="0.8"/>
        <line x1="22" y1="20" x2="22" y2="36" stroke="#fff" strokeWidth="2" opacity="0.8"/>
        <line x1="9" y1="20" x2="23" y2="20" stroke="#fff" strokeWidth="2" opacity="0.8"/>
        {/* Net */}
        {[0,1,2,3].map(j=>(
          <line key={j} x1={10+j*4} y1="20" x2={10+j*4} y2="36" stroke="#fff" strokeWidth="0.5" opacity="0.25"/>
        ))}
        {/* Ball */}
        <circle cx="54" cy="24" r="14" fill="#f0f0f0"/>
        <polygon points="54,14 59,19 57,25 51,25 49,19" fill="#222" opacity="0.85"/>
        <polygon points="62,20 66,25 62,30 58,29 57,24 60,19" fill="#222" opacity="0.85"/>
        <polygon points="46,20 49,19 51,25 50,30 46,30 42,25" fill="#222" opacity="0.85"/>
        <ellipse cx="48" cy="18" rx="3.5" ry="2.5" fill="#fff" opacity="0.3"/>
      </svg>
    ),
  },
  {
    label:"Satta Matka", glow:"#ff8822",
    bg:"linear-gradient(135deg,#1a0800,#4a2000)",
    scene:(
      <svg viewBox="0 0 80 52" width="80" height="52" style={{position:"absolute",inset:0}}>
        {/* Background glow */}
        <ellipse cx="40" cy="35" rx="30" ry="18" fill="#ff6600" opacity="0.15"/>
        {/* Matka body */}
        <ellipse cx="40" cy="18" rx="18" ry="7" fill="#cc5500"/>
        <path d="M22 18 C19 26 17 36 21 42 C24 46 56 46 59 42 C63 36 61 26 58 18Z" fill="#dd6600"/>
        <path d="M22 18 C19 26 17 36 21 42 C24 46 56 46 59 42 C63 36 61 26 58 18Z" fill="none" stroke="#ff8833" strokeWidth="1" opacity="0.6"/>
        {/* Shine */}
        <ellipse cx="30" cy="26" rx="5" ry="9" fill="#fff" opacity="0.1"/>
        {/* Dots */}
        <circle cx="32" cy="30" r="3" fill="#1a0800" opacity="0.55"/>
        <circle cx="40" cy="34" r="3" fill="#1a0800" opacity="0.55"/>
        <circle cx="48" cy="30" r="3" fill="#1a0800" opacity="0.55"/>
        {/* Rim */}
        <ellipse cx="40" cy="18" rx="18" ry="7" stroke="#ff9944" strokeWidth="2.5" fill="none"/>
        {/* Opening */}
        <ellipse cx="40" cy="18" rx="12" ry="4.5" fill="#1a0800" opacity="0.8"/>
        {/* Numbers */}
        <text x="8" y="24" fontSize="12" fontWeight="900" fill="#ffcc00" opacity="0.9" fontFamily="Oswald,sans-serif">4</text>
        <text x="61" y="24" fontSize="12" fontWeight="900" fill="#ffcc00" opacity="0.9" fontFamily="Oswald,sans-serif">2</text>
        <text x="8" y="42" fontSize="11" fontWeight="900" fill="#ff9933" opacity="0.7" fontFamily="Oswald,sans-serif">9</text>
        <text x="62" y="42" fontSize="11" fontWeight="900" fill="#ff9933" opacity="0.7" fontFamily="Oswald,sans-serif">6</text>
        {/* Stars */}
        <circle cx="18" cy="10" r="1.5" fill="#ffcc00" opacity="0.7"/>
        <circle cx="62" cy="10" r="1.5" fill="#ffcc00" opacity="0.7"/>
      </svg>
    ),
  },
  {
    label:"Andar Bahar", glow:"#00ddff",
    bg:"linear-gradient(135deg,#001828,#003858)",
    scene:(
      <svg viewBox="0 0 80 52" width="80" height="52" style={{position:"absolute",inset:0}}>
        {/* Table */}
        <ellipse cx="40" cy="46" rx="38" ry="8" fill="#0a3a1a" opacity="0.7"/>
        {/* Left pile — Andar */}
        {[0,1,2].map(j=>(
          <rect key={j} x={5+j*1.5} y={8+j*1.5} width="20" height="28" rx="2.5" fill={j===2?"#fff":"#e8e8e8"} stroke="#ccc" strokeWidth="0.6"/>
        ))}
        <text x="8" y="26" fontSize="13" fontWeight="900" fill="#cc0000" fontFamily="Georgia,serif">A</text>
        <path d="M22 11.5C22 10.2 20.8 9.2 20.3 10C19.8 9.2 18.6 10.2 18.6 11.5C18.6 13.2 20.3 14.5 20.3 14.5C20.3 14.5 22 13.2 22 11.5Z" fill="#cc0000"/>
        <text x="6" y="38" fontSize="7" fontWeight="700" fill="#0055aa">ANDAR</text>
        {/* Center card face-up */}
        <rect x="32" y="14" width="16" height="22" rx="2.5" fill="#fff" stroke="#ffcc00" strokeWidth="1.5"/>
        <text x="35" y="29" fontSize="12" fontWeight="900" fill="#cc0000" fontFamily="Georgia,serif">J</text>
        <path d="M45 17C45 15.7 43.8 14.7 43.3 15.5C42.8 14.7 41.6 15.7 41.6 17C41.6 18.7 43.3 20 43.3 20C43.3 20 45 18.7 45 17Z" fill="#cc0000"/>
        {/* Right pile — Bahar */}
        {[0,1,2].map(j=>(
          <rect key={j} x={55-j*1.5} y={8+j*1.5} width="20" height="28" rx="2.5" fill={j===2?"#fff":"#e8e8e8"} stroke="#ccc" strokeWidth="0.6"/>
        ))}
        <text x="57" y="26" fontSize="13" fontWeight="900" fill="#000088" fontFamily="Georgia,serif">K</text>
        <path d="M72 11.5C72 10.2 70.8 9.2 70.3 10C69.8 9.2 68.6 10.2 68.6 11.5C68.6 13.2 70.3 14.5 70.3 14.5C70.3 14.5 72 13.2 72 11.5Z" fill="#000088"/>
        <text x="54" y="38" fontSize="7" fontWeight="700" fill="#00aa55">BAHAR</text>
      </svg>
    ),
  },
  {
    label:"Lucky 7", glow:"#ffdd00",
    bg:"linear-gradient(135deg,#1a1000,#3a2800)",
    scene:(
      <svg viewBox="0 0 80 52" width="80" height="52" style={{position:"absolute",inset:0}}>
        {/* Machine body */}
        <rect x="4" y="6" width="72" height="40" rx="8" fill="#2a1a00" stroke="#ffaa00" strokeWidth="1.5"/>
        <rect x="4" y="6" width="72" height="40" rx="8" fill="none" stroke="#ffcc44" strokeWidth="0.5" opacity="0.5"/>
        {/* 3 reels */}
        <rect x="9" y="10" width="18" height="32" rx="4" fill="#111" stroke="#ff8800" strokeWidth="1.2"/>
        <rect x="31" y="10" width="18" height="32" rx="4" fill="#111" stroke="#ff8800" strokeWidth="1.2"/>
        <rect x="53" y="10" width="18" height="32" rx="4" fill="#111" stroke="#ff8800" strokeWidth="1.2"/>
        {/* Separator lines on reels */}
        <line x1="9" y1="21" x2="27" y2="21" stroke="#ff880033" strokeWidth="0.8"/>
        <line x1="9" y1="31" x2="27" y2="31" stroke="#ff880033" strokeWidth="0.8"/>
        <line x1="31" y1="21" x2="49" y2="21" stroke="#ff880033" strokeWidth="0.8"/>
        <line x1="31" y1="31" x2="49" y2="31" stroke="#ff880033" strokeWidth="0.8"/>
        <line x1="53" y1="21" x2="71" y2="21" stroke="#ff880033" strokeWidth="0.8"/>
        <line x1="53" y1="31" x2="71" y2="31" stroke="#ff880033" strokeWidth="0.8"/>
        {/* 7s — bold golden */}
        <text x="12" y="31" fontSize="20" fontWeight="900" fill="#ffcc00" fontFamily="Arial,sans-serif">7</text>
        <text x="34" y="31" fontSize="20" fontWeight="900" fill="#ffcc00" fontFamily="Arial,sans-serif">7</text>
        <text x="56" y="31" fontSize="20" fontWeight="900" fill="#ffcc00" fontFamily="Arial,sans-serif">7</text>
        {/* Win line */}
        <line x1="7" y1="26" x2="73" y2="26" stroke="#ff4400" strokeWidth="2" opacity="0.9" strokeDasharray="4,2"/>
        {/* Corner coins */}
        <circle cx="10" cy="6" r="3" fill="#ffcc00"/>
        <circle cx="70" cy="6" r="3" fill="#ffcc00"/>
        <circle cx="10" cy="46" r="3" fill="#ffcc00"/>
        <circle cx="70" cy="46" r="3" fill="#ffcc00"/>
        {/* Stars above */}
        <text x="34" y="9" fontSize="7" fill="#ffcc00" opacity="0.8">★ ★ ★</text>
      </svg>
    ),
  },
];

function CategoryBar({ activeTab, setActiveTab }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  return (
    <div style={{ display:"flex", overflowX:"auto", background:"#0f0f22", padding:"10px 10px", gap:8, borderBottom:"2px solid #7c4dff22" }}>
      {CATEGORY_TABS.map((tab, i) => {
        const active = activeTab === tab.label;
        const hovered = hoveredIdx === i;
        const lit = active || hovered;
        return (
          <button key={tab.label}
            onClick={()=>{ setActiveTab(tab.label); openWhatsApp(`Hello, I want to play ${tab.label} on MangoPlay!`); }}
            onMouseEnter={()=>setHoveredIdx(i)}
            onMouseLeave={()=>setHoveredIdx(null)}
            style={{ flexShrink:0, padding:0, background:"none", border:"none", cursor:"pointer", outline:"none", display:"flex", flexDirection:"column", alignItems:"center", gap:4, animation:`fadeUp 0.4s ease ${i*0.07}s both` }}
          >
            <div style={{
              width:82, height:58, borderRadius:10,
              position:"relative", overflow:"hidden",
              border: lit ? `2px solid ${tab.glow}` : "2px solid rgba(255,255,255,0.07)",
              boxShadow: active
                ? `0 0 22px ${tab.glow}99, 0 4px 16px rgba(0,0,0,0.6)`
                : hovered
                ? `0 0 14px ${tab.glow}55, 0 4px 12px rgba(0,0,0,0.5)`
                : "0 2px 8px rgba(0,0,0,0.5)",
              transform: lit ? "translateY(-4px)" : "none",
              transition:"all 0.3s cubic-bezier(.2,.8,.3,1)",
            }}>
              <div style={{ position:"absolute", inset:0, background: tab.bg }}/>
              <div style={{
                position:"absolute", inset:0,
                transform: lit ? "scale(1.08)" : "scale(1)",
                transition:"transform 0.4s ease",
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>
                {tab.scene}
              </div>
              <div style={{ position:"absolute", bottom:0, left:0, right:0, height:22, background:"linear-gradient(to top,rgba(0,0,0,0.85),transparent)", zIndex:3 }}/>
              <div style={{
                position:"absolute", bottom:4, left:0, right:0,
                textAlign:"center", zIndex:4,
                fontSize:8, fontWeight:900, color:"#fff",
                letterSpacing:0.5, textTransform:"uppercase",
                textShadow:"0 1px 4px rgba(0,0,0,0.9)",
                fontFamily:"'Oswald',sans-serif",
              }}>{tab.label}</div>
              <div style={{
                position:"absolute", top:0, left:0, right:0, height:2, zIndex:4,
                background: active ? `linear-gradient(90deg,transparent,${tab.glow},transparent)` : "transparent",
                transition:"background 0.3s",
              }}/>
              <div style={{
                position:"absolute", inset:0, zIndex:2,
                background: lit ? `radial-gradient(circle at 50% 40%,${tab.glow}25,transparent 70%)` : "transparent",
                transition:"background 0.3s",
              }}/>
            </div>
            <span style={{
              fontSize:9, fontWeight:700, letterSpacing:0.3,
              color: active ? tab.glow : "#555",
              whiteSpace:"nowrap", transition:"color 0.2s",
              textTransform:"uppercase",
            }}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

const GAME_CARDS = [
  { label:"AVIATOR",          sub:"Crash Game",       bg:"linear-gradient(135deg,#1a0000,#6a0000,#2a0000)", emoji:"✈️", glow:"#ff3333", badge:"HOT",     mult:"1000x", players:"12.4K", tag:"TRENDING"  },
  { label:"MINES",            sub:"Instant Win",      bg:"linear-gradient(135deg,#002040,#004080,#0066cc)", emoji:"💣", glow:"#0088ff", badge:"NEW",     mult:"2500x", players:"8.1K",  tag:"TOP PICK"  },
  { label:"COLOR PREDICTION", sub:"Predict & Win",    bg:"linear-gradient(135deg,#003300,#005522,#008844)", emoji:"🎲", glow:"#00cc66", badge:"LIVE",    mult:"9x",    players:"22.7K", tag:"POPULAR"   },
  { label:"TEEN PATTI",       sub:"Card Game",        bg:"linear-gradient(135deg,#2a0040,#550080,#7700aa)", emoji:"🃏", glow:"#aa44ff", badge:"HOT",     mult:"500x",  players:"18.3K", tag:"LIVE NOW"  },
  { label:"ANDAR BAHAR",      sub:"Classic Card",     bg:"linear-gradient(135deg,#002020,#004444,#006666)", emoji:"🀄", glow:"#00cccc", badge:"CLASSIC", mult:"200x",  players:"9.6K",  tag:"FUN"       },
  { label:"LUCKY 7",          sub:"Number Game",      bg:"linear-gradient(135deg,#1a1a00,#444400,#888800)", emoji:"🎰", glow:"#ffcc00", badge:"LUCKY",   mult:"700x",  players:"14.2K", tag:"WIN BIG"   },
  { label:"DRAGON TIGER",     sub:"Speed Card",       bg:"linear-gradient(135deg,#2a0000,#660000,#990022)", emoji:"🐉", glow:"#ff4444", badge:"FAST",    mult:"2x",    players:"11.5K", tag:"QUICK WIN" },
  { label:"ROULETTE",         sub:"Live Casino",      bg:"linear-gradient(135deg,#001a00,#003300,#006600)", emoji:"🎡", glow:"#44ff44", badge:"LIVE",    mult:"36x",   players:"7.8K",  tag:"CASINO"    },
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
  "Delhi Capitals":              { bg:"linear-gradient(135deg,#004c97,#ef3340)", accent:"#004c97", badge:"#ef3340" },
  "Punjab Kings":                { bg:"linear-gradient(135deg,#aa0000,#dd0000)", accent:"#aa0000", badge:"#c0c0c0" },
  "Rajasthan Royals":            { bg:"linear-gradient(135deg,#254aa5,#e8578a)", accent:"#254aa5", badge:"#e8578a" },
  "Sunrisers Hyderabad":         { bg:"linear-gradient(135deg,#f7491a,#c43d10)", accent:"#f7491a", badge:"#000" },
  "Gujarat Titans":              { bg:"linear-gradient(135deg,#1c2951,#4a90d9)", accent:"#1c2951", badge:"#4a90d9" },
  "Lucknow Super Giants":        { bg:"linear-gradient(135deg,#004b8d,#00a0e3)", accent:"#004b8d", badge:"#00a0e3" },
};

const LIVE_MATCHES = [
  { sport:"Cricket - IPL 2026", icon:"🏏", t1:"Royal Challengers Bengaluru", t2:"Chennai Super Kings",    time:"28/03 (19:30)", h:"2.15", hv:"3.1M", d:"-", a:"1.80", av:"2.9M", live:true,  matchNo:"Match 1 • SEASON OPENER", venue:"M. Chinnaswamy Stadium, Bengaluru" },
  { sport:"Cricket - IPL 2026", icon:"🏏", t1:"Mumbai Indians",              t2:"Kolkata Knight Riders",  time:"29/03 (19:30)", h:"1.95", hv:"2.0M", d:"-", a:"2.05", av:"1.8M", live:false, matchNo:"Match 2",                 venue:"Wankhede Stadium, Mumbai" },
  { sport:"Cricket - IPL 2026", icon:"🏏", t1:"Gujarat Titans",              t2:"Rajasthan Royals",       time:"29/03 (19:30)", h:"1.88", hv:"1.2M", d:"-", a:"2.15", av:"1.1M", live:false, matchNo:"Match 3",                 venue:"Narendra Modi Stadium, Ahmedabad" },
  { sport:"Cricket - IPL 2026", icon:"🏏", t1:"Delhi Capitals",              t2:"Punjab Kings",           time:"30/03 (19:30)", h:"1.98", hv:"980k", d:"-", a:"2.02", av:"950k", live:false, matchNo:"Match 4",                 venue:"Arun Jaitley Stadium, Delhi" },
  { sport:"Cricket - IPL 2026", icon:"🏏", t1:"Lucknow Super Giants",        t2:"Sunrisers Hyderabad",    time:"31/03 (19:30)", h:"2.05", hv:"1.1M", d:"-", a:"1.92", av:"1.0M", live:false, matchNo:"Match 5",                 venue:"Ekana Stadium, Lucknow" },
  { sport:"Cricket - IPL 2026", icon:"🏏", t1:"Chennai Super Kings",         t2:"Mumbai Indians",         time:"01/04 (19:30)", h:"1.85", hv:"3.4M", d:"-", a:"2.10", av:"3.1M", live:false, matchNo:"Match 6 • EL CLASICO",    venue:"Wankhede Stadium, Mumbai" },
  { sport:"Cricket - IPL 2026", icon:"🏏", t1:"Sunrisers Hyderabad",         t2:"Royal Challengers Bengaluru", time:"02/04 (19:30)", h:"2.20", hv:"1.5M", d:"-", a:"1.78", av:"1.6M", live:false, matchNo:"Match 7",          venue:"Rajiv Gandhi Intl. Stadium, Hyd" },
  { sport:"Cricket - IPL 2026", icon:"🏏", t1:"Rajasthan Royals",            t2:"Delhi Capitals",         time:"03/04 (19:30)", h:"1.92", hv:"1.0M", d:"-", a:"2.00", av:"980k", live:false, matchNo:"Match 8",                 venue:"Sawai Mansingh Stadium, Jaipur" },
  { sport:"Cricket - IPL 2026", icon:"🏏", t1:"Kolkata Knight Riders",       t2:"Gujarat Titans",         time:"04/04 (19:30)", h:"1.75", hv:"1.8M", d:"-", a:"2.25", av:"1.7M", live:false, matchNo:"Match 9",                 venue:"Eden Gardens, Kolkata" },
  { sport:"Cricket - IPL 2026", icon:"🏏", t1:"Punjab Kings",                t2:"Lucknow Super Giants",   time:"05/04 (15:30)", h:"2.10", hv:"850k", d:"-", a:"1.88", av:"800k", live:false, matchNo:"Match 10",                venue:"New PCA Stadium, Mullanpur" },
  { sport:"Cricket - IPL 2026", icon:"🏏", t1:"Mumbai Indians",              t2:"Rajasthan Royals",       time:"06/04 (19:30)", h:"1.68", hv:"2.2M", d:"-", a:"2.35", av:"2.0M", live:false, matchNo:"Match 11",                venue:"Wankhede Stadium, Mumbai" },
  { sport:"Cricket - IPL 2026", icon:"🏏", t1:"Chennai Super Kings",         t2:"Gujarat Titans",         time:"07/04 (19:30)", h:"1.72", hv:"1.9M", d:"-", a:"2.28", av:"1.7M", live:false, matchNo:"Match 12",                venue:"MA Chidambaram Stadium, Chennai" },
  { sport:"Cricket - IPL 2026", icon:"🏏", t1:"Delhi Capitals",              t2:"Kolkata Knight Riders",  time:"08/04 (19:30)", h:"2.05", hv:"1.3M", d:"-", a:"1.90", av:"1.2M", live:false, matchNo:"Match 13",                venue:"Arun Jaitley Stadium, Delhi" },
  { sport:"Cricket - IPL 2026", icon:"🏏", t1:"Sunrisers Hyderabad",         t2:"Punjab Kings",           time:"09/04 (19:30)", h:"1.80", hv:"900k", d:"-", a:"2.12", av:"850k", live:false, matchNo:"Match 14",                venue:"Rajiv Gandhi Intl. Stadium, Hyd" },
  { sport:"Cricket - IPL 2026", icon:"🏏", t1:"Royal Challengers Bengaluru", t2:"Lucknow Super Giants",   time:"10/04 (19:30)", h:"1.65", hv:"2.5M", d:"-", a:"2.40", av:"2.3M", live:false, matchNo:"Match 15",                venue:"M. Chinnaswamy Stadium, Bengaluru" },
];

const TICKER = ["🏏 World Cup Final IND vs SA - Today 7PM  |  ","🎲 Color Prediction - 10X Bonus  |  ","🏆 IPL 2026 Starts 26 March 2026  |  ","💰 New Member? Get 10% Bonus  |  ","🎰 Evolution Casino - Live Tables Open  |  ","🔥 Teen Patti - Play & Win Big  |  "];

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
   WHATSAPP REDIRECT
───────────────────────────────────────────── */
const WA_NUMBERS = ["919119429785", "917888215202"];
let waIndex = 0;
function openWhatsApp(msg = "Hello, I want to create my ID on MangoPlay!") {
  const number = WA_NUMBERS[waIndex % WA_NUMBERS.length];
  waIndex++;
  window.open(`https://wa.me/${number}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
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
   ODDS CELL — new compact style
───────────────────────────────────────────── */
function OddsCell({ value, volume, label }) {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (value === "-") return;
    const t = setInterval(() => {
      setFlash(true);
      setTimeout(() => setFlash(false), 420);
    }, 3000 + Math.random() * 5000);
    return () => clearInterval(t);
  }, [value]);

  if (value === "-") {
    return (
      <div style={{
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
        background:"#0f0f28", borderRadius:6, padding:"6px 4px", minHeight:44,
        border:"1px solid #ffffff08"
      }}>
        <span style={{ color:"#333", fontSize:16, lineHeight:1 }}>—</span>
      </div>
    );
  }

  return (
    <button
      className="odds-btn"
      onClick={addRipple}
      style={{
        background: flash
          ? "linear-gradient(135deg,#ff6d00,#ffd740)"
          : "linear-gradient(135deg,#1e1560,#2d1f80)",
        border: flash ? "1px solid #ffd740" : "1px solid #7c4dff55",
        borderRadius:6,
        padding:"5px 4px",
        cursor:"pointer",
        color: flash ? "#000" : "#fff",
        fontWeight:800,
        fontSize:15,
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        gap:2,
        transition:"background 0.3s, transform 0.2s, filter 0.2s",
        width:"100%",
        minHeight:44,
        position:"relative",
        overflow:"hidden",
      }}
    >
      <span style={{ lineHeight:1, letterSpacing:0.5 }}>{value}</span>
      {volume && (
        <span style={{
          fontSize:8,
          opacity: flash ? 0.7 : 0.55,
          fontWeight:600,
          color: flash ? "#000" : "#a990ff",
          letterSpacing:0.3,
        }}>
          {volume}
        </span>
      )}
    </button>
  );
}

/* ─────────────────────────────────────────────
   MATCH CARD — BullPlay247-style with team colors
───────────────────────────────────────────── */
function MatchCard({ match, index, visible }) {
  const c1 = TEAM_COLORS[match.t1] || { bg:"linear-gradient(135deg,#1a1a40,#2a2a60)", accent:"#7c4dff", badge:"#f90" };
  const c2 = TEAM_COLORS[match.t2] || { bg:"linear-gradient(135deg,#1a1a40,#2a2a60)", accent:"#7c4dff", badge:"#f90" };

  return (
    <div
      className="match-card"
      onClick={() => openWhatsApp(`Hello, I want to bet on ${match.t1} vs ${match.t2} on MangoPlay!`)}
      style={{
        borderRadius:12,
        marginBottom:10,
        overflow:"hidden",
        border:"1px solid #ffffff12",
        transition:"all 0.25s",
        cursor:"pointer",
        animation: visible ? `cardEntrance 0.5s ease ${index * 0.07}s both` : "none",
        opacity: visible ? 1 : 0,
        boxShadow:"0 4px 20px rgba(0,0,0,0.5)",
      }}
    >
      {/* ── Top bar ── */}
      <div style={{
        background:"linear-gradient(90deg,#0f0f22,#1a1a38)",
        padding:"5px 10px",
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between",
        borderBottom:"1px solid #ffffff08",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <span style={{ fontSize:12 }}>{match.icon}</span>
          <span style={{ fontWeight:700, fontSize:10, color:"#f90", letterSpacing:0.5 }}>{match.sport}</span>
          <span style={{ fontSize:9, color:"#7c4dff99", fontWeight:600 }}>{match.matchNo}</span>
          {match.live && <LiveBadge />}
        </div>
        <span style={{ fontSize:10, color:"#555", fontWeight:600 }}>{match.time}</span>
      </div>

      {/* ── Team banners ── */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr" }}>
        {/* Team 1 */}
        <div style={{
          background: c1.bg,
          padding:"10px 12px",
          display:"flex",
          flexDirection:"column",
          justifyContent:"center",
          gap:3,
          position:"relative",
          overflow:"hidden",
        }}>
          <div style={{
            position:"absolute", top:0, right:0, bottom:0, width:"40%",
            background:"linear-gradient(90deg,transparent,rgba(0,0,0,0.3))",
            pointerEvents:"none",
          }} />
          <div style={{
            display:"inline-block",
            background: c1.badge,
            borderRadius:3,
            padding:"1px 6px",
            fontSize:8,
            fontWeight:800,
            color: c1.accent === c1.badge ? "#fff" : c1.accent,
            letterSpacing:0.5,
            width:"fit-content",
            marginBottom:2,
          }}>HOME</div>
          <div style={{ fontSize:12, fontWeight:800, color:"#fff", lineHeight:1.2, textShadow:"0 1px 4px rgba(0,0,0,0.6)" }}>
            {match.t1}
          </div>
        </div>

        {/* VS divider */}
        <div style={{
          background:"#0a0a1e",
          display:"flex",
          flexDirection:"column",
          alignItems:"center",
          justifyContent:"center",
          padding:"0 10px",
          gap:2,
          borderLeft:"1px solid #ffffff08",
          borderRight:"1px solid #ffffff08",
        }}>
          <div style={{ fontSize:9, fontWeight:900, color:"#444", letterSpacing:2 }}>VS</div>
        </div>

        {/* Team 2 */}
        <div style={{
          background: c2.bg,
          padding:"10px 12px",
          display:"flex",
          flexDirection:"column",
          justifyContent:"center",
          alignItems:"flex-end",
          gap:3,
          position:"relative",
          overflow:"hidden",
        }}>
          <div style={{
            position:"absolute", top:0, left:0, bottom:0, width:"40%",
            background:"linear-gradient(270deg,transparent,rgba(0,0,0,0.3))",
            pointerEvents:"none",
          }} />
          <div style={{
            display:"inline-block",
            background: c2.badge,
            borderRadius:3,
            padding:"1px 6px",
            fontSize:8,
            fontWeight:800,
            color: c2.accent === c2.badge ? "#fff" : c2.accent,
            letterSpacing:0.5,
            width:"fit-content",
            marginBottom:2,
          }}>AWAY</div>
          <div style={{ fontSize:12, fontWeight:800, color:"#fff", lineHeight:1.2, textAlign:"right", textShadow:"0 1px 4px rgba(0,0,0,0.6)" }}>
            {match.t2}
          </div>
        </div>
      </div>

      {/* ── Venue ── */}
      <div style={{ background:"#0d0d22", padding:"3px 12px", fontSize:9, color:"#444", display:"flex", alignItems:"center", gap:3, borderTop:"1px solid #ffffff06" }}>
        📍 {match.venue}
      </div>

      {/* ── Odds header labels ── */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"1fr 1fr 1fr",
        padding:"6px 10px 0",
        gap:6,
        background:"#0d0d22",
      }}>
        {["1", "X", "2"].map(label => (
          <div key={label} style={{
            textAlign:"center",
            fontSize:9,
            color:"#7c4dff",
            fontWeight:800,
            letterSpacing:1,
            background:"#7c4dff18",
            borderRadius:"4px 4px 0 0",
            padding:"2px 0",
          }}>
            {label}
          </div>
        ))}
      </div>

      {/* ── Odds cells ── */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"1fr 1fr 1fr",
        padding:"0 10px 10px",
        gap:6,
        background:"#0d0d22",
      }}>
        <OddsCell value={match.h} volume={`Vol: ${match.hv}`} />
        <OddsCell value={match.d} />
        <OddsCell value={match.a} volume={`Vol: ${match.av}`} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO BANNER - EXACT MATCH FROM IMAGE
───────────────────────────────────────────── */
function MangoWelcomeBanner({ animKey }) {
  return (
    <div style={{ position:"relative", overflow:"hidden", minHeight:180, background:"linear-gradient(135deg,#0a0015 0%,#1e0040 35%,#0d1040 70%,#050a20 100%)" }}>
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
      <div style={{ position:"absolute", top:"-20%", left:"10%", width:"35%", height:"140%", background:"rgba(255,255,255,0.02)", transform:"rotate(18deg)", pointerEvents:"none" }} />
      <div key={`content-${animKey}`} style={{ position:"relative", zIndex:2, padding:"24px 18px", display:"flex", alignItems:"center", minHeight:180 }}>
        <div style={{ flex:"0 0 60%", display:"flex", flexDirection:"column", justifyContent:"center", gap:2 }}>
          <div key={`t1-${animKey}`} style={{ fontSize:13, fontWeight:700, color:"#ffffff", letterSpacing:1, marginBottom:2, animation:"slideInLeft 0.4s ease both" }}>WELCOME TO</div>
          <div key={`t2-${animKey}`} style={{ fontSize:42, fontWeight:900, lineHeight:0.9, fontFamily:"'Oswald',sans-serif", letterSpacing:3, background:"linear-gradient(135deg,#a0d0ff,#4a9eff,#a0d0ff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", filter:"drop-shadow(0 0 12px #4a9effaa)", marginBottom:2, animation:"slideInLeft 0.5s ease both" }}>MANGO</div>
          <div key={`t3-${animKey}`} style={{ fontSize:22, fontWeight:900, color:"#ffffff", letterSpacing:1, fontFamily:"'Oswald',sans-serif", marginBottom:8, animation:"slideInLeft 0.6s ease both" }}>ONLINE BOOK</div>
          <div key={`t4-${animKey}`} style={{ marginTop:4, border:"2px solid #00dd44", borderRadius:30, padding:"6px 16px", display:"inline-flex", alignItems:"center", gap:6, fontSize:11, fontWeight:700, width:"fit-content", animation:"fadeUp 0.8s ease both" }}>
            <span style={{ color:"#00dd44", fontSize:14 }}>🎁</span>
            <span style={{ color:"#00dd44" }}>GET </span>
            <span style={{ color:"#ffaa00", fontWeight:900 }}>10% BONUS</span>
            <span style={{ color:"#00dd44" }}> ON NEW ID</span>
          </div>
        </div>
        <div key={`right-${animKey}`} style={{ flex:"0 0 40%", position:"relative", height:140, animation:"slideInRight 0.6s ease both" }}>
          <div style={{ position:"absolute", bottom:10, left:"10%", fontSize:70, lineHeight:1, filter:"drop-shadow(0 0 15px #4488ff)", transform:"scaleX(-1)", animation:"float 3s ease-in-out infinite" }}>🏏</div>
          <div style={{ position:"absolute", top:5, right:"5%", fontSize:45, lineHeight:1, filter:"drop-shadow(0 0 10px #ff5555)", animation:"float 2.8s ease-in-out infinite", animationDelay:"0.5s" }}>⚽</div>
          <div style={{ position:"absolute", top:"35%", right:"30%", fontSize:30, lineHeight:1, opacity:0.9, filter:"drop-shadow(0 0 8px #f9a826)", animation:"float 3.2s ease-in-out infinite", animationDelay:"0.2s" }}>🏀</div>
          <div style={{ position:"absolute", bottom:20, right:"15%", fontSize:28, lineHeight:1, opacity:0.8, filter:"drop-shadow(0 0 8px #ccff00)", animation:"float 2.5s ease-in-out infinite", animationDelay:"0.7s" }}>🎾</div>
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

  if (b.type === "mango_welcome") {
    return (
      <div style={{ position:"relative" }}>
        <MangoWelcomeBanner animKey={animKey} />
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
      <div key={`bg-${animKey}`} style={{ position:"absolute", inset:0, background:b.bg, animation:"bannerFade 3.8s ease forwards" }} />
      {particles.map(i => (
        <div key={i} style={{ position:"absolute", fontSize:12+i*3, opacity:0.1+i*0.02, top:`${8+i*11}%`, left:`${4+i*13}%`, animation:`particleFloat ${2.4+i*0.5}s ease-in-out infinite`, animationDelay:`${i*0.25}s`, pointerEvents:"none" }}>{b.particle}</div>
      ))}
      <div style={{ position:"absolute", top:0, left:"-30%", width:"60%", height:"200%", background:"rgba(255,255,255,0.04)", transform:"rotate(15deg)", pointerEvents:"none" }} />
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
   HOW IT WORKS
───────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    { num:"01", icon:"💬", title:"Message Us", desc:"Click WhatsApp & send us a message to create your free ID instantly", color:"#25D366" },
    { num:"02", icon:"💳", title:"Add Funds", desc:"Deposit via PhonePe, GPay, Paytm or UPI — minimum just ₹100", color:"#f90" },
    { num:"03", icon:"🏆", title:"Start Winning", desc:"Place bets on IPL, Casino, Color Prediction & win real cash", color:"#7c4dff" },
  ];
  return (
    <div style={{ background:"linear-gradient(160deg,#0d0d22,#120a28)", padding:"24px 14px 20px", position:"relative", overflow:"hidden" }}>
      {/* glow blobs */}
      <div style={{ position:"absolute", top:-30, left:-30, width:140, height:140, borderRadius:"50%", background:"radial-gradient(circle,#7c4dff18,transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-30, right:-30, width:140, height:140, borderRadius:"50%", background:"radial-gradient(circle,#f9900018,transparent 70%)", pointerEvents:"none" }} />

      {/* heading */}
      <div style={{ textAlign:"center", marginBottom:20 }}>
        <div style={{ display:"inline-block", background:"#7c4dff22", border:"1px solid #7c4dff44", borderRadius:20, padding:"3px 14px", fontSize:10, fontWeight:700, color:"#7c4dff", letterSpacing:2, marginBottom:8 }}>⚡ SIMPLE & FAST</div>
        <div style={{ fontSize:22, fontWeight:900, fontFamily:"'Oswald',sans-serif", letterSpacing:2 }}>
          <span style={{ color:"#fff" }}>HOW IT </span>
          <span style={{ background:"linear-gradient(135deg,#f90,#ffcc00)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>WORKS</span>
        </div>
        <div style={{ fontSize:11, color:"#555", marginTop:4 }}>Get started in under 2 minutes</div>
      </div>

      {/* steps */}
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:14, background:"linear-gradient(135deg,#13132b,#1a1535)", border:`1px solid ${s.color}33`, borderRadius:14, padding:"14px 16px", position:"relative", overflow:"hidden" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=s.color+"88"; e.currentTarget.style.transform="translateX(4px)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=s.color+"33"; e.currentTarget.style.transform="none";}}
          >
            <div style={{ position:"absolute", right:0, top:0, bottom:0, width:"35%", background:`linear-gradient(270deg,${s.color}08,transparent)`, pointerEvents:"none" }} />
            {/* Number */}
            <div style={{ fontSize:28, fontWeight:900, fontFamily:"'Oswald',sans-serif", color:s.color, opacity:0.25, minWidth:32, lineHeight:1 }}>{s.num}</div>
            {/* Icon circle */}
            <div style={{ width:44, height:44, borderRadius:"50%", background:`${s.color}22`, border:`2px solid ${s.color}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0, boxShadow:`0 0 12px ${s.color}33` }}>{s.icon}</div>
            {/* Text */}
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:800, color:"#fff", letterSpacing:0.5, marginBottom:3 }}>{s.title}</div>
              <div style={{ fontSize:10, color:"#777", lineHeight:1.5 }}>{s.desc}</div>
            </div>
            {/* Arrow */}
            <div style={{ fontSize:16, color:s.color, opacity:0.6 }}>→</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ textAlign:"center", marginTop:18 }}>
        <button onClick={()=>openWhatsApp("Hello, I want to create my ID on MangoPlay!")}
          style={{ background:"linear-gradient(135deg,#25D366,#128C7E)", border:"none", color:"#fff", padding:"12px 28px", borderRadius:40, fontWeight:800, fontSize:13, cursor:"pointer", fontFamily:"'Oswald',sans-serif", letterSpacing:1, boxShadow:"0 4px 20px rgba(37,211,102,0.4)", display:"inline-flex", alignItems:"center", gap:8 }}>
          <span>💬</span> CREATE FREE ID NOW
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   BONUS SECTION
───────────────────────────────────────────── */
function BonusSection() {
  const bonuses = [
    { icon:"🎁", title:"Welcome Bonus", value:"10%", desc:"On your first deposit", color:"#f90",    bg:"linear-gradient(135deg,#2a1500,#3a2000)" },
    { icon:"👥", title:"Refer & Earn",  value:"₹200", desc:"Per friend you refer", color:"#25D366", bg:"linear-gradient(135deg,#002a10,#003a18)" },
    { icon:"💰", title:"Daily Reload",  value:"5%",   desc:"On every redeposit",  color:"#00ccff", bg:"linear-gradient(135deg,#001a2a,#00253a)" },
    { icon:"🏆", title:"Win Cashback",  value:"2%",   desc:"On every losing bet", color:"#b44dff", bg:"linear-gradient(135deg,#1a0030,#25004a)" },
  ];
  return (
    <div style={{ background:"#0a0a1a", padding:"24px 14px 20px", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, background:"repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(124,77,255,0.015) 40px,rgba(124,77,255,0.015) 41px)", pointerEvents:"none" }} />

      {/* heading */}
      <div style={{ textAlign:"center", marginBottom:18 }}>
        <div style={{ display:"inline-block", background:"#f9900022", border:"1px solid #f9900044", borderRadius:20, padding:"3px 14px", fontSize:10, fontWeight:700, color:"#f90", letterSpacing:2, marginBottom:8 }}>🔥 EXCLUSIVE OFFERS</div>
        <div style={{ fontSize:22, fontWeight:900, fontFamily:"'Oswald',sans-serif", letterSpacing:2 }}>
          <span style={{ background:"linear-gradient(135deg,#f90,#ffcc00)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>BONUSES </span>
          <span style={{ color:"#fff" }}>& REWARDS</span>
        </div>
        <div style={{ fontSize:11, color:"#555", marginTop:4 }}>More ways to win every day</div>
      </div>

      {/* bonus cards */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        {bonuses.map((b, i) => (
          <div key={i} onClick={()=>openWhatsApp(`Hello, I want to claim the ${b.title} on MangoPlay!`)}
            style={{ background:b.bg, border:`1px solid ${b.color}33`, borderRadius:14, padding:"16px 12px", cursor:"pointer", textAlign:"center", position:"relative", overflow:"hidden", transition:"all 0.25s" }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow=`0 8px 24px ${b.color}33`;}}
            onMouseLeave={e=>{e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none";}}
          >
            <div style={{ position:"absolute", top:-20, right:-20, width:70, height:70, borderRadius:"50%", background:`radial-gradient(circle,${b.color}22,transparent 70%)`, pointerEvents:"none" }} />
            <div style={{ fontSize:28, marginBottom:6, filter:`drop-shadow(0 0 8px ${b.color}66)` }}>{b.icon}</div>
            <div style={{ fontSize:26, fontWeight:900, fontFamily:"'Oswald',sans-serif", color:b.color, lineHeight:1, marginBottom:2 }}>{b.value}</div>
            <div style={{ fontSize:11, fontWeight:800, color:"#fff", marginBottom:3 }}>{b.title}</div>
            <div style={{ fontSize:9, color:"#666" }}>{b.desc}</div>
            <div style={{ marginTop:8, display:"inline-block", background:`${b.color}22`, border:`1px solid ${b.color}44`, borderRadius:10, padding:"2px 10px", fontSize:9, fontWeight:700, color:b.color }}>CLAIM NOW →</div>
          </div>
        ))}
      </div>

      {/* urgent ticker */}
      <div style={{ marginTop:14, background:"linear-gradient(90deg,#1a0a00,#2a1500,#1a0a00)", border:"1px solid #f9900033", borderRadius:10, padding:"8px 14px", display:"flex", alignItems:"center", gap:8 }}>
        <span style={{ animation:"blink 1s infinite", fontSize:14 }}>⏰</span>
        <span style={{ fontSize:11, color:"#f90", fontWeight:700 }}>LIMITED TIME: </span>
        <span style={{ fontSize:11, color:"#ffcc88" }}>Welcome bonus doubles this week only!</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────────── */
function Testimonials() {
  const reviews = [
    { name:"Rahul M.", city:"Mumbai", avatar:"👨", stars:5, text:"Withdrew ₹18,000 within 10 minutes! Best platform I've used. Support is top class 🔥", won:"₹18,000", game:"IPL Betting" },
    { name:"Priya S.", city:"Delhi",  avatar:"👩", stars:5, text:"Color prediction game is so fun and the payouts are instant. Already referred 3 friends!", won:"₹6,500",  game:"Color Prediction" },
    { name:"Arjun K.", city:"Pune",   avatar:"🧑", stars:5, text:"Got my ID in 2 minutes on WhatsApp. Deposited ₹500 and won ₹4,200 on MI vs CSK!",  won:"₹4,200",  game:"Cricket" },
    { name:"Vikram T.", city:"Hyderabad", avatar:"👨", stars:5, text:"The welcome bonus is real! Got 10% extra on first deposit. Playing daily now 💪",  won:"₹9,800",  game:"Casino" },
  ];

  return (
    <div style={{ background:"linear-gradient(160deg,#0d0d22,#0a1220)", padding:"24px 14px 20px", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:-20, right:-20, width:160, height:160, borderRadius:"50%", background:"radial-gradient(circle,#7c4dff12,transparent 70%)", pointerEvents:"none" }} />

      {/* heading */}
      <div style={{ textAlign:"center", marginBottom:18 }}>
        <div style={{ display:"inline-block", background:"#7c4dff22", border:"1px solid #7c4dff44", borderRadius:20, padding:"3px 14px", fontSize:10, fontWeight:700, color:"#7c4dff", letterSpacing:2, marginBottom:8 }}>⭐ REAL WINNERS</div>
        <div style={{ fontSize:22, fontWeight:900, fontFamily:"'Oswald',sans-serif", letterSpacing:2 }}>
          <span style={{ color:"#fff" }}>WHAT OUR </span>
          <span style={{ background:"linear-gradient(135deg,#f90,#ffcc00)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>PLAYERS SAY</span>
        </div>
        <div style={{ fontSize:11, color:"#555", marginTop:4 }}>50,000+ happy players across India</div>
      </div>

      {/* review cards */}
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {reviews.map((r, i) => (
          <div key={i} style={{ background:"linear-gradient(135deg,#13132b,#1c1840)", border:"1px solid #7c4dff22", borderRadius:14, padding:"14px", position:"relative", overflow:"hidden", animation:`cardEntrance 0.5s ease ${i*0.1}s both` }}>
            <div style={{ position:"absolute", top:0, right:0, bottom:0, width:"25%", background:"linear-gradient(270deg,#7c4dff08,transparent)", pointerEvents:"none" }} />

            {/* top row */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,#7c4dff,#b44dff)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, boxShadow:"0 0 10px #7c4dff44" }}>{r.avatar}</div>
                <div>
                  <div style={{ fontSize:12, fontWeight:800, color:"#fff" }}>{r.name}</div>
                  <div style={{ fontSize:9, color:"#666" }}>📍 {r.city}</div>
                </div>
              </div>
              {/* Won badge */}
              <div style={{ background:"linear-gradient(135deg,#003a10,#004a18)", border:"1px solid #25D36644", borderRadius:8, padding:"4px 10px", textAlign:"center" }}>
                <div style={{ fontSize:9, color:"#25D366", fontWeight:600 }}>WON</div>
                <div style={{ fontSize:14, fontWeight:900, color:"#25D366", fontFamily:"'Oswald',sans-serif" }}>{r.won}</div>
              </div>
            </div>

            {/* stars */}
            <div style={{ display:"flex", gap:2, marginBottom:6 }}>
              {[...Array(r.stars)].map((_,j) => <span key={j} style={{ fontSize:11, color:"#f90" }}>★</span>)}
              <span style={{ fontSize:9, color:"#555", marginLeft:4, alignSelf:"center" }}>via {r.game}</span>
            </div>

            {/* review text */}
            <div style={{ fontSize:11, color:"#aaa", lineHeight:1.6, fontStyle:"italic" }}>"{r.text}"</div>
          </div>
        ))}
      </div>

      {/* social proof bar */}
      <div style={{ marginTop:14, background:"linear-gradient(135deg,#12122a,#1a1535)", border:"1px solid #7c4dff22", borderRadius:12, padding:"12px 16px", display:"flex", justifyContent:"space-around", alignItems:"center" }}>
        {[{ val:"4.9★", label:"Rating" },{ val:"50K+", label:"Players" },{ val:"₹2Cr+", label:"Paid Out" }].map((s,i) => (
          <div key={i} style={{ textAlign:"center" }}>
            <div style={{ fontSize:16, fontWeight:900, fontFamily:"'Oswald',sans-serif", background:"linear-gradient(135deg,#f90,#ffcc00)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{s.val}</div>
            <div style={{ fontSize:9, color:"#555", fontWeight:600 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TRUST & WHATSAPP FOOTER — REDESIGNED
───────────────────────────────────────────── */
function TrustFooter() {
  const stats = [
    { value:"50K+", label:"Active Players", icon:"👥" },
    { value:"₹2Cr+", label:"Paid Out Daily", icon:"💰" },
    { value:"24/7",  label:"Live Support",   icon:"🎧" },
  ];
  const payments = [
    { label:"PhonePe", icon:"📱" },
    { label:"GPay",    icon:"💳" },
    { label:"Paytm",   icon:"💰" },
    { label:"UPI",     icon:"🔗" },
  ];
  const features = [
    { icon:"⚡", title:"Instant ID", desc:"Get your ID in under 2 mins" },
    { icon:"💸", title:"Fast Withdrawal", desc:"Money in your account same day" },
    { icon:"🔒", title:"100% Secure", desc:"Encrypted & safe transactions" },
    { icon:"🎧", title:"24/7 Support", desc:"Always here to help you" },
  ];

  return (
    <div style={{ position:"relative", overflow:"hidden", paddingBottom:90 }}>

      {/* ── Glowing divider line ── */}
      <div style={{ height:2, background:"linear-gradient(90deg,transparent,#7c4dff,#f90,#7c4dff,transparent)" }} />

      {/* ── Stats bar ── */}
      <div style={{
        background:"linear-gradient(135deg,#0f0f28 0%,#1a0a35 50%,#0f0f28 100%)",
        display:"grid", gridTemplateColumns:"1fr 1fr 1fr",
        borderBottom:"1px solid #7c4dff22",
      }}>
        {stats.map((s,i) => (
          <div key={i} style={{
            textAlign:"center", padding:"16px 8px 12px",
            borderRight:i<2?"1px solid #7c4dff18":"none",
            position:"relative", overflow:"hidden",
          }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, bottom:0, background:`radial-gradient(circle at 50% 0%, #7c4dff12, transparent 70%)`, pointerEvents:"none" }} />
            <div style={{ fontSize:18, marginBottom:2 }}>{s.icon}</div>
            <div style={{ fontSize:22, fontWeight:900, fontFamily:"'Oswald',sans-serif", background:"linear-gradient(135deg,#f90,#ffcc00)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", letterSpacing:1 }}>{s.value}</div>
            <div style={{ fontSize:9, color:"#666", fontWeight:600, letterSpacing:1, marginTop:1 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Main CTA section ── */}
      <div style={{
        background:"linear-gradient(160deg,#0d0d22 0%,#150a30 40%,#0a1220 100%)",
        padding:"28px 18px 24px",
        textAlign:"center",
        position:"relative",
        overflow:"hidden",
      }}>
        {/* Background glow blobs */}
        <div style={{ position:"absolute", top:-40, left:-40, width:180, height:180, borderRadius:"50%", background:"radial-gradient(circle,#7c4dff22,transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-40, right:-40, width:180, height:180, borderRadius:"50%", background:"radial-gradient(circle,#f9900022,transparent 70%)", pointerEvents:"none" }} />
        {/* Floating particles */}
        {[...Array(10)].map((_,i) => (
          <div key={i} style={{ position:"absolute", width:i%3===0?3:2, height:i%3===0?3:2, borderRadius:"50%", background:i%2===0?"#7c4dff":"#f90", top:`${5+i*9}%`, left:`${3+i*10}%`, opacity:0.15, animation:`particleFloat ${2.5+i*0.4}s ease-in-out infinite`, animationDelay:`${i*0.2}s`, pointerEvents:"none" }} />
        ))}

        {/* Heading */}
        <div style={{ position:"relative", zIndex:2 }}>
          <div style={{ display:"inline-block", background:"linear-gradient(90deg,#7c4dff22,#f9900022)", border:"1px solid #7c4dff44", borderRadius:20, padding:"4px 16px", fontSize:10, fontWeight:700, color:"#7c4dff", letterSpacing:2, marginBottom:12 }}>
            🥭 INDIA'S TRUSTED ONLINE BOOK
          </div>
          <div style={{ fontSize:26, fontWeight:900, fontFamily:"'Oswald',sans-serif", letterSpacing:2, lineHeight:1.1, marginBottom:6 }}>
            <span style={{ background:"linear-gradient(135deg,#fff,#ccc)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>JOIN </span>
            <span style={{ background:"linear-gradient(135deg,#f90,#ffcc00)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", animation:"glow 2.5s infinite" }}>MANGO </span>
            <span style={{ background:"linear-gradient(135deg,#fff,#ccc)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>TODAY</span>
          </div>
          <div style={{ fontSize:11, color:"#888", marginBottom:22, letterSpacing:0.5 }}>
            Over <span style={{ color:"#f90", fontWeight:700 }}>50,000 players</span> trust us every day
          </div>

          {/* WhatsApp CTA button */}
          <div style={{ position:"relative", display:"inline-block", marginBottom:20 }}>
            <div style={{ position:"absolute", inset:-6, borderRadius:50, background:"linear-gradient(135deg,#25D366,#128C7E)", opacity:0.3, filter:"blur(14px)", animation:"pulse 2s infinite" }} />
            <a href="#" onClick={e=>{e.preventDefault();openWhatsApp("Hello, I want to create my ID on MangoPlay!");}}
              style={{
                position:"relative", display:"inline-flex", alignItems:"center", gap:10,
                background:"linear-gradient(135deg,#25D366 0%,#1ebe5d 50%,#128C7E 100%)",
                color:"#fff", padding:"14px 32px", borderRadius:50,
                fontWeight:900, fontSize:15, textDecoration:"none",
                boxShadow:"0 6px 30px rgba(37,211,102,0.5)",
                border:"1px solid rgba(255,255,255,0.2)",
                fontFamily:"'Oswald',sans-serif", letterSpacing:1,
                overflow:"hidden",
              }}>
              <div style={{ position:"absolute", top:0, left:"-100%", width:"60%", height:"100%", background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)", animation:"shimmer 2.5s infinite" }} />
              <span style={{ fontSize:22 }}>💬</span>
              GET YOUR ID ON WHATSAPP
            </a>
          </div>

          {/* Feature grid */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:20 }}>
            {features.map((f,i) => (
              <div key={i} style={{
                background:"linear-gradient(135deg,#12122a,#1a1535)",
                border:"1px solid #7c4dff22",
                borderRadius:12,
                padding:"12px 10px",
                textAlign:"left",
                display:"flex", alignItems:"center", gap:10,
                transition:"all 0.25s",
              }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="#7c4dff88"; e.currentTarget.style.transform="translateY(-2px)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="#7c4dff22"; e.currentTarget.style.transform="none";}}
              >
                <div style={{ fontSize:22, flexShrink:0, filter:"drop-shadow(0 0 6px #7c4dff66)" }}>{f.icon}</div>
                <div>
                  <div style={{ fontSize:11, fontWeight:800, color:"#fff", letterSpacing:0.5 }}>{f.title}</div>
                  <div style={{ fontSize:9, color:"#666", marginTop:1 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Payment methods */}
          <div style={{ marginBottom:20 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, justifyContent:"center", marginBottom:10 }}>
              <div style={{ height:1, flex:1, background:"linear-gradient(90deg,transparent,#7c4dff33)" }} />
              <span style={{ fontSize:9, color:"#555", fontWeight:700, letterSpacing:2 }}>SECURE PAYMENTS</span>
              <div style={{ height:1, flex:1, background:"linear-gradient(90deg,#7c4dff33,transparent)" }} />
            </div>
            <div style={{ display:"flex", justifyContent:"center", gap:8, flexWrap:"wrap" }}>
              {payments.map((p) => (
                <div key={p.label} style={{
                  background:"linear-gradient(135deg,#12122a,#1c1540)",
                  padding:"8px 14px", borderRadius:10,
                  fontSize:11, fontWeight:700, color:"#bbb",
                  border:"1px solid #7c4dff33",
                  display:"flex", alignItems:"center", gap:6,
                  boxShadow:"0 2px 10px rgba(0,0,0,0.3)",
                }}>
                  <span style={{ fontSize:16 }}>{p.icon}</span>{p.label}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom divider + disclaimer */}
          <div style={{ height:1, background:"linear-gradient(90deg,transparent,#7c4dff44,#f90044,#7c4dff44,transparent)", marginBottom:14 }} />
          <div style={{ fontSize:9, color:"#333", marginBottom:10 }}>
            Mango Online Book — Trusted by 50,000+ players across India
          </div>
          <div style={{
            display:"inline-flex", alignItems:"center", gap:6,
            background:"linear-gradient(135deg,#1a0a0a,#2a0a0a)",
            border:"1px solid #ff444433",
            borderRadius:8, padding:"5px 14px",
            fontSize:9, color:"#ff6666", fontWeight:700, letterSpacing:1,
          }}>
            🔞 18+ ONLY &nbsp;•&nbsp; PLEASE PLAY RESPONSIBLY
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   GAME CARDS COMPONENT
───────────────────────────────────────────── */
const GAME_DATA = [
  {
    label:"AVIATOR", sub:"Crash Game", badge:"🔥 HOT", mult:"1000x",
    glow:"#ff3333", accent:"#ff8888",
    bg:"linear-gradient(145deg,#1c0000 0%,#4a0008 50%,#1a0010 100%)",
  },
  {
    label:"MINES", sub:"Instant Win", badge:"⚡ NEW", mult:"2500x",
    glow:"#0088ff", accent:"#55ccff",
    bg:"linear-gradient(145deg,#000c20 0%,#001a50 50%,#000820 100%)",
  },
  {
    label:"TEEN PATTI", sub:"Card Game", badge:"🃏 POPULAR", mult:"500x",
    glow:"#cc44ff", accent:"#ee99ff",
    bg:"linear-gradient(145deg,#1a0030 0%,#3a0065 50%,#180028 100%)",
  },
  {
    label:"COLOR PREDICTION", sub:"Predict & Win", badge:"🔴 LIVE", mult:"9x",
    glow:"#00cc66", accent:"#55ffaa",
    bg:"linear-gradient(145deg,#001408 0%,#003018 50%,#001208 100%)",
  },
];

function GameCard({ card, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={()=>openWhatsApp(`Hello, I want to play ${card.label} on MangoPlay!`)}
      onMouseEnter={()=>setHovered(true)}
      onMouseLeave={()=>setHovered(false)}
      style={{
        position:"relative", borderRadius:16, overflow:"hidden",
        height:150, cursor:"pointer",
        background: card.bg,
        animation:`cardEntrance 0.5s ease ${0.05+index*0.1}s both`,
        transform: hovered ? "translateY(-8px) scale(1.05)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? `0 18px 40px ${card.glow}66, 0 0 0 1.5px ${card.glow}`
          : `0 5px 20px ${card.glow}33`,
        transition:"transform 0.3s cubic-bezier(.2,.8,.3,1), box-shadow 0.3s ease",
      }}
    >
      {/* 🔴 REPLACED: SVG Illustration with Image */}
      <img
        src={`/games/${card.label.toLowerCase().replace(/\s/g,"")}_card.png`}
        alt={card.label}
        className="gc-img"
        style={{
          position:"absolute",
          inset:0,
          width:"100%",
          height:"100%",
          objectFit:"cover"
        }}
      />

      {/* Radial glow orb */}
      <div style={{
        position:"absolute", top:"15%", left:"25%",
        width:100, height:100, borderRadius:"50%",
        background:`radial-gradient(circle,${card.glow}55,transparent 70%)`,
        transform: hovered ? "scale(1.8)" : "scale(0.8)",
        opacity: hovered ? 0.9 : 0.35,
        transition:"transform 0.45s ease, opacity 0.45s ease",
        zIndex:2, pointerEvents:"none",
      }}/>

      {/* Floating particles */}
      {[0,1,2,3].map(j=>(
        <div key={j} style={{
          position:"absolute",
          width: j%2===0?4:3, height: j%2===0?4:3,
          borderRadius:"50%", background:card.glow,
          top:`${12+j*19}%`, left:`${8+j*23}%`,
          opacity: hovered ? 0.8 : 0.2,
          boxShadow:`0 0 ${hovered?10:4}px ${card.glow}`,
          animation:`orbFloat ${2.2+j*0.6}s ease-in-out infinite`,
          animationDelay:`${j*0.35}s`,
          transition:"opacity 0.3s, box-shadow 0.3s",
          zIndex:3, pointerEvents:"none",
        }}/>
      ))}

      {/* Scanlines */}
      <div style={{position:"absolute",inset:0,zIndex:4,background:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.06) 3px,rgba(0,0,0,0.06) 4px)",pointerEvents:"none"}}/>

      {/* Shine sweep on hover */}
      <div style={{
        position:"absolute", top:0, bottom:0, width:"55%",
        background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)",
        left: hovered ? "120%" : "-70%",
        transition:"left 0.5s ease",
        zIndex:5, pointerEvents:"none",
      }}/>

      {/* Bottom gradient */}
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:70,background:"linear-gradient(to top,rgba(0,0,0,0.97) 0%,rgba(0,0,0,0.5) 65%,transparent 100%)",zIndex:6}}/>

      {/* Neon border */}
      <div style={{
        position:"absolute", inset:0, borderRadius:16, zIndex:7, pointerEvents:"none",
        border: hovered ? `1.5px solid ${card.glow}` : "1.5px solid rgba(255,255,255,0.06)",
        boxShadow: hovered ? `inset 0 0 20px ${card.glow}22` : "none",
        transition:"border 0.3s ease, box-shadow 0.3s ease",
      }}/>

      {/* Badge */}
      <div style={{
        position:"absolute", top:9, left:9, zIndex:9,
        background:`linear-gradient(135deg,${card.glow},${card.glow}88)`,
        borderRadius:7, padding:"2px 9px",
        fontSize:8, fontWeight:900, color:"#000", letterSpacing:0.8,
        boxShadow:`0 2px 8px ${card.glow}66`,
      }}>{card.badge}</div>

      {/* Multiplier */}
      <div style={{
        position:"absolute", top:9, right:9, zIndex:9,
        background:"rgba(0,0,0,0.75)", border:`1px solid ${card.glow}55`,
        borderRadius:7, padding:"2px 8px",
        fontSize:9, fontWeight:900, color:card.accent,
      }}>UP TO {card.mult}</div>

      {/* Title — slides up on hover */}
      <div style={{
        position:"absolute", zIndex:9,
        bottom: hovered ? 33 : 10,
        left:10, right:10,
        transition:"bottom 0.3s cubic-bezier(.2,.8,.3,1)",
      }}>
        <div style={{fontSize:14,fontWeight:900,color:"#fff",fontFamily:"'Oswald',sans-serif",letterSpacing:1.5,lineHeight:1,textShadow:`0 0 18px ${card.glow}`}}>{card.label}</div>
        <div style={{fontSize:9,color:card.accent,marginTop:3,fontWeight:600}}>{card.sub}</div>
      </div>

      {/* PLAY NOW — slides up from bottom */}
      <div style={{
        position:"absolute", bottom:0, left:0, right:0, zIndex:9,
        background:`linear-gradient(90deg,${card.glow}ee,${card.glow}aa)`,
        padding:"8px 0", textAlign:"center",
        fontSize:11, fontWeight:900, color:"#000",
        letterSpacing:1.5, fontFamily:"'Oswald',sans-serif",
        transform: hovered ? "translateY(0%)" : "translateY(100%)",
        opacity: hovered ? 1 : 0,
        transition:"transform 0.32s cubic-bezier(.2,.8,.3,1), opacity 0.32s ease",
        borderTop:`1px solid ${card.glow}88`,
      }}>▶ &nbsp;PLAY NOW</div>
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
                <div style={{ color:"#aaa", fontSize:11, letterSpacing:2, fontWeight:700, fontFamily:"'Rajdhani',sans-serif" }}>ONLINE BOOK</div>
              </div>
            </div>
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            <LiveBadge />
            <button className="header-btn" onClick={e=>{addRipple(e);openWhatsApp("Hello, I want to login to my MangoPlay ID!");}} style={{ background:"transparent", border:"2px solid #7c4dff", color:"#fff", borderRadius:7, padding:"6px 16px", fontWeight:700, cursor:"pointer", fontSize:13, transition:"all 0.2s" }}>Login</button>
            <button className="header-btn" onClick={e=>{addRipple(e);openWhatsApp("Hello, I want to create a new ID on MangoPlay!");}} style={{ background:"linear-gradient(90deg,#7c4dff,#b44dff)", border:"none", color:"#fff", borderRadius:7, padding:"6px 16px", fontWeight:700, cursor:"pointer", fontSize:13, boxShadow:"0 0 16px #7c4dff66", transition:"all 0.2s" }}>Sign up</button>
          </div>
        </header>

        {/* ═══ SIDE MENU OVERLAY ═══ */}
        {menuOpen && (
          <div style={{ position:"fixed", inset:0, zIndex:250 }} onClick={()=>setMenuOpen(false)}>
            <div onClick={e=>e.stopPropagation()} style={{ position:"absolute", left:0, top:0, bottom:0, width:260, background:"linear-gradient(160deg,#11112a,#0a0a18)", padding:20, animation:"slideInLeft 0.3s ease", borderRight:"2px solid #7c4dff44", overflowY:"auto" }}>
              <div style={{ fontSize:26, marginBottom:24, fontFamily:"'Oswald',sans-serif" }}>🥭 <span style={{ color:"#f90" }}>MANGO</span></div>
              {["🏠 Home","🏏 Cricket","⚽ Football","🎾 Tennis","🏀 Basketball","🐴 Racing","🎰 Casino","🎲 Games","💰 Promotions","👤 My Account","📞 Support","⚙️ Settings"].map(item => (
                <div key={item} className="sidebar-item" onClick={()=>openWhatsApp(`Hello, I want to know more about ${item.replace(/^.+? /,"")} on MangoPlay!`)} style={{ padding:"12px 10px", borderRadius:8, cursor:"pointer", fontSize:14, fontWeight:600, color:"#ccc", borderBottom:"1px solid #ffffff07", transition:"all 0.2s", paddingLeft:10 }}>{item}</div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ TICKER ═══ */}
        <TickerBar />

        {/* ═══ HERO BANNER ═══ */}
        <HeroBanner />

        {/* ═══ CATEGORY BAR — BULLPLAY MINI BANNERS ═══ */}
        <CategoryBar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* ═══ GAME CARDS — PREMIUM CASINO LOBBY ═══ */}
        <div style={{ padding:"10px 10px 6px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
            <span style={{ fontWeight:900, fontSize:15, color:"#f90", fontFamily:"'Oswald',sans-serif", letterSpacing:1, animation:"glow 2.5s infinite" }}>🎮 POPULAR GAMES</span>
            <span style={{ fontSize:10, color:"#7c4dff", fontWeight:700, cursor:"pointer" }}
              onClick={()=>openWhatsApp("Hello, I want to explore all games on MangoPlay!")}>VIEW ALL →</span>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {GAME_DATA.map((card,i) => <GameCard key={card.label} card={card} index={i} />)}
          </div>
        </div>

                {/* ═══ MENU BUTTONS ═══ */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, padding:"4px 10px" }}>
          {MENU_ITEMS.map((item, i) => (
            <button key={item.label} className="menu-btn" onClick={e=>{setActiveMenu(item.label); addRipple(e); openWhatsApp(`Hello, I want to know more about ${item.label} on MangoPlay!`);}}
              style={{ background:activeMenu===item.label?"linear-gradient(90deg,#7c4dff,#b44dff)":"#1a1a35", border:`1px solid ${activeMenu===item.label?"#7c4dff":"#7c4dff33"}`, color:"#fff", borderRadius:9, padding:"11px 12px", fontWeight:700, fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", gap:8, transition:"all 0.2s", animation:`fadeUp 0.4s ease ${0.2+i*0.08}s both`, boxShadow:activeMenu===item.label?"0 0 18px #7c4dff55":"none" }}>
              <span style={{ fontSize:16 }}>{item.icon}</span>{item.label}
            </button>
          ))}
          <button className="menu-btn" onClick={e=>{setActiveMenu("Inplay"); addRipple(e); openWhatsApp("Hello, I want to bet on Inplay matches on MangoPlay!");}}
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
          <span onClick={()=>openWhatsApp("Hello, I want to bet on IPL 2026 on MangoPlay!")} style={{ background:"#000", color:"#ff9933", padding:"4px 12px", borderRadius:16, fontSize:11, fontWeight:700, animation:"pulse 2s infinite", flexShrink:0, cursor:"pointer" }}>LIVE SOON</span>
        </div>

        {/* ═══ IPL MATCHES HEADER ═══ */}
        <div style={{ padding:"10px 12px 6px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:20 }}>🏏</span>
            <span style={{ fontWeight:800, fontSize:16, color:"#f90", fontFamily:"'Oswald',sans-serif", letterSpacing:1, animation:"glow 2.5s infinite" }}>IPL 2026 • TATA IPL</span>
            <LiveBadge />
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:12, background:"#7c4dff33", padding:"4px 10px", borderRadius:12, color:"#aaa", fontWeight:600 }}>15 Matches</span>
            <span style={{ fontSize:11, color:"#7c4dff", cursor:"pointer", fontWeight:700, transition:"color 0.2s" }}
              onClick={()=>openWhatsApp("Hello, I want to see all IPL 2026 matches on MangoPlay!")}
              onMouseEnter={e=>e.target.style.color="#f90"}
              onMouseLeave={e=>e.target.style.color="#7c4dff"}>
              VIEW ALL →
            </span>
          </div>
        </div>

        {/* ═══ IPL MATCH CARDS — NEW BullPlay247-style UI ═══ */}
        <div style={{ padding:"4px 10px 12px" }}>
          {LIVE_MATCHES.map((match, i) => (
            <MatchCard key={i} match={match} index={i} visible={cardsVis} />
          ))}
        </div>

        {/* ═══ HOW IT WORKS ═══ */}
        <HowItWorks />

        {/* ═══ BONUSES ═══ */}
        <BonusSection />

        {/* ═══ TESTIMONIALS ═══ */}
        <Testimonials />

        {/* ═══ TRUST & WHATSAPP FOOTER ═══ */}
        <TrustFooter />

        {/* ═══ BOTTOM NAV ═══ */}
        <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:480, background:"rgba(10,10,28,0.97)", borderTop:"2px solid #7c4dff33", display:"flex", justifyContent:"space-around", padding:"8px 0 4px", zIndex:100, backdropFilter:"blur(12px)" }}>
          {[{icon:"🏠",label:"Home"},{icon:"⚽",label:"Sports"},{icon:"🎰",label:"Casino"},{icon:"🎁",label:"Offers"},{icon:"👤",label:"Account"}].map((item,i) => (
            <button key={item.label} className="bottom-nav-btn"
              onClick={()=>openWhatsApp(`Hello, I want to access ${item.label} on MangoPlay!`)} style={{ background:"none", border:"none", color:"#777", display:"flex", flexDirection:"column", alignItems:"center", gap:2, cursor:"pointer", fontSize:10, fontWeight:700, transition:"all 0.2s", animation:`fadeUp 0.5s ease ${i*0.07}s both` }}>
              <span style={{ fontSize:20 }}>{item.icon}</span>{item.label}
            </button>
          ))}
        </div>

        {/* ═══ SUPPORT BUBBLE ═══ */}
        <div style={{ position:"fixed", bottom:70, right:16, zIndex:150, animation:"float 3s ease-in-out infinite" }}>
          <div style={{ background:"linear-gradient(135deg,#7c4dff,#b44dff)", borderRadius:"50%", width:50, height:50, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, cursor:"pointer", boxShadow:"0 0 22px #7c4dff99", transition:"transform 0.2s" }}
            onMouseEnter={e=>e.currentTarget.style.transform="scale(1.15)"}
            onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
            onClick={()=>openWhatsApp("Hello, I need support on MangoPlay!")}>💬</div>
          <div style={{ position:"absolute", top:-8, right:-4, background:"#e00", borderRadius:"50%", width:18, height:18, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:900, animation:"liveGlow 1s infinite" }}>24</div>
        </div>

        {/* ═══ LOGIN MODAL ═══ */}
        <Modal title="LOGIN" open={loginOpen} onClose={()=>setLoginOpen(false)}>
          <Input placeholder="Username / Email" />
          <Input placeholder="Password" type="password" />
          <div style={{ textAlign:"right", marginBottom:16 }}>
            <span style={{ fontSize:12, color:"#7c4dff", cursor:"pointer" }}>Forgot Password?</span>
          </div>
          <button onClick={e=>{addRipple(e);openWhatsApp("Hello, I want to login to my MangoPlay ID!");}} style={{ width:"100%", background:"linear-gradient(90deg,#7c4dff,#b44dff)", border:"none", color:"#fff", padding:13, borderRadius:9, fontWeight:800, fontSize:15, cursor:"pointer", letterSpacing:1, boxShadow:"0 0 22px #7c4dff55", marginBottom:12, fontFamily:"'Oswald',sans-serif", position:"relative", overflow:"hidden", transition:"filter 0.2s" }}>
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
          <button onClick={e=>{addRipple(e);openWhatsApp("Hello, I want to create a new ID on MangoPlay!");}} style={{ width:"100%", background:"linear-gradient(90deg,#f90,#ffcc00)", border:"none", color:"#000", padding:13, borderRadius:9, fontWeight:800, fontSize:15, cursor:"pointer", letterSpacing:1, marginBottom:10, fontFamily:"'Oswald',sans-serif", position:"relative", overflow:"hidden" }}>
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