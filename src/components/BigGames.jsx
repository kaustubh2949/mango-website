export default function BigGames() {
  const games = [
    {
      name: "AVIATOR",
      desc: "BIG WINNER",
      color: "from-red-700 to-orange-600",
      icon: "✈️",
    },
    {
      name: "MINES",
      desc: "BOOM JACKPOT",
      color: "from-purple-700 to-indigo-600",
      icon: "💣",
    },
    {
      name: "FUN GAMES",
      desc: "ALL SLOTS LIVE",
      color: "from-blue-700 to-cyan-600",
      icon: "🎰",
    },
    {
      name: "COLOR PRED.",
      desc: "WIN 2X CASH",
      color: "from-pink-600 to-rose-500",
      icon: "🎨",
    },
  ];

  return (
    <div className="px-4 mt-6">
      <div className="grid gap-4">
        {games.map((game, index) => (
          <div
            key={index}
            className={`relative rounded-2xl p-5 bg-gradient-to-br ${game.color}
                        shadow-xl overflow-hidden hover:scale-[1.02] transition`}
          >
            <div className="text-lg font-bold">{game.name}</div>
            <div className="text-xs opacity-80">{game.desc}</div>

            <div className="absolute bottom-3 right-4 text-5xl opacity-20">
              {game.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}