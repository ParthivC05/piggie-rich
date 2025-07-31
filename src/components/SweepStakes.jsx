import React from 'react';
import sweepstakeBg from '/sweepstake-bg.png';

const platforms = [
  { title: 'Ultra Panda', image: '/ultra-panda.png', link: 'https://www.ultrapanda.mobi/' },
  { title: 'Game Vault', image: '/game-vault.png', link: 'https://download.gamevault999.com/' },
  { title: 'Juwa', image: '/juwa.png', link: 'https://dl.juwa777.com/' },
  { title: 'Quake', image: '/quake.png', link: 'https://quakegame.net/' },
  { title: 'Vblink', image: '/v-blink.png', link: 'https://www.vblink777.club/' },
];

const SweepstakesPlatforms = () => {
  return (
    <section 
      className="relative bg-black text-white py-16 px-4 overflow-hidden"
      style={{
        backgroundImage: `url(${sweepstakeBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white uppercase mb-4">
            SWEEPSTAKES PLATFORMS
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {platforms.map((platform, index) => (
            <div
              key={index}
              className="group relative rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => window.open(platform.link, "_blank", "noopener,noreferrer")}
              title={platform.title}
            >
              <div className="relative bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 rounded-lg p-1">
                <div className="bg-black rounded-lg overflow-hidden">
                  <img
                    src={platform.image}
                    alt={platform.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      console.log('Image failed to load:', platform.image);
                      e.target.src = 'https://via.placeholder.com/300x200?text=' + platform.title;
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SweepstakesPlatforms;