import React from 'react';

const HowToPlay = () => {
  return (
    <section className="bg-black text-white py-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-4xl font-bold text-cyan-400 relative inline-block">
          <span className="relative z-10">HOW TO PLAY</span>
          <div className="absolute w-full h-1 bg-cyan-500 top-full left-0 mt-2" />
        </h2>
      </div>

      <div className="px-4 lg:px-8 mx-auto text-sm md:text-base leading-relaxed space-y-6">
        <div>
          <h3 className="text-xl font-semibold">Waiwaisweeps</h3>
          <p className="text-gray-300 mt-2">
            Where the thrill of Sweepstakes gaming comes alive in every click! Born from a vision to revolutionize online gaming, Waiwaisweeps is more than just a gaming platform. The information you provide will only be used to administer this promotion. <span className="font-bold">NO PURCHASE NECESSARY</span> to enter Sweepstakes. <span className="font-bold">VOID WHERE PROHIBITED BY LAW</span>.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Follow these steps to get your account set up, to play, and to redeem:</h4>
          <ol className="list-decimal pl-5 space-y-1 text-gray-200">
            <li>Download the game(s) you wish to play if the software is app based.</li>
            <li>Deposit funds to obtain points which are used to play games.</li>
            <li>Transfer points to the game(s) you desire to play via website chat.</li>
            <li>Enjoy the games!</li>
            <li>To withdraw points, use the chat.</li>
          </ol>
        </div>

        <div>
          <h4 className="font-semibold mb-2">REDEMPTION RULES</h4>
          <ul className="space-y-1 text-gray-300">
            <li>$10 deposit = Minimum redeem $20 and maximum redeem $100 max</li>
            <li>$20 deposit = Minimum redeem $40 and maximum redeem $200 max</li>
            <li>$30 deposit = Minimum redeem $60 and maximum redeem $300 max</li>
            <li>$40 deposit = Minimum redeem $80 and maximum redeem $400 max</li>
            <li>$50 deposit = Minimum redeem $100 and maximum redeem $500 max</li>
          </ul>
          <p className="mt-4 text-gray-400">
            You must double the amount of your deposit as your minimum redeem. <br />
            We redeem to zero so you play off all points over your redeem amount. <br /><br />
            Minimum deposit $10 <br />
            Maximum redeem $500 per 24 hours <br />
            Zero dollar deposit equals zero dollar redemption <br />
            In-game free play/bonuses are nonredeemable <br /><br />
            Redeems are fulfilled via PayPal between 9AM – midnight EST
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowToPlay;
