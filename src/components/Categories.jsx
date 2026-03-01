export default function Categories() {
  const items = [
    { name: "TEEN PATTI", color: "from-purple-600 to-pink-500", icon: "🃏" },
    { name: "CRICKET", color: "from-blue-600 to-indigo-500", icon: "🏏" },
    { name: "FOOTBALL", color: "from-green-500 to-emerald-600", icon: "⚽" },
    { name: "SATTA MATKA", color: "from-pink-600 to-red-500", icon: "🎲" },
  ];

  return (
    <div className="px-4 mt-6">
      <div className="grid grid-cols-2 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className={`rounded-xl p-4 bg-gradient-to-br ${item.color} 
                        shadow-lg hover:scale-105 transition transform cursor-pointer`}
          >
            <div className="text-3xl">{item.icon}</div>
            <div className="mt-3 font-bold text-sm">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}