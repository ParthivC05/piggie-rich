import React, { useState } from "react";
import GameEmbed from "./GameEmbed";

const GameCard = ({ game }) => {
  const [showEmbed, setShowEmbed] = useState(false);

  const handlePlayNow = () => {
    setShowEmbed(true);
  };

  return (
    <div className="flex flex-col items-center">
      <img
        src={game.image || "https://via.placeholder.com/200x120?text=Game+Image"}
        alt={game.name}
        className="w-52 h-32 object-cover rounded"
      />
      <button
        onClick={handlePlayNow}
        className="bg-sky-500 text-white font-bold py-2 px-6 mt-2 hover:bg-sky-600 rounded-md"
      >
        PLAY NOW
      </button>
      {showEmbed && (
        <div className="w-full mt-4">
          <GameEmbed gameId={game.id} />
        </div>
      )}
    </div>
  );
};

export default GameCard;