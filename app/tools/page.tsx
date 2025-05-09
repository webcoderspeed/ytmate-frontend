"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
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
  Search,
  Download,
  ArrowRight,
} from "lucide-react"

export default function ToolsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const tools = [
    {
      id: "youtube",
      name: "YouTube Downloader",
      icon: <Youtube className="h-8 w-8 text-red-500" />,
      description: "Download videos in MP4, MP3, HD, 4K formats",
      popular: true,
    },
    {
      id: "instagram",
      name: "Instagram Downloader",
      icon: <Instagram className="h-8 w-8 text-pink-500" />,
      description: "Save reels, stories, and posts in high quality",
      popular: true,
    },
    {
      id: "facebook",
      name: "Facebook Downloader",
      icon: <Facebook className="h-8 w-8 text-blue-500" />,
      description: "Download videos, reels, and stories easily",
      popular: true,
    },
    {
      id: "x",
      name: "X (Twitter) Downloader",
      icon: <Twitter className="h-8 w-8 text-sky-500" />,
      description: "Save videos and GIFs from tweets",
      popular: false,
    },
    {
      id: "vimeo",
      name: "Vimeo Downloader",
      icon: <Vimeo className="h-8 w-8 text-cyan-500" />,
      description: "Download Vimeo videos in multiple formats",
      popular: false,
    },
    {
      id: "audio-converter",
      name: "Audio Converter",
      icon: <Music className="h-8 w-8 text-purple-500" />,
      description: "Convert to MP3, AAC, WAV, and more",
      popular: false,
    },
    {
      id: "video-quality",
      name: "HD/4K Converter",
      icon: <Video className="h-8 w-8 text-emerald-500" />,
      description: "Convert videos to HD and 4K quality",
      popular: false,
    },
  ]

  // Filter tools based on search term
  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">All Tools</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our wide range of video and audio downloading and conversion tools
          </p>
        </div>

        <div className="relative max-w-md mx-auto mb-12">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="search"
            placeholder="Search tools..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Popular Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools
              .filter((tool) => tool.popular)
              .map((tool) => (
                <Link key={tool.id} href={`/tools/${tool.id}`}>
                  <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/50">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="mb-4 p-3 rounded-full bg-primary/10">{tool.icon}</div>
                      <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{tool.description}</p>
                      <Button variant="outline" size="sm" className="mt-auto group">
                        Use Tool <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">All Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools
              .filter((tool) => !tool.popular || searchTerm !== "")
              .map((tool) => (
                <Link key={tool.id} href={`/tools/${tool.id}`}>
                  <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/50">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="mb-4 p-3 rounded-full bg-primary/10">{tool.icon}</div>
                      <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{tool.description}</p>
                      <Button variant="outline" size="sm" className="mt-auto group">
                        Use Tool <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Need a Custom Tool?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            If you need a specific tool that's not listed here, feel free to contact us. We're constantly adding new
            tools based on user requests.
          </p>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Download className="mr-2 h-5 w-5" /> Request a Tool
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
