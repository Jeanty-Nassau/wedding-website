"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function Story() {
  const headingContainer = useRef(null);
  const imageContainer = useRef(null);
  const images = useRef(null);

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
      gsap.fromTo(
        images.current,
        { translateY: "200px" },
        {
          scrollTrigger: {
            trigger: imageContainer.current,
            scrub: 1,
            start: "top bottom",
            end: "bottom+=250px bottom",
          },
          translateY: "-50px",
        },
      );
    }, headingContainer);

    return () => context.revert();
  }, []);

  const [innerWidth, setInnerWidth] = useState(650);
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
      id="story"
      className="relative m-0 flex w-full flex-col items-center overflow-hidden rounded-3xl bg-[#ffff] bg-center bg-repeat py-12 text-4xl text-black shadow-[0_60px_50px_20px_rgba(0,0,0,0.6)] md:py-20 lg:min-h-[100svh] lg:justify-around"
    >
      <div
        ref={headingContainer}
        className="variant z-10 mb-4 w-full  overflow-hidden pb-4 lg:px-20"
      >
        <div className="absolute right-6 top-2 flex h-full w-full scale-x-[-1] items-center justify-center invert md:left-44 md:top-2 md:ml-52 md:h-full">
          <Image
            className="scale-x-[-1]"
            src={
              innerWidth <= 650 ? "/images/flower.png" : "/images/roseRight.png"
            }
            alt={""}
            width={innerWidth <= 650 ? 45 : 160}
            height={innerWidth <= 650 ? 45 : 160}
          />
        </div>
        <h1
          ref={heading}
          className=" text-center font-tanPearl text-5xl leading-normal md:text-[6rem] lg:text-center"
        >
          Our Story
        </h1>
      </div>

      <div
        ref={imageContainer}
        className="grid h-1/2 w-full grid-cols-1  px-1 pb-6 md:grid-cols-3 md:px-6 xl:px-20"
      >
        <div
          ref={images}
          className="col-span-2 my-2 flex items-center justify-center gap-2 rounded-3xl border border-neutral-100 bg-[#ffff] bg-center bg-repeat px-4
          py-12  shadow-[10px_10px_10px_rgba(0,0,0,0.3),0_10px_10px_rgba(0,0,0,0.3)] md:px-8 md:py-14 md:shadow-[10px_10px_20px_rgba(0,0,0,0.4),0_10px_20px_rgba(0,0,0,0.4)]"
        >
          <div className="flex flex-col gap-2">
            <Image
              src={"/images/story1.jpg"}
              alt="story image 1"
              width={228}
              height={338}
            />
            <Image
              src={"/images/story2.jpg"}
              alt="story image 2"
              width={228}
              height={176}
            />
          </div>
          <Image
            src={"/images/story3.jpg"}
            alt="story image 3"
            width={438}
            height={523.5}
            className="hidden xl:block"
          />
          <div className="flex flex-col gap-2">
            <Image
              src={"/images/story4.jpg"}
              alt="story image 4"
              width={325}
              height={280}
            />
            <Image
              src={"/images/story5.jpg"}
              alt="story image 5"
              width={325}
              height={233}
            />
          </div>
        </div>
        <div className="relative flex items-center justify-center  px-2 pt-10 md:border-y-0 md:border-l-0 md:px-4 md:py-0 md:pt-16">
          <p className="w-[95%] text-left text-base font-light md:text-justify lg:flex lg:w-[90%] lg:text-base">
            Jeanty and Trinesha&apos;s story began with a friendship in high school. Over
            time, that friendship grew into a partnership and a shared commitment to
            building a life together.
            <br />
            <br />
            Jeanty built this wedding experience for their celebration and the guests
            who shared it with them. The photographs and visual identity here remain
            part of that real story.
            <br />
            <br />
            This public portfolio edition keeps their identity while using fictional
            guest and RSVP data in its interactive demo.
          </p>
          <p></p>
        </div>
      </div>
    </section>
  );
}

export default Story;
