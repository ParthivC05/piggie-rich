import React from 'react';
import { useNavigate } from 'react-router-dom';

const games = [
  { title: 'Fire Link', image: '/src/assets/fire-link.webp' },
  { title: 'Buffalo', image: '/src/assets/buffalo.webp' },
  { title: 'Fishing Paradise', image: '/src/assets/fishing-paradise.webp' },
  { title: 'Huff Pigs', image: '/src/assets/huff-n-even-more.webp' },
  { title: 'Fortune King', image: '/src/assets/fortune-king.webp' },
  { title: 'Hyper Karts', image: '/src/assets/hyper-karts.jpg' },
  { title: 'Queenie', image: '/src/assets/queenie.webp' },
  { title: 'Rich Piggies', image: '/src/assets/rich-little-piggies.webp' },
  { title: 'Little Demons', image: '/src/assets/lil-demon.jpg' },
  { title: 'Fish-Fever', image: '/src/assets/fish-fever.jpg' },
  { title: 'Cash-Eruption', image: '/src/assets/cash-eruption.jpg' },
  { title: 'Resurrecting', image: '/src/assets/resurrecting-riches.jpg' },
];

const FreeToPlaySection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-black text-white px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">FREE TO PLAY</h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Play Free games with no download required, no registration, and no purchase necessary.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 lg:px-52 lg:pt-12 mx-auto">
        {games.map((game, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={game.image}
              alt={game.title}
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