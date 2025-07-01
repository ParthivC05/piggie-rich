import React from "react";
import GameEmbed from "./GameEmbed";

const GameCard = ({ game }) => {
  const token = import.meta.env.VITE_API_TOKEN;

  const handlePlayNow = () => {
    const iframeUrl = `https://slotslaunch.com/iframe/${game.id}?token=${token}`;
    const newWindow = window.open("", "_blank", "noopener,noreferrer,width=900,height=700");
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>${game.name}</title>
            <style>
              body { margin: 0; background: #000; }
              iframe { width: 100vw; height: 100vh; border: none; }
            </style>
          </head>
          <body>
            <iframe src="${iframeUrl}" allowfullscreen frameborder="0" title="Game Frame"></iframe>
          </body>
        </html>
      `);
      newWindow.document.close();
    }
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