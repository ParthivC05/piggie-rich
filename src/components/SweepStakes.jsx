import React from 'react';

const platforms = [
  { title: 'Golden Dragon', image: '/golden-dragon.png', link: 'https://www.playgd.mobi/SSLobby/m5014.0/web-mobile/index.html' },
  { title: 'Fire Kirin', image: '/fire-kirin-hot.png', link: 'http://start.firekirin.xyz:8580/index.html' },
  { title: 'Fortune King', image: '/fortune-king.png', link: 'https://fortuneking777.com/' },
  { title: 'Fire Phoenix', image: '/fire-phoenix.png', link: 'https://fpc-mob.com/MobFPLobby/v2.0/index.html?t=0.8545086052327413' },
  { title: 'Juwa', image: '/juwa.png', link: 'https://dl.juwa777.com/' },
  { title: 'Orion Stars', image: '/orion.png', link: 'https://start.orionstars.vip:8888/index.html' },
  { title: 'Game Vault', image: '/game-vault.png', link: 'https://download.gamevault999.com/' },
  { title: 'Ultra Panda', image: '/ultra-panda.png', link: 'https://www.ultrapanda.mobi/' },
  { title: 'Quake', image: '/quake.png', link: 'https://quakegame.net/' },
  { title: 'V-Blink', image: '/v-blink.png', link: 'https://www.vblink777.club/' },
];

const SweepstakesPlatforms = () => {
  return (
    <section className="bg-black text-white py-16 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">SWEEPSTAKES PLATFORMS</h2>
        <p className="text-gray-300">Platforms have multiple games</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 lg:gap-10 lg:px-52 lg:pt-12 mx-auto">
        {platforms.map((platform, index) => (
          <div
            key={index}
            className="relative rounded-lg border-8 border-purple-900 overflow-hidden cursor-pointer"
            onClick={() => window.open(platform.link, "_blank", "noopener,noreferrer")}
            title={platform.title}
          >
            <img
              src={platform.image}
              alt={platform.title}
              className="w-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SweepstakesPlatforms;