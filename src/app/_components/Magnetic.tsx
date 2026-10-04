"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { useRef } from "react";

export default function Magnetic({ children }: { children: React.ReactNode }) {
  const ref: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const mouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { width, height, left, top }: DOMRect =
      ref.current!.getBoundingClientRect();

    const x = (clientX - (left + width / 2)) * 0.5;
    const y = (clientY - (top + height / 2)) * 0.5;
    setPosition({ x, y });
  };

  const mouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };
  const { x, y } = position;
  return (
    <motion.div
      onMouseMove={mouseMove}
      onMouseLeave={mouseLeave}
      ref={ref}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}
