"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Button({
  children,
  backgroundColor = "#455CE9",
  textColor,
  buttonColor,
  onClick,
  ...attributes
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  textColor: string;
  buttonColor: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  backgroundColor: string;
}) {
  const circle = useRef(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const context = gsap.context(() => {
      timeline.current = gsap.timeline({ paused: true });
      timeline.current
        .to(
          circle.current,
          { top: "-25%", width: "150%", duration: 0.4, ease: "power3.in" },
          "enter",
        )
        .to(
          circle.current,
          { top: "-150%", width: "125%", duration: 0.25 },
          "exit",
        );
    }, circle);

    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
      context.revert();
    };
  }, []);

  const manageMouseEnter = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
    timeline.current?.tweenFromTo("enter", "exit");
  };
  const manageMouseLeave = () => {
    timeoutId.current = setTimeout(() => {
      timeline.current?.play();
    }, 300);
  };

  return (
    <button
      type="button"
      style={{ color: textColor, backgroundColor: buttonColor }}
      onClick={onClick}
      className="roundbutton relative flex cursor-pointer items-center justify-center overflow-hidden rounded-[3em] px-[30px]
      py-[8px] hover:first:bg-transparent disabled:bg-neutral-950 disabled:text-neutral-400 md:px-[60px] md:py-[15px] "
      {...attributes}
      onMouseEnter={manageMouseEnter}
      onMouseLeave={manageMouseLeave}
    >
      <p className="relative z-[30] transition-colors duration-[0.4s] ease-linear">
        {children}
      </p>
      <div
        style={{ backgroundColor }}
        ref={circle}
        className="circle absolute top-[100%] h-[150%] w-[100%] rounded-[50%] "
      ></div>
    </button>
  );
}
