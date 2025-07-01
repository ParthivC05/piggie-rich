// GamesList.jsx
import React, { useEffect, useState } from "react";
import GameCard from "./GameCard";

const GamesList = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch(
          `https://slotslaunch.com/api/games?token=${import.meta.env.VITE_API_TOKEN}&public=1&per_page=12`
        );
        const data = await res.json();

        if (data?.data) setGames(data.data);
        else console.error("No data found", data);
      } catch (err) {
        console.error("Error fetching games", err);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="text-center py-10">
      <h2 className="text-4xl font-bold text-gray-200 mb-8">FREE GAMES</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default GamesList;
