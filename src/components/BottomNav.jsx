export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0c0c1c] border-t border-white/10">
      <div className="max-w-md mx-auto flex justify-around py-3 text-xs">
        <div className="flex flex-col items-center text-yellow-400">
          🏠
          <span>HOME</span>
        </div>
        <div className="flex flex-col items-center">
          📊
          <span>INPLAY</span>
        </div>
        <div className="flex flex-col items-center">
          🎰
          <span>CASINO</span>
        </div>
        <div className="flex flex-col items-center">
          👤
          <span>PROFILE</span>
        </div>
      </div>
    </div>
  );
}