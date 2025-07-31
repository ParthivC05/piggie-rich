import React from 'react';
import rulesBg from '/rules-bg.png';
import rule1Image from '/rule1.png';
import ruleImage from '/rule2.png';

const RedemptionRules = () => {
  return (
    <section 
      className="relative bg-black text-white py-16 px-4 overflow-hidden"
      style={{
        backgroundImage: `url(${rulesBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white uppercase mb-4">
            REDEMPTION RULES
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-lg p-6 h-full flex flex-col">
            <div className="mb-6 flex-shrink-0">
              <img
                src={rule1Image}
                alt="Slot Game Characters"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div className="space-y-3 flex-grow">
              <h3 className="text-xl font-semibold text-white mb-4">Redemption Rules</h3>
              <ol className="list-decimal pl-6 space-y-2 text-gray-200">
                <li>$10 deposit = Minimum redeem $20 and maximum redeem $100 max</li>
                <li>$20 deposit = Minimum redeem $40 and maximum redeem $200 max</li>
                <li>$30 deposit = Minimum redeem $60 and maximum redeem $300 max</li>
                <li>$40 deposit = Minimum redeem $80 and maximum redeem $400 max</li>
                <li>$50 deposit = Minimum redeem $100 and maximum redeem $500 max</li>
              </ol>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 h-full flex flex-col">
            <div className="mb-6 flex-shrink-0">
              <img
                src={ruleImage}
                alt="Wallet and Coins"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div className="space-y-4 text-gray-200 flex-grow">
              <p>You must double the amount of your deposit as your minimum redeem.</p>
              <p>We redeem to zero so you play off all points over your redeem amount.</p>
              
              <div className="space-y-2">
                <p>Minimum deposit $10</p>
                <p>Maximum redeem $500 per 24 hours</p>
                <p>Zero dollar deposit equals zero dollar redemption</p>
                <p>In-game free play/bonuses are nonredeemable</p>
              </div>
              
              <p className="mt-4">Redeems are fulfilled via PayPal between 10AM - 10PM EST</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RedemptionRules; 