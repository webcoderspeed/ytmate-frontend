"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Calendar, User, Tag, ArrowRight } from "lucide-react"

// Mock blog data
const blogs = [
  {
    id: 1,
    slug: "how-to-download-youtube-videos",
    title: "How to Download YouTube Videos in 2023",
    excerpt: "Learn the easiest and fastest ways to download YouTube videos in various formats and qualities.",
    image: "/placeholder.svg?key=50nvu",
    date: "May 15, 2023",
    author: "Rahul Sharma",
    tags: ["YouTube", "Download", "Tutorial"],
  },
  {
    id: 2,
    slug: "instagram-reels-downloader-guide",
    title: "Complete Guide to Downloading Instagram Reels",
    excerpt: "Everything you need to know about downloading and saving Instagram Reels to your device.",
    image: "/placeholder.svg?key=tbyyg",
    date: "June 22, 2023",
    author: "Priya Patel",
    tags: ["Instagram", "Reels", "Social Media"],
  },
  {
    id: 3,
    slug: "convert-videos-to-mp3",
    title: "How to Convert Videos to MP3 Audio Files",
    excerpt: "A step-by-step guide to extracting audio from videos and converting them to MP3 format.",
    image: "/placeholder.svg?key=ly25x",
    date: "July 10, 2023",
    author: "Amit Kumar",
    tags: ["Audio", "Conversion", "MP3"],
  },
  {
    id: 4,
    slug: "download-facebook-videos",
    title: "The Ultimate Guide to Downloading Facebook Videos",
    excerpt: "Learn how to download videos from Facebook posts, stories, and reels with ease.",
    image: "/facebook-video-player-interface.png",
    date: "August 5, 2023",
    author: "Neha Singh",
    tags: ["Facebook", "Download", "Social Media"],
  },
  {
    id: 5,
    slug: "best-video-formats-explained",
    title: "Video Formats Explained: Which One Should You Choose?",
    excerpt: "A comprehensive guide to different video formats and when to use each one for optimal quality.",
    image: "/video-format-icons.png",
    date: "September 18, 2023",
    author: "Vikram Mehta",
    tags: ["Video", "Formats", "Guide"],
  },
  {
    id: 6,
    slug: "download-twitter-videos",
    title: "How to Download Videos from X (Twitter)",
    excerpt: "A simple guide to downloading videos from X (formerly Twitter) to your device.",
    image: "/twitter-video-player-smartphone.png",
    date: "October 30, 2023",
    author: "Rahul Sharma",
    tags: ["Twitter", "X", "Download"],
  },
]

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0)
  }, [])

  // Get all unique tags
  const allTags = Array.from(new Set(blogs.flatMap((blog) => blog.tags)))

  // Filter blogs based on search term and selected tag
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      searchTerm === "" ||
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTag = selectedTag === null || blog.tags.includes(selectedTag)

    return matchesSearch && matchesTag
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover tips, tutorials, and guides about video downloading, conversion, and more
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search articles..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedTag === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(null)}
              className={selectedTag === null ? "bg-gradient-to-r from-purple-600 to-pink-600" : ""}
            >
              All
            </Button>
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
                className={selectedTag === tag ? "bg-gradient-to-r from-purple-600 to-pink-600" : ""}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBlogs.map((blog) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: blog.id * 0.1 }}
              >
                <Link href={`/blogs/${blog.slug}`}>
                  <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative h-48 w-full">
                      <Image src={blog.image || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {blog.date}
                        </div>
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {blog.author}
                        </div>
                      </div>
                      <h2 className="text-xl font-semibold mb-2 line-clamp-2">{blog.title}</h2>
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{blog.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.map((tag) => (
                          <span key={tag} className="inline-flex items-center text-xs bg-muted px-2 py-1 rounded-full">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="px-6 py-4 border-t bg-muted/50">
                      <span className="text-sm font-medium flex items-center">
                        Read more <ArrowRight className="h-4 w-4 ml-2" />
                      </span>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {filteredBlogs.length > 0 && (
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  )
}
