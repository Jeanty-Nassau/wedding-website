import React from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.scss";
function HeaderButton({
  isActive,
  setIsActive,
}: {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      onClick={() => {
        setIsActive(!isActive);
        // console.log("Menu clicked");
      }}
      className="button absolute right-0 top-0 z-[100] h-[40px] w-[100px] cursor-pointer overflow-hidden rounded-[25px]"
    >
      <motion.div
        className={styles.slider}
        animate={{ top: isActive ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className={styles.el}>
          <PerspectiveText label={"Menu"} />
        </div>
        <div className={styles.el}>
          <PerspectiveText label={"Close"} />
        </div>
      </motion.div>
    </div>
  );
}

function PerspectiveText({ label }: { label: string }) {
  return (
    <div className={styles.perspectiveText}>
      <p>{label}</p>
      <p>{label}</p>
    </div>
  );
}
export default HeaderButton;
