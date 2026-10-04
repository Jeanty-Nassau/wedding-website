"use client";
import { useScroll } from "framer-motion";
import React, { useLayoutEffect, useRef, useState } from "react";
import Card from "./Card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { eventConfig } from "../../config/event";

function Faq() {
  const faqs = [
    {
      question: "How do I RSVP and by when?",
      answer: `You can respond directly from the RSVP page. Please confirm attendance by ${eventConfig.rsvpDeadline} so we can finalize the table plan and menu choices.`,
    },
    {
      question: "Can we bring our children?",
      answer: `Invitations are tailored to each household. If a child is included, their name will appear on the RSVP list and the menu will reflect the kids meal option.`,
    },
    {
      question: "Can I bring a plus one?",
      answer: `Plus ones are only included when specifically noted on the invitation. If your invitation includes a guest, it will appear in your RSVP list.`,
    },
    {
      question: "Will the ceremony be indoors or outdoors?",
      answer: `The ceremony will take place outdoors, with an indoor backup plan should weather change. The venue has both options available.`,
    },
    {
      question: "How will the seating work?",
      answer: `Guests will be seated according to the final table plan shared closer to the event. We recommend checking in early to find your place and settle in.`,
    },
    {
      question: "Is there parking at the venue?",
      answer: `Complimentary guest parking will be available at the estate entrance.`,
    },
    {
      question: "Can I take pictures during the ceremony?",
      answer: `We kindly ask that phones remain silent and away during the ceremony so the photographer can capture the moment without interruption.`,
    },
    {
      question: "Can I take pictures at the reception?",
      answer: `Absolutely. We would love for guests to share their moments after the ceremony and during the reception.`,
    },
    {
      question: "Can I upload pictures to social media?",
      answer: `Please use the hashtag ${eventConfig.hashtag} when posting to social media so we can relive the celebration with you.`,
    },
    {
      question: "Will there be an open bar?",
      answer: `The reception will include a full bar and thoughtful evening service.`,
    },
  ];
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const headingContainer = useRef(null);
  const heading = useRef(null);
  useLayoutEffect(() => {
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
            start: "top+=250px bottom",
            end: "bottom+=250px bottom",
          },
          translateY: "-40px",
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
      id="faq"
      ref={container}
      className="relative w-full justify-center rounded-3xl pb-32 pt-4 text-4xl text-white shadow-[0_60px_50px_rgba(0,0,0,0.6)]"
    >
      <div
        ref={headingContainer}
        className="variant z-10  mt-20 w-full overflow-hidden pt-10 md:mt-40 lg:px-20"
      >
        <div className="absolute left-0 top-2 flex h-2/5 w-full items-center justify-between px-10 md:h-4/5 md:justify-evenly md:px-24">
          <Image
            src={"/images/daisy.png"}
            alt={""}
            width={innerWidth <= 650 ? 55 : 100}
            height={innerWidth <= 650 ? 55 : 100}
          />
          <Image
            className="scale-x-[-1]"
            src={"/images/daisy.png"}
            alt={""}
            width={innerWidth <= 650 ? 55 : 100}
            height={innerWidth <= 650 ? 55 : 100}
          />
        </div>
        <h1
          ref={heading}
          className=" text-center font-tanPearl text-5xl leading-normal md:text-[6rem] lg:text-center"
        >
          FAQs
        </h1>
      </div>
      {faqs.map((faq, index) => {
        const targetScale = 1 - (faqs.length - index) * 0.05;
        return (
          <Card
            key={index}
            i={index}
            {...faq}
            range={[index * 0.125, 1]}
            targetScale={targetScale}
            progress={scrollYProgress}
          />
        );
      })}
    </section>
  );
}

export default Faq;
