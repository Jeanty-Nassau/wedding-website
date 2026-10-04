"use client";
import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { eventConfig } from "../../config/event";

function BridalShower() {
  const detailList = [
    {
      name: "Venue",
      paragraphs: [
        `Location: ${eventConfig.welcomeDinnerVenue}.`,
        `Date: Friday, ${eventConfig.welcomeDinnerDate}.`,
        "Time: 18:00 onward.",
      ],
    },
    {
      name: "Dress Code",
      paragraphs: [
        "Garden formal is encouraged, with soft neutrals and rich evening tones.",
        "Comfort is key—we want guests to settle in, mingle, and celebrate freely.",
        "We look forward to a relaxed, joyful evening with good company.",
      ],
    },
    {
      name: "Details/Gifts",
      paragraphs: [
        "We are delighted to gather with friends and family for a welcome evening before the main wedding weekend celebrations begin.",
        "The evening will include cocktails, a relaxed dinner, and a festive atmosphere designed to help everyone ease into the weekend.",
        "Your presence is the greatest gift, though thoughtful cards and well wishes are always welcome.",
      ],
    },
  ];

  const headingContainer = useRef(null);
  const heading = useRef(null);
  useEffect(() => {
    const context = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.set(headingContainer.current, { perspective: 500 });
      gsap.fromTo(
        heading.current,
        {
          translateY: "500px",
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: headingContainer.current,
            scrub: 1,
            start: "top+=150px bottom",
            end: "bottom+=250px bottom",
          },
          translateY: "0px",
          opacity: 1,
        },
      );
    }, headingContainer);

    return () => context.revert();
  }, []);

  const [innerWidth, setInnerWidth] = useState(650);
  useLayoutEffect(() => {
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
      id="details"
      className="m-0 mt-10 flex min-h-[80lvh] w-full flex-col justify-center rounded-3xl pb-20 pt-14 text-4xl text-white shadow-[0_60px_50px_20px_rgba(0,0,0,0.6)]"
    >
      <div
        ref={headingContainer}
        className="variant z-10 mb-4 w-full  overflow-hidden pb-4 lg:px-20"
      >
        <div className="absolute left-0 top-2 flex h-3/5 w-full items-center justify-between px-4 md:h-full md:px-52">
          <Image
            src={"/images/flower.png"}
            alt={""}
            width={innerWidth <= 650 ? 50 : 80}
            height={innerWidth <= 650 ? 50 : 80}
          />
          <Image
            className="scale-x-[-1]"
            src={"/images/flower.png"}
            alt={""}
            width={innerWidth <= 650 ? 50 : 80}
            height={innerWidth <= 650 ? 50 : 80}
          />
        </div>
        <h1
          ref={heading}
          className=" text-center font-tanPearl text-5xl leading-normal md:text-[6rem] lg:text-center"
        >
          Bridal Shower
        </h1>
      </div>

      <div className="relative  mt-[40px] grid grid-cols-4 items-start gap-[16px] px-2 md:px-40 lg:mt-[30px]">
        <div className="col-span-4 h-full w-full md:col-span-2">
          <div className="grid-cols-subgrid grid h-full w-full grid-cols-2 gap-4 text-left md:grid-cols-1">
            <DetailItem
              name={detailList[0]!.name}
              paragraphs={detailList[0]!.paragraphs}
            >
              {""}
            </DetailItem>
            <DetailItem
              name={detailList[1]!.name}
              paragraphs={detailList[1]!.paragraphs}
            >
              <p className="text-left text-base text-white xl:text-base">
                A soft palette of warm neutrals and evening tones is recommended.
              </p>
            </DetailItem>
          </div>
        </div>
        <div className="col-span-4 h-full md:col-span-2">
          <DetailItem
            name={detailList[2]!.name}
            paragraphs={detailList[2]!.paragraphs}
          >
            <p className="text-xs text-white xl:text-sm">
              1. Arrive early to settle in before the evening begins.
            </p>
            <p className="text-xs text-white xl:text-sm">
              2. Enjoy the welcome cocktails and relaxed dinner before the main celebration.
            </p>
            <p className="text-xs text-white xl:text-sm">
              3. Bring your warmest wishes and a good story for the weekend.
            </p>
          </DetailItem>
        </div>
      </div>
    </section>
  );
}

const DetailItem = ({
  name,
  paragraphs,
  children,
}: {
  name: string;
  paragraphs: string[];
  children: React.ReactNode;
}) => {
  const layer = useRef(null);
  const card = useRef(null);
  const container = useRef(null);
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.set(container.current, { perspective: 500 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top-=50px bottom",
          end: "bottom-=100px bottom",
          scrub: 1,
        },
      });

      timeline.fromTo(
        card.current,
        { translateZ: -200, rotateX: -90, opacity: 0 },
        {
          transform: "translate(0px, 0px)",
          opacity: 1,
          translateZ: 0,
          rotateX: 0,
          transformOrigin: "50% 0",
        },
      );

      gsap.to(layer.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: container.current,
          start: "top-=100px bottom",
          end: "bottom-=80px bottom",
        },
      });
    }, container);

    return () => context.revert();
  }, []);
  return (
    <div ref={container} className="flex h-full w-full text-white">
      <div
        ref={card}
        style={{ transform: "rotate3d(-,0,0,30deg)" }}
        className="element relative top-0 flex w-full flex-col rounded-3xl border border-neutral-800 bg-[#1A1A1A] bg-center bg-repeat px-4 py-8
        shadow-[10px_10px_10px_rgba(0,0,0,0.3),0_10px_10px_rgba(0,0,0,0.3)] md:p-16 md:shadow-[10px_10px_20px_rgba(0,0,0,0.4),0_10px_20px_rgba(0,0,0,0.4)]  "
      >
        <div
          ref={layer}
          style={{ opacity: 1 }}
          className="pointer-events-none absolute inset-0 z-[20]  rounded-3xl bg-[#1A1A1A] opacity-0"
        ></div>
        <h2 className="pb-2 font-violentica text-6xl xl:text-8xl">{name}</h2>
        <div className="description md:tex-justify relative flex flex-col justify-between gap-4 overflow-hidden">
          {paragraphs.map((paragraph, index) => {
            return <AnimtatedText key={index}>{paragraph}</AnimtatedText>;
          })}
          {children}
        </div>
      </div>
    </div>
  );
};

const AnimtatedText = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="opacity-1 relative left-[0px] text-base font-light md:text-justify xl:text-base">
      {children}
    </p>
  );
};
export default BridalShower;
