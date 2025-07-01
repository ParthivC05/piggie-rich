import React, { useState } from "react";
import GameEmbed from "./GameEmbed";

const GameCard = ({ game }) => {
  const [showEmbed, setShowEmbed] = useState(false);

  const handlePlayNow = () => {
    setShowEmbed(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setShowEmbed(false);
  };

  return (
    <>
      {showEmbed ? (
        <div className="fixed inset-0 w-screen h-screen z-[9999] bg-white flex flex-col">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-50 bg-black text-white px-4 py-2 rounded font-bold shadow"
          >
            Close
          </button>
          <div className="flex-1">
            <GameEmbed gameId={game.id} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center p-4">
          <img
            src={game.thumb || "https://via.placeholder.com/200x120?text=Game+Image"}
            alt={game.name}
            className="w-52 h-32 object-cover rounded"
          />
          <button
            onClick={handlePlayNow}
            className="bg-sky-500 text-white font-bold py-2 px-6 mt-2 hover:bg-sky-600 rounded-md"
          >
            PLAY NOW
          </button>
        </div>
      )}
    </>
  );
};

export default GameCard;