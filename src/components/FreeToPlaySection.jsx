import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FreeToPlaySection = () => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const token = import.meta.env.VITE_API_TOKEN;

    fetch(`${apiUrl}?token=${token}`)
      .then(res => res.json())
      .then(data => {
        // Adjust this according to your API response structure
        if (data && Array.isArray(data.data)) {
          setGames(data.data);
        } else if (data && Array.isArray(data.games)) {
          setGames(data.games);
        } else {
          setGames([]);
        }
      })
      .catch(() => setGames([]));
  }, []);

  return (
    <section className="bg-black text-white px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">FREE TO PLAY</h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Play Free games with no download required, no registration, and no purchase necessary.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 lg:px-52 lg:pt-12 mx-auto">
        {games.slice(0, 12).map((game, index) => (
          <div key={game.id || index} className="flex flex-col items-center">
            <img
              src={game.image || game.thumb || "https://via.placeholder.com/200x120?text=Game+Image"}
              alt={game.name || game.title}
              className="w-full h-40 object-contain rounded shadow-md"
            />
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded font-semibold"
              onClick={() => navigate('/game-room')}
            >
              PLAY FREE
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FreeToPlaySection;