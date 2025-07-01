import { useEffect, useState } from "react";
import axios from "axios";

const GameRoomPage = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showGame, setShowGame] = useState(false);

  // Use localhost token for development
  const LOCALHOST_TOKEN = "227R5IJ4cMt49BkuZlmwTCq41eDIjMkMqzoJXvGiqeCfItoMy3";
  const VERCEL_TOKEN = "cbWYg0l8fGqelMITHKtq4cnyO7Pqs9X3pfijYlqtdFEgWOebPC";
  
  // Determine which token to use based on environment
  const currentToken = window.location.hostname === 'localhost' ? LOCALHOST_TOKEN : VERCEL_TOKEN;
  
  const API_URL = `/slots-api/games?token=${currentToken}`;
  const IFRAME_TOKEN = currentToken;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const res = await axios.get(API_URL, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        console.log("Full API response:", res.data);
        console.log("Response status:", res.status);
        console.log("Response headers:", res.headers);
        
        // Handle different possible response structures
        if (res.data) {
          if (Array.isArray(res.data)) {
            // If response is directly an array
            setGames(res.data);
          } else if (res.data.data && Array.isArray(res.data.data)) {
            // If response has a data property with array
            setGames(res.data.data);
          } else if (res.data.games && Array.isArray(res.data.games)) {
            // If response has a games property with array
            setGames(res.data.games);
          } else {
            console.log("Unexpected response structure:", res.data);
            setError(`Unexpected API response structure. Check console for details.`);
          }
        } else {
          setError("Empty response from API");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        console.error("Error response:", err.response?.data);
        console.error("Error status:", err.response?.status);
        setError(`Failed to load games: ${err.message}${err.response?.status ? ` (Status: ${err.response.status})` : ''}`);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handlePlayGame = (gameId) => {
    setSelectedGame(gameId);
    setShowGame(true);
  };

  const handleBackToGames = () => {
    setShowGame(false);
    setSelectedGame(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl font-bold">Loading games...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {!showGame ? (
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">🎰 Free Games</h1>
            <button
              onClick={() => window.history.back()}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              ← Back to Home
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <p><strong>Error:</strong> {error}</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-sm">Debug Info</summary>
                <div className="mt-2 text-xs bg-gray-100 p-2 rounded">
                  <p><strong>Current Token:</strong> {currentToken}</p>
                  <p><strong>API URL:</strong> {API_URL}</p>
                  <p><strong>Environment:</strong> {window.location.hostname}</p>
                </div>
              </details>
              <button
                onClick={() => handlePlayGame(16338)} // Default game ID
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Try Default Game
              </button>
            </div>
          )}

          {games.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {games.map((game) => (
                <div
                  key={game.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {game.image && (
                    <img
                      src={game.image}
                      alt={game.name}
                      className="w-full h-40 object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2 text-gray-800">
                      {game.name || `Game ${game.id}`}
                    </h3>
                    {game.description && (
                      <p className="text-gray-600 text-sm mb-3">
                        {game.description}
                      </p>
                    )}
                    <button
                      onClick={() => handlePlayGame(game.id)}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
                    >
                      PLAY NOW
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !error && (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No games available at the moment.</p>
                <button
                  onClick={() => handlePlayGame(16338)} // Default game ID
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Play Default Game
                </button>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="relative">
          <div className="bg-black text-white p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">
              Playing Game {selectedGame}
            </h2>
            <button
              onClick={handleBackToGames}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              ✕ Close Game
            </button>
          </div>
          
          <div className="relative">
            <iframe
              src={`https://slotslaunch.com/iframe/${selectedGame}?token=${IFRAME_TOKEN}`}
              width="100%"
              height="800"
              style={{ border: "none" }}
              allowFullScreen
              title={`Slot Game ${selectedGame}`}
              onError={() => {
                setError("Failed to load game. Please try again.");
                setShowGame(false);
              }}
            />
            
            {/* Loading overlay for iframe */}
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center" 
                 style={{zIndex: showGame ? -1 : 1}}>
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p>Loading game...</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameRoomPage;