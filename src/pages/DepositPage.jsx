import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const staticGames = [
  "ULTRAPANDA/ULTRAMONSTER",
  "VPOWER/VBLINK",
  "EGAME/XGAME",
  "GOLDEN DRAGON",
  "GRANDSWEEPS",
  "ORIONSTAR",
  "FIREKIRIN",
  "MILKYWAY",
  "RIVERSWEEPS",
  "VEGAS X",
  "RIVERMONSTER",
  "FORTUNE2GO",
  "PANDAMASTER",
  "HIGHROLLER",
  "JUWA",
  "GAMEVAULT",
  "VEGAS SWEEPS",
  "CASH MACHINE",
  "MAFIA",
  "GAMEROOM",
  "MR ALL IN ONE",
  "ORION POWER",
];

const DepositPage = () => {
  const [platforms, setPlatforms] = useState([]);
  const [amount, setAmount] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [paid, setPaid] = useState(false);
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [gameUsername, setGameUsername] = useState("");

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const res = await fetch(
          `https://slotslaunch.com/api/games?token=${
            import.meta.env.VITE_API_TOKEN
          }&public=1`
        );
        const data = await res.json();
        if (data?.data) setPlatforms(data.data);
        else setPlatforms([]);
      } catch (err) {
        console.error("Failed to fetch platforms", err);
        setPlatforms([]);
      }
    };
    const fetchUserProfile = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_AUTH_API_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (data?.user) {
          setUserEmail(data.user.email || "");
          setUserPhone(data.user.phone || "");
          setGameUsername(data.user.username || "");
        }
      } catch (err) {
        // handle error if needed
      }
    };

    fetchPlatforms();
    fetchUserProfile();
  }, []);

  const isReadyToPay = amount && selectedPlatform;

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AUJPcF2I-FeMDbuLelzwShs0pknuG8kXN6saOJCbHQPCLJv_PCGwjWZI40tmQr9XosOHQfd93FdQq3_f",
      }}
    >
      <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row justify-center items-start p-4 md:p-10 gap-10">
        <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-1/2">
          <h2 className="text-xl font-bold mb-2">Piggie Rich Deposit</h2>
          <p className="text-sm text-gray-600 mb-4">
            Enter your deposit amount and select at least one platform.
          </p>

          <label className="block mb-2 font-medium">Amount of Deposit</label>
          <input
            type="number"
            className="w-full border rounded px-4 py-2 mb-4"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="$"
          />

          <label className="block mb-2 font-medium">Select Platform</label>
          <select
            className="w-full border rounded px-4 py-2"
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
          >
            <option value="">-- Select Platform --</option>
            {staticGames.map((game, i) => (
              <option key={`static-${i}`} value={game}>
                {game}
              </option>
            ))}
            {platforms.map((platform, i) => (
              <option
                key={platform.id || i}
                value={platform.name || platform.title}
              >
                {platform.name || platform.title}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-1/3">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="border p-4 rounded mb-4">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total</span>
              <span className="font-semibold">${amount || "0.00"} USD</span>
            </div>

            {isReadyToPay ? (
              <PayPalButtons
                style={{
                  layout: "vertical",
                  color: "gold",
                  shape: "rect",
                  label: "paypal",
                }}
                forceReRender={[amount, selectedPlatform]}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: parseFloat(amount).toFixed(2),
                        },
                        description: `Deposit for ${selectedPlatform}`,
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then((details) => {
                    setPaid(true);
                    alert(
                      `Transaction completed by ${details.payer.name.given_name}`
                    );

                    // Collect extra info from user (phone, email, game username)
                    fetch(`${import.meta.env.VITE_AUTH_API_URL}/deposit`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                      body: JSON.stringify({
                        customerPhone: userPhone, 
                        customerEmail: userEmail, 
                        gameUsername: gameUsername,
                        game: selectedPlatform,
                        amount,
                        paypalOrderId: data.orderID,
                        payer: details.payer,
                      }),
                    });
                  });
                }}
                onError={(err) => {
                  console.error("PayPal Checkout Error", err);
                  alert("Payment failed.");
                }}
              />
            ) : (
              <p className="text-red-500 text-sm">
                Please enter amount and select a platform to proceed.
              </p>
            )}
          </div>

          <p className="text-xs text-gray-400">
            This product is offered and sold by the seller. PayPal is not
            responsible for item quality or delivery. <br />
            <a href="#" className="text-blue-600 underline">
              Report this link
            </a>{" "}
            |{" "}
            <a href="#" className="text-blue-600 underline">
              Privacy
            </a>
          </p>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Powered by PayPal
          </p>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default DepositPage;
