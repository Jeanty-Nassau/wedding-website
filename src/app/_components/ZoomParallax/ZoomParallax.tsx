"use client";

import Image from "next/image";

// import image1 from "/images/engagement2.jpg";
// import image2 from "/images/engagement3.jpg";
// import image3 from "/images/venue6.jpg";
// import image4 from "/images/venue5.jpg";
// import image5 from "/images/story5.png";
// import image6 from "/images/matric1.jpg";
// import image7 from "/images/engagement4.jpg";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

import Timer from "../Timer";
import { eventConfig } from "../../../config/event";
function ZoomParallax() {
  const [innerWidth, setInnerWidth] = useState(650);
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(
    scrollYProgress,
    [0, 1],
    [1, innerWidth <= 650 ? 1.8 : 1.5],
    // [1, 3],
  );
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale7 = useTransform(scrollYProgress, [0, 1], [1, 7]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  // const sm = useTransform(scrollYProgress, [0, 0.8], [120, 0]);
  // const md = useTransform(scrollYProgress, [0, 0.95], [-90, 10]);

  // const countdownOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  // const headingOpacity = useTransform(scrollYProgress, [0, 0.95], [0, 1]);

  const pictures = [
    {
      src: "/images/engagement2.JPG",
      scale: scale4,
      top: "auto",
      altTop: "auto",
      left: "auto",
      altLeft: "auto",
      width: "34vw",
      altWidth: "25vw",
      height: "30svh",
      altHeight: "35svh",
    },
    {
      src: "/images/engagement3.JPG",
      scale: scale5,
      top: "-28svh",
      altTop: "-33svh",
      left: "13vw",
      altLeft: "2vw",
      width: "60vw",
      altWidth: "25vw",
      height: "25svh",
      altHeight: "28svh",
    },
    {
      src: "/images/venue6.jpg",
      scale: scale7,
      top: "-7svh",
      altTop: "-11svh",
      left: "-34vw",
      altLeft: "-23.5vw",
      width: "28vw",
      altWidth: "21vw",
      height: "45svh",
      altHeight: "45svh",
    },
    {
      src: "/images/venue5.jpg",
      scale: scale5,
      top: "auto",
      altTop: "2.5svh",
      left: "34vw",
      altLeft: "23vw",
      width: "30vw",
      altWidth: "20vw",
      height: "28svh",
      altHeight: "40svh",
    },
    {
      src: "/images/story5.jpg",
      scale: scale6,
      top: "28svh",
      altTop: "32svh",
      left: "6vw",
      altLeft: "-1.5vw",
      width: "22vw",
      altWidth: "28vw",
      height: "25svh",
      altHeight: "27svh",
    },
    {
      src: "/images/matric1.jpg",
      scale: scale9,
      top: "28svh",
      altTop: "29.5svh",
      left: "-28vw",
      altLeft: "-25vw",
      width: "42vw",
      altWidth: "18vw",
      height: "25svh",
      altHeight: "32svh",
    },
    {
      src: "/images/engagement4.JPG",
      scale: scale9,
      top: "25.5svh",
      altTop: "35svh",
      left: "33vw",
      altLeft: "22vw",
      width: "28vw",
      altWidth: "17vw",
      height: "22svh",
      altHeight: "22svh",
    },
  ];

  useEffect(() => {
    // This function will be called after the component mounts
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
      // console.log(innerWidth);
    };

    // Add event listener to window resize event
    window.addEventListener("resize", handleResize);
    handleResize();
    // Cleanup function: removes event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={container} className="relative mb-10 mt-32 h-[300lvh]">
      <div className="sticky top-0 h-[100lvh] overflow-hidden bg-[#1A1A1A]">
        {pictures.map(
          (
            {
              src,
              scale,
              top,
              left,
              width,
              height,
              altTop,
              altLeft,
              altHeight,
              altWidth,
            },
            index,
          ) => {
            return (
              <motion.div
                style={{ scale }}
                key={index}
                className="absolute top-0 flex h-[100lvh] w-full items-center justify-center"
              >
                <div className="p-4 md:p-6">
                  <div
                    style={{
                      top: innerWidth <= 640 ? top : altTop,
                      left: innerWidth <= 640 ? left : altLeft,
                      width: innerWidth <= 640 ? width : altWidth,
                      height: innerWidth <= 640 ? height : altHeight,
                    }}
                    className="relative shadow-[10px_10px_10px_rgba(0,0,0,0.3),0_10px_10px_rgba(0,0,0,0.3)] md:p-8 md:shadow-[10px_10px_20px_rgba(0,0,0,0.4),0_10px_20px_rgba(0,0,0,0.4)]"
                  >
                    <Image
                      style={{ clipPath: "inset(2%)" }}
                      className="rounded-lg object-cover grayscale"
                      src={src}
                      alt="image"
                      fill
                      sizes={`100vw`}
                      placeholder="blur"
                      blurDataURL={"image"}
                    />
                  </div>
                </div>
              </motion.div>
            );
          },
        )}
      </div>
      <div className="absolute bottom-8 flex w-full flex-col items-center justify-center md:bottom-10">
        <motion.h2
          // style={{ y: md, opacity: countdownOpacity }}
          className="font-violentica text-6xl"
        >
          <span className="font-mothenary text-5xl">{eventConfig.date}</span>
        </motion.h2>
        <motion.div
          // style={{ y: sm, opacity: headingOpacity }}
          className="flex w-full flex-col items-center justify-center"
        >
          <Timer />
        </motion.div>
      </div>
    </div>
  );
}

export default ZoomParallax;
