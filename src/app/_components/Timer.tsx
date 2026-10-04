"use client";

import React, { useEffect, useState } from "react";
import { eventConfig } from "../../config/event";

function Timer() {
  const [partyTime, setPartyTime] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const target = new Date(eventConfig.dateTime);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const remaining = Math.max(0, difference);
      const d = Math.floor(remaining / (1000 * 60 * 60 * 24));
      setDays(d);

      const h = Math.floor(
        (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      setHours(h);

      const m = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);

      const s = Math.floor((remaining % (1000 * 60)) / 1000);
      setSeconds(s);

      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        setPartyTime(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid w-4/5 grid-cols-7 gap-2 pt-2 text-xl font-extralight md:w-1/4">
      {partyTime ? (
        <>
              <h1>Let the celebration begin!</h1>
          <video autoPlay loop muted>
            <source src="/party.mp4" />
          </video>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center ">
            <span className="flex items-center justify-center font-mothenary text-3xl">
              {days}
            </span>
            <span className="flex items-center justify-center text-xs md:text-sm">
              days
            </span>
          </div>
          <span className="flex justify-center">:</span>
          <div className="flex flex-col items-center ">
            <span className="flex items-center justify-center font-mothenary text-3xl">
              {hours}
            </span>
            <span className="flex items-center justify-center text-xs md:text-sm">
              hours
            </span>
          </div>
          <span className="flex justify-center">:</span>
          <div className="flex flex-col items-center ">
            <span className="flex items-center justify-center font-mothenary text-3xl">
              {minutes}
            </span>
            <span className="flex items-center justify-center text-xs md:text-sm">
              min
            </span>
          </div>
          <span className="flex justify-center">:</span>
          <div className="flex flex-col items-center ">
            <span className="flex items-center justify-center font-mothenary text-3xl">
              {seconds}
            </span>
            <span className="flex items-center justify-center text-xs md:text-sm">
              sec
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default Timer;
