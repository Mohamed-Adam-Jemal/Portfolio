'use client';

import { Hero } from "@/src/components/hero"
import Experience from "@/src/components/experience"
import { About } from "@/src/components/about"
import { Skills } from "@/src/components/skills"
import { Projects } from "@/src/components/projects"
import { Certificates } from "@/src/components/certificates"
import { AIAssistant } from "@/src/components/ai-assistant"
import { Contact } from "@/src/components/contact"
import { Navigation } from "@/src/components/navigation"
import { BackgroundEffects } from "@/src/components/background-effects"
import { ScrollToTop } from "@/src/components/scroll-to-top"
import { ShootingStars } from "@/src/components/shooting-starts";
import  Education  from "@/src/components/education";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <BackgroundEffects />
      <Navigation />
      <main className="relative z-50 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certificates />
        <Education />
        <AIAssistant />
        <Contact />
        <ShootingStars/>
      </main>
      <ScrollToTop />
    </div>
  )
}
