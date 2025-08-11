const AboutUs = () => {
  return (
    <div className="bg-gray-50 text-gray-800 px-6 py-10">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-emerald-500">
        About Piggie Rich
      </h1>
      <p className="mt-4 max-w-3xl mx-auto text-center text-gray-600">
        Piggie Rich is a sweepstakes-based entertainment platform where you can
        play exciting games in a safe, transparent, and fair environment. Our
        mission is to deliver a fun gaming experience for everyone while
        maintaining complete fairness and compliance with sweepstakes rules.
      </p>

      {/* How We Work */}
      <section className="mt-10 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-emerald-600">
          How Piggie Rich Works
        </h2>
        <p className="mt-3 text-gray-600">
          We operate on a point-based sweepstakes model — you earn points by
          making purchases or through free entry offers. These points can be
          used to play games, enter prize draws, and win rewards. Our “No
          Purchase Necessary” policy ensures that everyone has a fair chance to
          participate.
        </p>
        <ul className="mt-4 space-y-2 list-disc list-inside text-gray-700">
          <li>Sign up and verify your account for secure transactions.</li>
          <li>Play games to earn points or entries.</li>
          <li>
            Redeem your rewards via supported methods like PayPal, subject to
            eligibility and limits.
          </li>
        </ul>
      </section>

      {/* Mission & Values */}
      <section className="mt-10 grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-semibold text-lg">Our Mission</h3>
          <p className="mt-2 text-sm text-gray-600">
            To create a safe, fair, and enjoyable sweepstakes gaming experience
            for players worldwide.
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-semibold text-lg">Transparency</h3>
          <p className="mt-2 text-sm text-gray-600">
            We clearly communicate our rules, odds, and payout policies, so
            there are no hidden surprises.
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-semibold text-lg">Responsible Play</h3>
          <p className="mt-2 text-sm text-gray-600">
            We encourage players to make informed decisions and provide tools
            for healthy, balanced gameplay.
          </p>
        </div>
      </section>

     
     
    </div>
  );
};

export default AboutUs;
