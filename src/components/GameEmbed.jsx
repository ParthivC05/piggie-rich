import React from 'react';

const GameEmbed = ({ gameId }) => {
  const token = import.meta.env.VITE_API_TOKEN;
  const iframeUrl = `https://slotslaunch.com/iframe/${gameId}?token=${token}`;

  return (
    <iframe
      src={iframeUrl}
      style={{ width: "100vw", height: "100vh", border: "none" }}
      allowFullScreen
      title="Game Frame"
    ></iframe>
  );
};

export default GameEmbed;