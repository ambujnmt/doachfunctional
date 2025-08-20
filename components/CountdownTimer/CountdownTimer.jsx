import { useEffect, useState } from "react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    // 🎯 Target Date (change this to your event date)
    const targetDate = new Date("2025-08-27T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
      } else {
        const days = String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0");
        const hours = String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0");
        const minutes = String(Math.floor((difference / (1000 * 60)) % 60)).padStart(2, "0");
        const seconds = String(Math.floor((difference / 1000) % 60)).padStart(2, "0");

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-white flex flex-col items-center">
      {/* Heading */}
      <h2 className="text-[24px] font-thin mb-4" style={{ fontFamily: "Bebas Neue, sans-serif;" }}>
        TIME REMAINING
      </h2>

      {/* Timer */}
      <div className="flex space-x-8 text-center">
        {/* Days */}
        <div>
          <div className="xl:text-[70px] text-[40px] leading-[55px]" style={{ fontFamily: "Bebas Neue, sans-serif;" }}>{timeLeft.days}</div>
          <div className="text-[22px]" style={{ fontFamily: "Bebas Neue, sans-serif;" }}>DAYS</div>
        </div>
        {/* Hours */}
        <div>
          <div className="xl:text-[70px] text-[40px] leading-[55px]" style={{ fontFamily: "Bebas Neue, sans-serif;" }}>{timeLeft.hours}</div>
          <div className="text-[22px]" style={{ fontFamily: "Bebas Neue, sans-serif;" }}>HOURS</div>
        </div>
        {/* Minutes */}
        <div>
          <div className="xl:text-[70px] text-[40px] leading-[55px]" style={{ fontFamily: "Bebas Neue, sans-serif;" }}>{timeLeft.minutes}</div>
          <div className="text-[22px]" style={{ fontFamily: "Bebas Neue, sans-serif;" }}>MINUTES</div>
        </div>
        {/* Seconds */}
        <div>
          <div className="xl:text-[70px] text-[40px] leading-[55px]" style={{ fontFamily: "Bebas Neue, sans-serif;" }}>{timeLeft.seconds}</div>
          <div className="text-[22px]" style={{ fontFamily: "Bebas Neue, sans-serif;" }}>SECONDS</div>
        </div>
      </div>
    </div>
  );
}
