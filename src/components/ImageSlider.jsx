import React, { useState, useEffect } from 'react';

const images = [
  '/src/assets/slider1.png',
  '/src/assets/slider2.png',
  '/src/assets/slider3.png',
  '/src/assets/slider4.png',
];

const ImageSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 5000); // 3 seconds per slide

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-3xl overflow-hidden max-w-xl ">
      <img
        src={images[index]}
        alt={`Slide ${index + 1}`}
        className="w-full h-auto object-cover transition-all duration-500"
      />
    </div>
  );
};

export default ImageSlider;
