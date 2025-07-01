import React from 'react';

const GameEmbed = ({ gameId }) => {
  const token = import.meta.env.VITE_API_TOKEN;
  const iframeUrl = `https://slotslaunch.com/iframe/${gameId}?token=${token}`;

  return (
    <iframe
      src={iframeUrl}
      width="100%"
      height="600px"
      frameBorder="0"
      allowFullScreen
      title="Game Frame"
    ></iframe>
  );
};

export default GameEmbed;