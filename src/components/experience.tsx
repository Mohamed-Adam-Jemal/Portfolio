'use client';

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MetallicTitle } from "./metallic-title";
import type { StaticImageData } from "next/image";

import "react-vertical-timeline-component/style.min.css";

import { experiences } from "@/src/data/experience";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

type VerticalTimelineProps = {
  children?: React.ReactNode;
  className?: string;
};

type VerticalTimelineElementProps = {
  children?: React.ReactNode;
  className?: string;
  contentStyle?: React.CSSProperties;
  contentArrowStyle?: React.CSSProperties;
  date?: string | React.ReactNode;
  iconStyle?: React.CSSProperties;
  icon?: React.ReactNode;
};


// Dynamically import timeline components to disable SSR
const VerticalTimeline = dynamic<VerticalTimelineProps>(
  () =>
    import("react-vertical-timeline-component").then(
      (mod) => mod.VerticalTimeline
    ),
  { ssr: false }
);

const VerticalTimelineElement = dynamic<VerticalTimelineElementProps>(
  () =>
    import("react-vertical-timeline-component").then(
      (mod) => mod.VerticalTimelineElement
    ),
  { ssr: false }
);

// Define the type for an experience object
type ExperienceType = {
  title: string;
  company_name: string;
  icon: string | StaticImageData; // <-- updated for imported images
  iconBg: string;
  date: string;
  points: string[];
};

// Props for ExperienceCard
type ExperienceCardProps = {
  experience: ExperienceType;
};

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={typeof experience.icon === "string" ? experience.icon : (experience.icon as StaticImageData).src}
            alt={experience.company_name}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[24px] font-bold">
          {experience.title}
        </h3>
        <p
          className="text-secondary text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-white-100 text-[14px] pl-1 tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience: React.FC = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <div className="text-center mb-16">
          <MetallicTitle className="text-4xl md:text-5xl font-bold mb-6 neon-title">
            Professional Experience
          </MetallicTitle>
          <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 mx-auto professional-line"></div>
        </div>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
