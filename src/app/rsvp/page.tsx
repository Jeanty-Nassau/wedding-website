"use client";
import React, { useEffect } from "react";
import RsvpCardGrid from "../_components/RsvpCardGrid";
import Lenis from "@studio-freight/lenis";
import { eventConfig } from "../../config/event";

const Rsvp = () => {
  const mains = [
    {
      main: `Beef fillet`,
      description: `Classic French beef fillet topper with béarnaise, piped fluffy potatoes, parmesan crisps, and leak-wrapped baby carrots.`,
    },
    {
      main: `Prawn Linguine`,
      description: `A prawn linguine in lemon garlic creamy sauce.`,
    },
    {
      main: `Vegetarian`,
      description: `Aubergine cannelloni stuffed with wild rice, confit tomato, and
      carrot purée served with potato fondant and tempura broccolini
      coated in napolitana sauce.`,
    },
    {
      main: `Kids Meal`,
      description: `(Ages 12 and under are considered as kids and will be served the kids meal.)`,
    },
  ];
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
    <div className="m-0 flex min-h-[100lvh] w-full flex-col items-center justify-start scroll-smooth bg-[#1A1A1A] bg-center bg-repeat text-white">
      <div className="relative flex w-full flex-col items-start justify-between p-4 md:flex-row md:p-10">
        <div className="top-10 h-[85lvh] w-full rounded-3xl border border-neutral-100 bg-[#ffff] bg-center bg-repeat text-black shadow-[10px_10px_10px_rgba(0,0,0,0.3),0_10px_10px_rgba(0,0,0,0.3)] md:sticky md:h-[92lvh] md:w-2/5 md:shadow-[10px_10px_20px_rgba(0,0,0,0.4),0_10px_20px_rgba(0,0,0,0.4)]">
          <div className="flex h-full flex-col items-center p-10">
            <p className="font-tanPearl">menu</p>
            <h1 className="mb-4 font-violentica text-7xl md:mb-8 md:text-8xl">
              Mains
            </h1>
            <div className="flex h-4/5 w-4/5 flex-col items-center justify-between text-center">
              {mains.map((main, i) => (
                <div key={i}>
                  <h1 className="mb-2 font-tanPearl text-base underline md:mb-4 md:text-xl">
                    {main.main}
                    <br />
                  </h1>
                  <p className="text-sm font-extralight md:text-base">
                    {main.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full py-10 md:w-[58%]">
          <div className="flex flex-col items-center">
            <h1 className="mb-4 font-violentica text-7xl md:mb-8 md:text-8xl">
              RSVP
            </h1>
            <div className="flex flex-col items-center justify-between gap-4 px-10 pb-0 text-center">
              <div>
                <p className="text-sm lg:text-base">
                  Date:{" "}
                  <span className="pl-4 text-sm font-extralight">
                    {eventConfig.date} at {eventConfig.ceremonyTime}
                  </span>
                </p>
                <p className="text-sm lg:text-base">
                  Venue:{" "}
                  <span className="pl-4 text-sm font-extralight">
                    {eventConfig.venue}
                  </span>
                </p>
              </div>
              <p className="text-base font-extralight md:w-[60%] lg:text-sm">
                We are delighted to celebrate with you. Please confirm your attendance,
                meal choice, and any dietary requirements before {eventConfig.rsvpDeadline}.
              </p>
            </div>
            <RsvpCardGrid />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rsvp;
