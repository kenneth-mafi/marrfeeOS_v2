import { motion } from "framer-motion";
import "./ScrollArea.css";
import { useLocation } from "react-router-dom";
import { pageEffects } from "../PageFrames/pageEffects";

export default function ScrollArea({
  children,
  className = "",
  horizontal = false,
  effect=""
}) {
  const location = useLocation();

  return (
    <motion.div
      className={`mOS-scrollArea ${horizontal ? "mOS-scrollArea--x" : "mOS-scrollArea--y"} ${className}`}
      key={location.pathname}
      { ...pageEffects[effect] }
    >
      {children}
    </motion.div>
  );
}
