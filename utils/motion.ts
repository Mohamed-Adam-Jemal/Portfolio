import { Variants, Transition } from "framer-motion";

// textVariant
export const textVariant = (delay: number = 0): Variants => {
  return {
    hidden: {
      y: -50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 1.25,
        delay,
      } as Transition,
    },
  };
};

// fadeIn
export const fadeIn = (
  direction: "left" | "right" | "up" | "down",
  type: Transition["type"],
  delay: number = 0,
  duration: number = 0.5
): Variants => {
  return {
    hidden: {
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type,
        delay,
        duration,
        ease: "easeOut",
      } as Transition,
    },
  };
};

// zoomIn
export const zoomIn = (
  delay: number = 0,
  duration: number = 0.5
): Variants => {
  return {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "tween",
        delay,
        duration,
        ease: "easeOut",
      } as Transition,
    },
  };
};

// slideIn
export const slideIn = (
  direction: "left" | "right" | "up" | "down",
  type: Transition["type"],
  delay: number = 0,
  duration: number = 0.5
): Variants => {
  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type,
        delay,
        duration,
        ease: "easeOut",
      } as Transition,
    },
  };
};

// staggerContainer
export const staggerContainer = (
  staggerChildren: number,
  delayChildren: number = 0
): Variants => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
};
