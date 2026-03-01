function MangoWelcomeBanner() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "90vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        paddingLeft: "8%",
        color: "#fff",
        fontFamily: "Rajdhani, sans-serif",
      }}
    >
      {/* Background Image (Direct URL) */}
      <img
        src="https://images.unsplash.com/photo-1606166325695-89b2bca8b8d0?q=80&w=2070&auto=format&fit=crop"
        alt="Hero"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          animation: "bannerZoom 12s ease-in-out infinite alternate",
        }}
      />

      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.75), rgba(0,0,0,0.3))",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "600px",
          animation: "slideInLeft 1.2s ease forwards",
        }}
      >
        <h4 style={{ fontSize: "22px", letterSpacing: "2px" }}>
          WELCOME TO
        </h4>

        <h1
          style={{
            fontSize: "64px",
            fontWeight: "700",
            background: "linear-gradient(90deg,#00d4ff,#c800ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          MANGO
        </h1>

        <h3 style={{ fontSize: "28px", marginBottom: "25px" }}>
          ONLINE BOOK
        </h3>

        <button
          style={{
            padding: "14px 28px",
            fontSize: "16px",
            fontWeight: "600",
            border: "none",
            borderRadius: "40px",
            background: "linear-gradient(135deg,#ff9900,#ffcc00)",
            color: "#000",
            cursor: "pointer",
            boxShadow: "0 0 25px rgba(255,153,0,0.6)",
            animation: "pulse 2s infinite",
          }}
        >
          GET 10% BONUS ON NEW ID
        </button>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes bannerZoom {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
}