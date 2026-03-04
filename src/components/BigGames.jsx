import React from "react";

const games = [
  {
    name: "AVIATOR",
    img: "/games/aviator_card.png",
    tag: "HOT",
    multiplier: "UP TO 100x",
  },
  {
    name: "MINES",
    img: "/games/mines_card.png",
    tag: "NEW",
    multiplier: "UP TO 250x",
  },
  {
    name: "TEEN PATTI",
    img: "/games/teenpatti_card.png",
    tag: "FUN",
    multiplier: "UP TO 500x",
  },
  {
    name: "COLOR PREDICTION",
    img: "/games/colorprediction_card.png",
    tag: "LIVE",
    multiplier: "UP TO 9x",
  },
];

export default function BigGames() {
  const openWhatsApp = () => {
    window.open(
      "https://wa.me/919999999999?text=Hello I want to play on MangoPlay",
      "_blank"
    );
  };

  return (
    <div className="biggames-container">
      <div className="biggames-title">
        <span>POPULAR GAMES</span>
        <span className="viewall">VIEW ALL →</span>
      </div>

      <div className="biggames-grid">
        {games.map((game, i) => (
          <div key={i} className="game-card" onClick={openWhatsApp}>
            <img src={game.img} alt={game.name} className="game-img" />

            <div className="game-overlay"></div>

            <div className="game-info">
              <div className="tag">{game.tag}</div>
              <div className="gc-title">{game.name}</div>
              <div className="gc-sub">{game.multiplier}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}