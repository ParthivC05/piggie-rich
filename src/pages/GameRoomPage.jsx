import { useEffect, useState } from "react";
import axios from "axios";

const GameRoomPage = () => {
  //   const [games, setGames] = useState([]);
  //   const [error, setError] = useState("");

  //   const API_URL =
  //     "/slots-api/games?token=Yp7LJVXBGYuZDIx38DResNXVaxhJW4Z44Mp1VYJYXGKwUdK7qV";
  //   const IFRAME_TOKEN = "Yp7LJVXBGYuZDIx38DResNXVaxhJW4Z44Mp1VYJYXGKwUdK7qV";

  //   useEffect(() => {
  //     const fetchGames = async () => {
  //       try {
  //         const res = await axios.get(API_URL, {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Accept: "application/json",
  //           },
  //         });
  //         console.log("API response:", res.data); // Log the full API response
  //         setGames(res.data.data || []);
  //       } catch (err) {
  //         console.error("Fetch error:", err);
  //         setError("Failed to load games.");
  //       }
  //     };

  //     fetchGames();
  //   }, []);

  //   return (
  // //     <div className="p-6 min-h-screen bg-gray-100">
  // //       <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
  // //         🎰 Free Games
  // //       </h1>

  // //       {error && <p className="text-red-500 text-center">{error}</p>}

  // // <a
  // //   href="https://slotslaunch.com/iframe/16338?token=Yp7LJVXBGYuZDIx38DResNXVaxhJW4Z44Mp1VYJYXGKwUdK7qV"
  // //   target="_blank"
  // //   rel="noopener noreferrer"
  // //   className="mt-3 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
  // // >
  // //   PLAY NOW
  // // </a>

  // //     </div>
  //   );

  const [showGame, setShowGame] = useState(false);

  return (
    <div>
      {!showGame && (
        <a
          href="https://slotslaunch.com/iframe/16338?token=abcd"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          PLAY NOW
        </a>
      )}

      {showGame && (
        <iframe
          src="https://slotslaunch.com/iframe/16338?token=abcd"
          width="100%"
          height="600"
          style={{ border: "none", marginTop: "20px" }}
          allowFullScreen
          title="Slot Game"
        />
      )}
    </div>
  );
};

export default GameRoomPage;
