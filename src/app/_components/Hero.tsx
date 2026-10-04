"use client";

import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function Hero() {
  const [innerWidth, setInnerWidth] = useState(650);
  const backgroundImage = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top-100px",
          end: "+=300px",
          scrub: true,
        },
      });

      timeline.fromTo(
        backgroundImage.current,
        { clipPath: "inset(0% round 0%)" },
        { clipPath: "inset(20% round 1.5rem )" },
      );
    }, backgroundImage);

    return () => context.revert();
  }, []);

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
    <section
      id="hero"
      className={`relative mb-10 max-w-full bg-center bg-repeat`}
    >
      <div ref={backgroundImage} className="absolute top-0 h-[105svh] w-full ">
        <Image
          priority
          className="object-cover object-center"
          quality={100}
          src={innerWidth <= 640 ? "/images/Hero.jpg" : "/images/HeroLarge.png"}
          alt={"Hero Image"}
          fill
        />
      </div>
      <div className="flex h-[100lvh] w-full flex-col items-center justify-between pb-24 pt-5 ">
        <div className="relative z-[3] flex items-center justify-around rounded-full border border-neutral-500 px-4 pb-10 pt-14">
          <h1 className="font-tanPearl text-8xl">T</h1>
          <h1 className="mx-2 font-violentica text-4xl">·</h1>
          <h1 className="font-tanPearl text-8xl">J</h1>
        </div>
        <div className="">
          <Button
            textColor="#ffffff"
            buttonColor="black"
            backgroundColor="rgb(37 99 235)"
            onClick={() => router.push("/rsvp")}
            key={"RSVP"}
          >
            RSVP ↗
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
