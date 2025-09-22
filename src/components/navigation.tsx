"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import navigationData from "@/src/data/navigation.json"
import { AnimatePresence, motion } from "framer-motion"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("#home")

  const NAVBAR_HEIGHT = 80 // adjust according to your navbar height

  // Detect scroll for navbar background & active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = navigationData.navItems.map((item) =>
        document.querySelector(item.href)
      ) as HTMLElement[]

      const scrollPos = window.scrollY + NAVBAR_HEIGHT + 20 // offset for active section detection
      for (const section of sections) {
        if (
          section &&
          section.offsetTop <= scrollPos &&
          section.offsetTop + section.offsetHeight > scrollPos
        ) {
          setActiveSection(`#${section.id}`)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Optional: Set default smooth scrolling for all anchor clicks
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  // Programmatic scroll to handle mobile offset
  const handleNavClick = (href: string) => {
    const target = document.querySelector(href) as HTMLElement
    if (target) {
      const yOffset = -NAVBAR_HEIGHT // offset for fixed navbar
      const y = target.getBoundingClientRect().top + window.scrollY + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
    setIsOpen(false) // close mobile menu
  }

  return (
    <nav
      className={`fixed top-0 w-full z-60 transition-all duration-300 ${
        scrolled
          ? "bg-gray-900/80 backdrop-blur-md border-b border-indigo-500/30"
          : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 relative">
          {/* Brand */}
          <div className="text-2xl font-bold professional-brand">
            {navigationData.brand}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationData.navItems.map((item) => (
              <a
                key={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.href)
                }}
                className={`relative group transition-colors duration-200 ${
                  activeSection === item.href
                    ? "text-indigo-400"
                    : "text-gray-300 hover:text-indigo-400"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 ${
                    activeSection === item.href
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </a>
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <div
            className="lg:hidden cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="relative w-7 h-7">
              <Menu
                className={`absolute inset-0 h-7 w-7 text-white transition-all duration-300 ${
                  isOpen ? "opacity-0 scale-75 rotate-90" : "opacity-100 scale-100 rotate-0"
                }`}
              />
              <X
                className={`absolute inset-0 h-7 w-7 text-white transition-all duration-300 ${
                  isOpen ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 -rotate-90"
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden absolute left-0 right-0 top-full bg-gray-800/95 backdrop-blur-md rounded-lg mt-2 p-4 border border-indigo-500/30"
          >
            {navigationData.navItems.map((item, index) => (
              <motion.a
                key={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.href)
                }}
                className={`block py-2 transition-colors duration-200 ${
                  activeSection === item.href
                    ? "text-indigo-400"
                    : "text-gray-300 hover:text-indigo-400"
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.3,
                }}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
