import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function RotatingText() {
  const texts = [
    { label: "The AI Coach That Adapts to You", href: "/#" },
    { label: "Unleash a Session", href: "/#" },
    { label: "Sign up now", href: "/signUp" },
    { label: "Doach Events", href: "/event" },
    { label: "Posts", href: "/#" },
    { label: "Download app (also in other spots)", href: "/#" },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="text-center">
      <Link href={texts[index].href} className="no-underline">
        <p className="cursor-pointer mt-[50px] text-[13px] xl:text-lg md:text-xl text-black max-w-md mx-auto p-2 bg-[#FFC32B] rounded-full transition-all duration-500 hover:scale-105">
          {texts[index].label}
        </p>
      </Link>
    </div>
  );
}
