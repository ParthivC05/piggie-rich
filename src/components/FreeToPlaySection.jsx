import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const FreeToPlaySection = () => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();
   const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_GAMES_API_URL;
    const token = import.meta.env.VITE_API_TOKEN;

    fetch(`${apiUrl}?token=${token}`)
      .then(res => res.json())
      .then(data => {
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

  const playNow = () => {
    if(isLoggedIn){
      navigate("/game-room")
    }
    else{
      navigate("/login")
    }
  }

  return (
    <section className="bg-black text-white px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white uppercase">FREE TO PLAY</h2>
          <FaArrowRight className="text-2xl text-white" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {games.slice(0, 12).map((game, index) => (
            <div key={game.id || index} className="group relative">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={game.image || game.thumb || "https://via.placeholder.com/200x120?text=Game+Image"}
                  alt={game.name || game.title}
                  className="w-full h-32 md:h-40 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    className="bg-gradient-to-b from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-bold px-6 py-3 rounded-full transition-all duration-200 shadow-lg transform scale-90 group-hover:scale-100"
                    onClick={playNow}
                  >
                    PLAY NOW
                  </button>
                </div>
              </div>
              
              <p className="text-white text-sm md:text-base font-semibold mt-3 text-center truncate">
                {game.name || game.title || `Game ${index + 1}`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreeToPlaySection;