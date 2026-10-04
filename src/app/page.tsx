"use client";

import { SignIn, SignedOut } from "@clerk/nextjs";
import Lenis from "@studio-freight/lenis";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";

export default function Login() {
  const [innerWidth, setInnerWidth] = useState(650);
  useLayoutEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const lenis = new Lenis();
    let frameId = 0;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative m-0 flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[#1A1A1A] bg-center bg-repeat px-10 text-white lg:min-h-[100vh] lg:justify-center xl:flex-row">
      <div className="relative z-10">
        <h1 className="mb-6 pt-12 text-center font-tanPearl text-xl leading-10 text-white md:max-w-5xl md:text-6xl xl:m-0 xl:mb-0 xl:mr-4 xl:text-left">
          Welcome to{" "}
          <span className="font-mothenary text-7xl lg:text-9xl">Jeanty &amp; Trinesha&apos;s</span>{" "}
          wedding experience.
        </h1>
        <p className="mb-6 text-center text-sm font-light text-neutral-200 md:text-base">
          Public portfolio edition — guest data shown in the demo is fictional.
        </p>
        <div className="pointer-events-none absolute -left-6 top-0 z-[1] flex h-full w-full items-center md:left-[36%] md:top-[-50%]">
          <Image
            src={"/images/flower.png"}
            alt={""}
            width={innerWidth <= 650 ? 80 : 170}
            height={innerWidth <= 650 ? 80 : 170}
            priority
          />
        </div>
      </div>
      <video
        src={"/videos/Aura.mp4"}
        autoPlay
        muted
        loop
        playsInline
        className="pointer-events-none absolute left-0 top-0 z-0 flex h-[100vh] w-[100vw] object-cover grayscale-[80%]"
      ></video>

      <div className="relative z-10 flex flex-col gap-4 rounded-2xl border border-white/20 bg-black/20 p-4 backdrop-blur-sm">
        <Link
          href="/api/demo"
          className="rounded-full border border-white/40 bg-white/10 px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-white/20"
        >
          Explore Demo
        </Link>
        <SignedOut>
          <div className="flex flex-col gap-2">
            <p className="text-center text-sm font-medium text-white">Guest Sign In</p>
            <SignIn afterSignInUrl={"/home"} afterSignUpUrl={"/home"} />
          </div>
        </SignedOut>
      </div>
    </div>
  );
}
