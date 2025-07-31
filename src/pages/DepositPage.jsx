import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaCreditCard } from "react-icons/fa";

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
  const [selectedPlatform, setSelectedPlatform] = useState("Golden Dragon");
  const [paid, setPaid] = useState(false);
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [gameUsername, setGameUsername] = useState("");
  const navigate = useNavigate();

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
      <ToastContainer />
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        {!paid ? (
          <div className="w-full max-w-2xl bg-black rounded-lg">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Piggi Rich Deposit</h1>
              <p className="text-white text-sm">
                Enter your deposit amount and select at least one platform.
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-white font-medium mb-2">
                  Amount of Deposit
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white">
                    $
                  </span>
                  <input
                    type="number"
                    className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 pl-8 focus:border-yellow-400 focus:outline-none transition-colors"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Select Platform (must select one)
                </label>
                <div className="relative">
                  <select
                    className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 pr-10 appearance-none focus:border-yellow-400 focus:outline-none transition-colors"
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
                  <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-white text-center mb-4">Order Summary</h2>
              <div className="flex justify-between items-center">
                <span className="text-white">Total</span>
                <span className="text-white font-semibold">${amount || "0.00"} USD</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <p className="text-white text-sm">Express checkout options</p>
              
              {isReadyToPay && (
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
                  onApprove={async (data, actions) => {
                    return actions.order.capture().then(async (details) => {
                      setPaid(true);
                      try {
                        const res = await fetch(
                          `${import.meta.env.VITE_AUTH_API_URL}/deposit`,
                          {
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
                          }
                        );
                        const resp = await res.json();
                        if (res.ok && resp.success) {
                          toast.success("Deposit successful!");
                        } else {
                          toast.error(
                            resp.error || "Deposit failed. Please contact support."
                          );
                        }
                      } catch (err) {
                        toast.error("Deposit failed. Please try again.");
                      }
                    });
                  }}
                  onError={(err) => {
                    console.error("PayPal Checkout Error", err);
                    toast.error("Payment failed.");
                  }}
                />
              )}

              <div className="space-y-2">
                <p className="text-white text-sm">Or pay with card</p>
                <button className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 flex items-center justify-center gap-3 hover:bg-gray-700 transition-colors">
                  <FaCreditCard className="text-white" />
                  <span>Debit or Credit Card</span>
                </button>
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-white text-xs">
                This product is offered and sold by the seller and is subject to their policies. Item descriptions, pictures, and info are provided by the seller and not verified or guaranteed by PayPal.
              </p>
              <div className="flex items-center justify-center gap-2 text-white text-xs">
                <a href="#" className="hover:text-yellow-400">Report this link</a>
                <span>|</span>
                <a href="#" className="hover:text-yellow-400">Privacy</a>
              </div>
              <p className="text-white text-xs">Powered by PayPal</p>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center min-h-[300px] gap-6">
            <div className="text-green-600 text-2xl font-bold mb-2">Deposit successful!</div>
            <div className="flex gap-4">
              <button
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
                onClick={() => navigate("/")}
              >
                Go to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </PayPalScriptProvider>
  );
};

export default DepositPage;