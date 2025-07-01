// GameCard.jsx
import React from "react";

const GameCard = ({ game }) => {
  const handlePlayNow = () => {
    const iframeUrl = `https://slotslaunch.com/iframe/${game.id}?token=${import.meta.env.VITE_API_TOKEN}`;
    window.open(iframeUrl, "_blank"); // Or use modal with iframe
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
    </div>
  );
};

export default GameCard;
