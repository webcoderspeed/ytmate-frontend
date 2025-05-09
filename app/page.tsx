"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Youtube,
  Instagram,
  Facebook,
  Twitter,
  VideoIcon as Vimeo,
  Music,
  Video,
  Download,
  LinkIcon,
  Check,
  ArrowRight,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function Home() {
  const [url, setUrl] = useState("")
  const howItWorksRef = useRef(null)
  const toolsRef = useRef(null)
  const testimonialsRef = useRef(null)
  const featuresRef = useRef(null)

  const router = useRouter()

  const isHowItWorksInView = useInView(howItWorksRef, { once: true, amount: 0.3 })
  const isToolsInView = useInView(toolsRef, { once: true, amount: 0.3 })
  const isTestimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.3 })
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.3 })

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!url) return

    // Determine which tool to use based on the URL
    let toolId = "youtube"

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      toolId = "youtube"
    } else if (url.includes("instagram.com")) {
      toolId = "instagram"
    } else if (url.includes("facebook.com") || url.includes("fb.com")) {
      toolId = "facebook"
    } else if (url.includes("twitter.com") || url.includes("x.com")) {
      toolId = "x"
    } else if (url.includes("vimeo.com")) {
      toolId = "vimeo"
    }

    // Navigate to the appropriate tool page with the URL as a query parameter
    router.push(`/tools/${toolId}?url=${encodeURIComponent(url)}`)
  }

  const tools = [
    {
      id: "youtube",
      name: "YouTube Downloader",
      icon: <Youtube className="h-8 w-8 text-red-500" />,
      description: "Download videos in MP4, MP3, HD, 4K formats",
    },
    {
      id: "instagram",
      name: "Instagram Downloader",
      icon: <Instagram className="h-8 w-8 text-pink-500" />,
      description: "Save reels, stories, and posts in high quality",
    },
    {
      id: "facebook",
      name: "Facebook Downloader",
      icon: <Facebook className="h-8 w-8 text-blue-500" />,
      description: "Download videos, reels, and stories easily",
    },
    {
      id: "x",
      name: "X (Twitter) Downloader",
      icon: <Twitter className="h-8 w-8 text-sky-500" />,
      description: "Save videos and GIFs from tweets",
    },
    {
      id: "vimeo",
      name: "Vimeo Downloader",
      icon: <Vimeo className="h-8 w-8 text-cyan-500" />,
      description: "Download Vimeo videos in multiple formats",
    },
    {
      id: "audio-converter",
      name: "Audio Converter",
      icon: <Music className="h-8 w-8 text-purple-500" />,
      description: "Convert to MP3, AAC, WAV, and more",
    },
    {
      id: "video-quality",
      name: "HD/4K Converter",
      icon: <Video className="h-8 w-8 text-emerald-500" />,
      description: "Convert videos to HD and 4K quality",
    },
  ]

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Content Creator",
      content:
        "YTMate.in has been a game-changer for my content creation workflow. I can quickly download reference videos and convert them to the format I need.",
      avatar: "/placeholder.svg?key=1ii81",
    },
    {
      name: "Priya Patel",
      role: "Digital Marketer",
      content:
        "The speed and reliability of YTMate.in is unmatched. I use it daily to download social media content for my marketing campaigns.",
      avatar: "/placeholder.svg?key=euxly",
    },
    {
      name: "Amit Kumar",
      role: "Music Producer",
      content:
        "The audio conversion tools are fantastic! I can extract high-quality audio from videos for my music production projects.",
      avatar: "/placeholder.svg?key=nkqs5",
    },
  ]

  const features = [
    {
      title: "Multi-Platform Support",
      description: "Download from YouTube, Instagram, Facebook, X, Vimeo, and more",
      icon: <Check className="h-5 w-5 text-green-500" />,
    },
    {
      title: "High-Quality Downloads",
      description: "Get videos in HD, Full HD, and even 4K quality",
      icon: <Check className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Audio Extraction",
      description: "Convert videos to MP3, AAC, WAV, and other audio formats",
      icon: <Check className="h-5 w-5 text-green-500" />,
    },
    {
      title: "No Registration Required",
      description: "Use all tools without creating an account",
      icon: <Check className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Fast Processing",
      description: "Download and convert files in seconds",
      icon: <Check className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Completely Free",
      description: "All tools are free to use with no hidden charges",
      icon: <Check className="h-5 w-5 text-green-500" />,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 -z-10" />
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                Download Any Video or Audio. Instantly.
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                The fastest way to download and convert videos from YouTube, Instagram, Facebook, X, and more. No
                registration required.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-8">
                <div className="relative flex-1">
                  <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    type="url"
                    placeholder="Paste video URL here..."
                    className="pl-10 h-12"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Download className="mr-2 h-5 w-5" /> Download
                </Button>
              </form>

              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/tools/youtube">Try YouTube Tool</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/tools/instagram">Try Instagram Tool</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/tools/facebook">Try Facebook Tool</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12 relative"
            >
              <div className="relative rounded-lg overflow-hidden shadow-2xl border">
                <Image
                  src="/placeholder.svg?key=uzmob"
                  alt="YTMate.in Interface"
                  width={1200}
                  height={600}
                  className="rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center pb-8">
                  <Button variant="secondary" size="sm" className="gap-2">
                    <Play className="h-4 w-4" /> Watch Demo
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-20 bg-background" ref={toolsRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Tools</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our wide range of video and audio downloading and conversion tools
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={isToolsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {tools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isToolsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/tools/${tool.id}`}>
                  <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/50">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="mb-4 p-3 rounded-full bg-primary/10">{tool.icon}</div>
                      <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                      <p className="text-muted-foreground text-sm">{tool.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg" className="group">
              <Link href="/tools">
                View All Tools <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-muted/50 scroll-mt-20" ref={howItWorksRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Download any video or audio in just three simple steps
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isHowItWorksInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHowItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Paste URL</h3>
              <p className="text-muted-foreground">
                Copy the video URL from YouTube, Instagram, Facebook, or any supported platform and paste it in the
                input field
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHowItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Select Format</h3>
              <p className="text-muted-foreground">
                Choose your preferred format and quality (MP4, MP3, HD, 4K) from the available options
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHowItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Download</h3>
              <p className="text-muted-foreground">
                Click the download button and your file will be processed and ready to save to your device in seconds
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background" ref={featuresRef}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              animate={isFeaturesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose YTMate.in?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="mt-1">{feature.icon}</div>
                    <div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8">
                <Button
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  onClick={() => router.push("/#tools")}
                >
                  Try It Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              animate={isFeaturesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative rounded-lg overflow-hidden shadow-xl border">
                <Image
                  src="/placeholder.svg?key=fm8br"
                  alt="YTMate.in Features"
                  width={600}
                  height={500}
                  className="rounded-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/50" ref={testimonialsRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Thousands of users trust YTMate.in for their video and audio downloading needs
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={isTestimonialsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isTestimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={50}
                        height={50}
                        className="rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Download?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Start downloading your favorite videos and audio in seconds. No registration required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/tools/youtube">Try YouTube Downloader</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
              <Link href="/tools">Explore All Tools</Link>
            </Button>
          </div>

          <div className="mt-12 p-4 bg-white/10 rounded-lg inline-block">
            <p className="text-sm font-medium">Coming Soon: Chrome Extension</p>
            <p className="text-xs opacity-80">Download videos with just one click directly from your browser</p>
          </div>
        </div>
      </section>
    </div>
  )
}

const Play = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
)
