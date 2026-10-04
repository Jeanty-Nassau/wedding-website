"use client";
import React, { useRef } from "react";
import { MotionValue, motion, useScroll, useTransform } from "framer-motion";

interface ProjectType {
  question: string;
  answer: string;
  i: number;
  range: number[];
  targetScale: number;
  progress: MotionValue<number>;
}

function Card({
  question,
  answer,
  i,
  range,
  targetScale,
  progress,
}: ProjectType) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  // const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const opacity = useTransform(scrollYProgress, [0.9, 1], [0, 0.98]);

  const scale = useTransform(progress, range, [1, targetScale]);
  const rotateX = useTransform(progress, [0.25, 1], [0, -10]);
  return (
    <div
      ref={container}
      className="cardContainer sticky top-0 mb-6 flex h-[30vh] w-full items-center justify-center"
    >
      <motion.div
        style={{
          transformOrigin: "top",
          rotateX,
          scale,
          marginTop: `calc(-10%  +  ${i * 15}px)`,
        }}
        className={`card  relative top-[20%] flex h-full w-[90%] flex-col	rounded-3xl border border-neutral-800 bg-[#1A1A1A] bg-center bg-repeat p-4 px-4 shadow-[10px_10px_10px_rgba(0,0,0,0.3),0_10px_10px_rgba(0,0,0,0.3)] md:top-[40%] md:h-[25vh] md:p-6 md:shadow-[10px_10px_20px_rgba(0,0,0,0.4),0_10px_20px_rgba(0,0,0,0.4)] lg:px-20`}
      >
        <motion.div
          style={{ opacity }}
          className="pointer-events-none absolute inset-0 z-10 rounded-3xl bg-[#1A1A1A] bg-center bg-repeat opacity-0"
        ></motion.div>
        <div className="z-[5] flex h-full items-center justify-between gap-8 md:gap-8">
          <div className="flex h-full w-[10%] items-center justify-center rounded-tr-full border-r border-t border-neutral-500 md:h-[95%] md:w-[20%] md:justify-start md:rounded-none md:rounded-tl-full md:border">
            <p className="text-6xl md:text-[9rem]">{i + 1}</p>
          </div>
          <div className="flex h-full w-4/5 flex-col justify-center gap-4 py-4 pr-2 md:w-2/3 lg:gap-6 lg:py-14 lg:pr-0">
            <h2 className="w-full text-left text-lg md:text-3xl xl:text-4xl">
              {question}
            </h2>
            <p className="w-full text-left text-xs md:text-sm  lg:w-4/5 lg:text-justify xl:text-base">
              {answer}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Card;
