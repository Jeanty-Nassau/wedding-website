"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const perspective = {
  initial: {
    opacity: 0,
    rotateX: 90,
    translateY: 80,
    translateX: -20,
  },
  enter: (i: number) => ({
    opacity: 1,
    rotateX: 0,
    translateY: 0,
    translateX: 0,
    transition: {
      duration: 0.35,
      opacity: { delay: 0.4, duration: 0.15 },
      delay: 0.2 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: [0.76, 0, 0.24, 1] },
  },
};

const slidein = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.5 + i * 0.05,
      // delay: 0.5,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.1, ease: [0.76, 0, 0.24, 1] },
  },
};

function Nav({
  isActive,
  setIsActive,
}: {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const links = [
    {
      title: "Home",
      href: "/home",
    },
    {
      title: "Rsvp",
      href: "/rsvp",
    },
  ];
  const footerLinks = [
    {
      title: "Story",
      href: "/home#story",
    },
    {
      title: "Timeline",
      href: "/home#timeline",
    },
    {
      title: "Details",
      href: "/home#details",
    },
    {
      title: "Bridal Shower",
      href: "/home#details",
    },
    {
      title: "FAQs",
      href: "/home#faq",
    },
  ];

  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <div className="box-border flex h-full flex-col justify-between px-10 pb-12 pt-16 md:pt-24">
      {/* px-[40px] pb-[50px] pt-[100px] */}
      <div className="body flex h-3/5 flex-col justify-around">
        {links.map((link, i) => {
          return (
            <div
              key={i}
              style={{ perspective: "120px", perspectiveOrigin: "bottom" }}
              className="linkContainer"
            >
              <motion.div
                custom={i}
                variants={perspective}
                animate="enter"
                exit="exit"
                initial="initial"
              >
                <Link
                  className="font-tanPearl text-4xl text-white md:text-6xl"
                  href={link.href}
                  onClick={() => setIsActive(!isActive)}
                >
                  {link.title}
                </Link>
              </motion.div>
            </div>
          );
        })}
      </div>
      <div className="footer flex flex-wrap">
        <motion.div
          className="w-1/2 text-xl text-white md:text-2xl"
          variants={slidein}
          animate="enter"
          custom={0}
          exit="exit"
          initial="initial"
        >
          <button className="" onClick={() => signOut(() => router.push("/"))}>
            Sign Out *
          </button>
        </motion.div>
        {footerLinks.map((link, i) => {
          return (
            <motion.div
              key={`f_${i}`}
              className="w-1/2 text-xl text-black no-underline md:text-2xl"
              variants={slidein}
              custom={i + 1}
              animate="enter"
              exit="exit"
              initial="initial"
            >
              <Link href={link.href}>{link.title}</Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Nav;
