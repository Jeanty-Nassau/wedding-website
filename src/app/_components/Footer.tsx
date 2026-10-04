"use client";
import React, { useLayoutEffect, useState } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { eventConfig } from "../../config/event";
function Footer() {
  const router = useRouter();
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
    <div className="relative z-[20] flex w-full flex-col items-center justify-center rounded-3xl px-4 py-10 text-white">
      <h1 className="text-center font-violentica text-8xl md:text-9xl">
        We hope you can join us
      </h1>
      <div className="mb-2 flex w-full items-center justify-evenly pb-4 text-center font-extralight">
        <div className="flex flex-col text-sm">
          <p>Trinesha</p>
        </div>
        <div className="flex flex-col text-sm">
          <p>Jeanty</p>
        </div>
      </div>
      <p className="mb-6 text-sm font-extralight">{eventConfig.hashtag}</p>
      <div className="absolute top-6 flex w-full items-center justify-between">
        <Image
          src={"/images/roseLeft.png"}
          alt={""}
          width={innerWidth <= 650 ? 120 : 200}
          height={innerWidth <= 650 ? 120 : 200}
        />
        <Image
          src={"/images/roseRight.png"}
          alt={""}
          width={innerWidth <= 650 ? 120 : 200}
          height={innerWidth <= 650 ? 120 : 200}
        />
      </div>
      <Button
        textColor="#ffffff"
        buttonColor="black"
        backgroundColor="rgb(37 99 235)"
        onClick={() => router.push("/home#hero")}
        key={"Back To Top"}
      >
        Back to Top
      </Button>
    </div>
  );
}

export default Footer;
