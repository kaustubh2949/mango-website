export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 bg-[#0b0b1a] border-b border-white/10">
      <div className="max-w-md mx-auto flex items-center justify-between px-4 py-3">
        
        {/* Left */}
        <div className="flex items-center gap-2">
          <span className="text-xl">☰</span>
          <div className="leading-tight">
            <div className="text-yellow-400 font-black text-lg italic">
              MANGO
            </div>
            <div className="text-[9px] tracking-widest text-gray-400">
              ONLINE BOOK
            </div>
          </div>
        </div>

        {/* Right Buttons */}
        <div className="flex gap-2">
          <button className="px-3 py-1 text-xs border border-cyan-400 text-cyan-400 rounded">
            LOGIN
          </button>
          <button className="px-3 py-1 text-xs bg-indigo-600 rounded font-semibold">
            SIGN UP
          </button>
        </div>

      </div>
    </div>
  );
}