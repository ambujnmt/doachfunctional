import React, { useEffect, useState } from 'react';

export default function Main() {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 8000);

    const redirectTimer = setTimeout(() => {
      window.location.href = '/home';
    }, 8000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(redirectTimer);
    };
  }, []);

  return (
    <div
      className={`bg-black min-h-screen h-[100vh] flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <video
        src="https://nmtdevserver.com/doach/video.mp4" 
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  );
}
 