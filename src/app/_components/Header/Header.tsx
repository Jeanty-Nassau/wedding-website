import React, { useEffect, useState } from "react";
import HeaderButton from "./HeaderButton/HeaderButton";
import { AnimatePresence, motion } from "framer-motion";
import Nav from "./Nav/Nav";

function Header() {
  const [innerWidth, setInnerWidth] = useState(650);

  const variants = {
    open: {
      width: innerWidth <= 640 ? "90lvw" : "35lvw",
      height: "85lvh",
      top: "-15px",
      right: "-15px",
      display: "block",
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
      width: 100,
      height: 40,
      top: "0px",
      right: "0px",
      display: "hidden",
      transition: { duration: 0.5, delay: 0.2, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const [isActive, setIsActive] = useState(false);

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
    <div
      className={`header fixed right-4 top-4 z-[49] ${
        isActive ? " " : ""
      } md:right-12 md:top-12 md:h-1/6 md:w-1/6`}
    >
      <motion.div
        variants={variants}
        animate={isActive ? "open" : "closed"}
        initial={"closed"}
        className="menu absolute z-[49] h-[100vh] w-[100vw] rounded-[25px] bg-blue-600"
      >
        {/* h-[650px] w-[480px] */}
        <AnimatePresence>
          {isActive && <Nav isActive={isActive} setIsActive={setIsActive} />}
        </AnimatePresence>
      </motion.div>
      <HeaderButton isActive={isActive} setIsActive={setIsActive} />
    </div>
  );
}

export default Header;
