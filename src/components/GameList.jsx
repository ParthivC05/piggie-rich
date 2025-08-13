// GamesList.jsx
import React, { useEffect, useState } from "react";
import GameCard from "./GameCard";

const GamesList = () => {
  const [games, setGames] = useState([]);
  const [showmoregamebtn,setShowMoreGameBtn] = useState(true)

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

  const showMoreGame = async() => {
       try {
        const res = await fetch(
          `https://slotslaunch.com/api/games?token=${import.meta.env.VITE_API_TOKEN}&public=1&per_page=20`
        );
        const data = await res.json();
        setShowMoreGameBtn(false)

        if (data?.data) setGames(data.data);
        else console.error("No data found", data);
      } catch (err) {
        console.error("Error fetching games", err);
      }
  }

  return (
    <div className="text-center py-10">
      <h2 className="text-4xl font-bold text-gray-200 mb-8">FREE GAMES</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    {
      showmoregamebtn &&   <button className="bg-sky-500 text-white font-bold py-2 px-6 mt-2 hover:bg-sky-600 rounded-md hover:cursor-pointer" onClick={showMoreGame}>Show More Games</button>
    }
    </div>
  );
};

export default GamesList;
