"use client";

import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import ZoomParallax from "../_components/ZoomParallax/ZoomParallax";
import Details from "../_components/Details";
import Timeline from "../_components/Timeline";
import Hero from "../_components/Hero";
import Story from "../_components/Story";
import Faq from "../_components/Faq";
import Footer from "../_components/Footer";
import BridalShower from "../_components/BridalShower";

const Home = () => {
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
    <div className="relative m-0 bg-[#1A1A1A] text-white">
      <Hero />
      <Story />
      <Timeline />
      <Details />
      {/* <section className="relative w-full pt-10"> */}
      <ZoomParallax />
      {/* </section> */}
      <BridalShower />
      <Faq />
      <Footer />
    </div>
  );
};

export default Home;
