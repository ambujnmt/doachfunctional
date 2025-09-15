import { useEffect, useState } from "react";
import { getSettings } from "../../utils/fetchApi";

export default function CountdownTimer() {
  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const res = await getSettings();
      setSettings(res?.data || {});
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    if (!settings) return;

    // agar timer = 0 → countdown band, 00 dikhao
    if (!settings.timer || settings.timer === "0" || !settings.website_timer) {
      setDays("00");
      setHours("00");
      setMinutes("00");
      setSeconds("00");
      return;
    }

    const targetDate = new Date(`${settings.website_timer}T09:00:00Z`).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setDays("00");
        setHours("00");
        setMinutes("00");
        setSeconds("00");
      } else {
        setDays(String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"));
        setHours(String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"));
        setMinutes(String(Math.floor((difference / (1000 * 60)) % 60)).padStart(2, "0"));
        setSeconds(String(Math.floor((difference / 1000) % 60)).padStart(2, "0"));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [settings]);

  return (
    <div className="text-white flex flex-col items-center">
      {/* Heading */}
      <h2
        className="text-[24px] font-thin mb-4"
        style={{ fontFamily: "Bebas Neue, sans-serif" }}
      >
        TIME REMAINING
      </h2>

      {/* Timer */}
      <div className="flex space-x-8 text-center">
        {/* Days */}
        <div>
          <div
            className="xl:text-[70px] text-[40px] leading-[55px]"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            {days}
          </div>
          <div className="text-[22px]" style={{ fontFamily: "Bebas Neue, sans-serif" }}>DAYS</div>
        </div>
        {/* Hours */}
        <div>
          <div
            className="xl:text-[70px] text-[40px] leading-[55px]"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            {hours}
          </div>
          <div className="text-[22px]" style={{ fontFamily: "Bebas Neue, sans-serif" }}>HOURS</div>
        </div>
        {/* Minutes */}
        <div>
          <div
            className="xl:text-[70px] text-[40px] leading-[55px]"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            {minutes}
          </div>
          <div className="text-[22px]" style={{ fontFamily: "Bebas Neue, sans-serif" }}>MINUTES</div>
        </div>
        {/* Seconds */}
        <div>
          <div
            className="xl:text-[70px] text-[40px] leading-[55px]"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            {seconds}
          </div>
          <div className="text-[22px]" style={{ fontFamily: "Bebas Neue, sans-serif" }}>SECONDS</div>
        </div>
      </div>
    </div>
  );
}
