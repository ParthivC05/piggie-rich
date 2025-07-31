import React from 'react';
import freeImage from '/free.png';
import { FaArrowRight } from 'react-icons/fa';

const HowToPlay = () => {
  return (
    <section className="bg-black text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white uppercase">HOW TO PLAY</h2>
          <FaArrowRight className="text-2xl text-white" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
              <img
                src={freeImage}
                alt="Casino Scene with Pig Character"
                className="w-full h-auto rounded-lg"
              />
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Sweepstakes Gaming</h3>
              <p className="text-gray-300 leading-relaxed">
                Where the thrill of Sweepstakes gaming comes alive in every click! Born from a vision to revolutionize online gaming, Piggie Rich is more than just a gaming platform. The information you provide will only be used to administer this promotion. <span className="font-bold text-white">NO PURCHASE NECESSARY</span> to enter Sweepstakes. <span className="font-bold text-white">VOID WHERE PROHIBITED BY LAW</span>.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Follow these steps to get your account set up, to play, and to redeem:</h4>
              <ol className="list-decimal pl-6 space-y-3 text-gray-200">
                <li>Download the game(s) you wish to play if the software is app based.</li>
                <li>Deposit funds to obtain points which are used to play games.</li>
                <li>Transfer points to the game(s) you desire to play by website chat.</li>
                <li>Enjoy the games!</li>
                <li>To withdraw points, use the chat.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToPlay;
