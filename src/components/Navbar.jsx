export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 bg-[#0b0b1a] border-b border-white/10">
      <div className="max-w-md mx-auto flex items-center justify-between px-3 py-2">

        {/* Left Side */}
        <div className="flex items-center gap-2">
          <span className="text-xl cursor-pointer text-white">☰</span>

          <div className="flex items-center gap-1">
            <img
              src="/logo.png"
              alt="Mango Online Book"
              className="h-12 w-auto object-contain"
              style={{
                filter: "drop-shadow(0 0 8px rgba(255,170,0,0.6))",
              }}
            />

            <div className="flex flex-col leading-none">
              <span className="text-yellow-400 font-extrabold text-sm tracking-wide">
                MANGO
              </span>
              <span className="text-[9px] text-gray-400 tracking-widest">
                ONLINE BOOK
              </span>
            </div>
          </div>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-xs border border-purple-500 text-white rounded font-bold tracking-wide hover:bg-purple-500/10 transition">
            LOGIN
          </button>

          <button
            className="px-3 py-1.5 text-xs rounded font-bold tracking-wide text-white"
            style={{
              background: "linear-gradient(90deg,#7c4dff,#b44dff)",
              boxShadow: "0 0 12px #7c4dff66",
            }}
          >
            SIGN UP
          </button>
        </div>

      </div>
    </div>
  );
}