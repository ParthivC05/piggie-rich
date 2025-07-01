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
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 9999,
            background: "#000",
          }}
        >
          <button
            onClick={handleClose}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 10000,
              background: "#fff",
              color: "#000",
              padding: "8px 16px",
              borderRadius: "8px",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
            }}
          >
            Close
          </button>
          <GameEmbed gameId={game.id} />
        </div>
      ) : (
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
      )}
    </>
  );
};

export default GameCard;