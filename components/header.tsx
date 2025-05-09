"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Add scroll behavior to the navigation links
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Tools", href: "/tools", hasDropdown: true },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Blog", href: "/blogs" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  // Add a function to handle smooth scrolling for hash links
  // Add this function after the navLinks declaration
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's a hash link, handle smooth scrolling
    if (href.includes("#") && !href.startsWith("/")) {
      e.preventDefault()
      const targetId = href.replace("/", "")
      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.scrollY - 80, // Offset for header
          behavior: "smooth",
        })
      }
    } else if (!href.includes("#")) {
      // For non-hash links, ensure we scroll to top
      window.scrollTo(0, 0)
    }
  }

  const toolLinks = [
    { name: "All Tools", href: "/tools" },
    { name: "YouTube Downloader", href: "/tools/youtube" },
    { name: "Instagram Downloader", href: "/tools/instagram" },
    { name: "Facebook Downloader", href: "/tools/facebook" },
    { name: "X (Twitter) Downloader", href: "/tools/x" },
    { name: "Vimeo Downloader", href: "/tools/vimeo" },
    { name: "Audio Converter", href: "/tools/audio-converter" },
    { name: "HD/4K Converter", href: "/tools/video-quality" },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              YTMate.in
            </span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.name} className="relative">
                {link.hasDropdown ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={cn(
                          "text-sm font-medium transition-colors hover:text-primary flex items-center",
                          pathname === link.href ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        {link.name} <ChevronDown className="ml-1 h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" sideOffset={8} className="w-56">
                      {toolLinks.map((toolLink) => (
                        <DropdownMenuItem key={toolLink.href} asChild>
                          <Link href={toolLink.href} className={cn(pathname === toolLink.href ? "bg-muted" : "")}>
                            {toolLink.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      pathname === link.href ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="flex items-center space-x-2">
            <ModeToggle />
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={() => (window.location.href = "/tools")}
            >
              Try Now
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center space-x-2 md:hidden">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-background border-b"
        >
          <div className="container mx-auto px-4 py-4">
            <ul className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  {link.hasDropdown ? (
                    <>
                      <div className="text-sm font-medium py-2 border-b">{link.name}</div>
                      <ul className="pl-4 pt-2 space-y-2">
                        {toolLinks.map((toolLink) => (
                          <li key={toolLink.href}>
                            <Link
                              href={toolLink.href}
                              className={cn(
                                "text-sm block py-1 transition-colors hover:text-primary",
                                pathname === toolLink.href ? "text-primary" : "text-muted-foreground",
                              )}
                              onClick={() => setIsOpen(false)}
                            >
                              {toolLink.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        "text-sm font-medium block py-2 transition-colors hover:text-primary",
                        pathname === link.href ? "text-primary" : "text-muted-foreground",
                      )}
                      onClick={(e) => {
                        setIsOpen(false)
                        handleLinkClick(e, link.href)
                      }}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  onClick={() => {
                    setIsOpen(false)
                    window.location.href = "/tools"
                  }}
                >
                  Try Now
                </Button>
              </li>
            </ul>
          </div>
        </motion.div>
      )}
    </header>
  )
}

export default Header
