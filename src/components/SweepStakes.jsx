import React from 'react';

// Game platform images and optional badges
const platforms = [
  { title: 'Golden Dragon', image: '/src/assets/golden-dragon.png',  },
  { title: 'Fire Kirin', image: '/src/assets/fire-kirin-hot.png',},
  { title: 'Fortune King', image: '/src/assets/fortune-king.png' },
  { title: 'Fire Phoenix', image: '/src/assets/fire-phoenix.png' },
  { title: 'Juwa', image: '/src/assets/juwa.png' },
  { title: 'Orion Stars', image: '/src/assets/orion.png' },
  { title: 'Game Vault', image: '/src/assets/game-vault.png' },
  { title: 'Ultra Panda', image: '/src/assets/ultra-panda.png' },
  { title: 'Quake', image: '/src/assets/quake.png' },
  { title: 'V-Blink', image: '/src/assets/v-blink.png' },
];

const SweepstakesPlatforms = () => {
  return (
    <section className="bg-black text-white py-16 px-4">
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">SWEEPSTAKES PLATFORMS</h2>
        <p className="text-gray-300">Platforms have multiple games</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 lg:gap-10 lg:px-52 lg:pt-12 mx-auto">
        {platforms.map((platform, index) => (
          <div
            key={index}
            className="relative rounded-lg border-8 border-purple-900 overflow-hidden"
          >
        

            {/* Image */}
            <img
              src={platform.image}
              alt={platform.title}
              className="w-full  object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SweepstakesPlatforms;
