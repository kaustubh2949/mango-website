export default function Home() {
  return (
    <div className="min-h-screen bg-[#070712] flex justify-center items-start py-6">
      <div className="w-[390px] bg-[#0f0f1f] rounded-3xl shadow-2xl overflow-hidden text-white">
        
        {/* Navbar */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-white/10">
          <div className="font-bold text-lg">MANGO</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs bg-white/10 rounded-md">
              Login
            </button>
            <button className="px-3 py-1 text-xs bg-yellow-500 text-black rounded-md">
              Sign Up
            </button>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-5">
          <h1 className="text-xl font-bold">WELCOME TO MANGO BOOK</h1>
          <p className="text-sm mt-1 opacity-80">
            India's Most Trusted Platform
          </p>
          <button className="mt-3 bg-yellow-500 text-black px-4 py-2 rounded-lg text-sm font-semibold">
            GET ID NOW
          </button>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-3 p-4">
          {["Teen Patti", "Cricket", "Football", "Satta Matka"].map((item, i) => (
            <div
              key={i}
              className="bg-[#1a1a2e] rounded-xl p-4 text-center hover:bg-indigo-600 transition"
            >
              {item}
            </div>
          ))}
        </div>

        {/* Big Cards */}
        <div className="p-4 space-y-3">
          {["Aviator", "Mines", "Fun Games", "Color Pred"].map((game, i) => (
            <div
              key={i}
              className="bg-gradient-to-r from-pink-600 to-orange-500 rounded-2xl p-5 font-semibold"
            >
              {game}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}