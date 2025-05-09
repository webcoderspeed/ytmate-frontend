"use client"

import { Input } from "@/components/ui/input"

import { CardContent } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Calendar, User, Tag, Facebook, Twitter, Linkedin, Copy, ArrowLeft, MessageCircle } from "lucide-react"
import { useEffect } from "react"

// Mock blog data
const blogs = [
  {
    id: 1,
    slug: "how-to-download-youtube-videos",
    title: "How to Download YouTube Videos in 2023",
    content: `
      <p>YouTube is the world's largest video platform with billions of videos available for streaming. Sometimes, you might want to download a video for offline viewing or to use in a project. In this guide, we'll show you how to download YouTube videos easily using YTMate.in.</p>
      
      <h2>Why Download YouTube Videos?</h2>
      <p>There are several reasons why you might want to download YouTube videos:</p>
      <ul>
        <li>Watch videos offline when you don't have an internet connection</li>
        <li>Save educational content for future reference</li>
        <li>Use clips in presentations or projects (respecting copyright laws)</li>
        <li>Create backups of your own uploaded content</li>
      </ul>
      
      <h2>Step 1: Copy the YouTube Video URL</h2>
      <p>First, navigate to the YouTube video you want to download. In your browser's address bar, select the entire URL and copy it (Ctrl+C or Command+C).</p>
      
      <h2>Step 2: Paste the URL in YTMate.in</h2>
      <p>Go to YTMate.in and paste the URL in the input field on the homepage or navigate to the YouTube Downloader tool specifically.</p>
      
      <h2>Step 3: Select Your Preferred Format and Quality</h2>
      <p>After pasting the URL, click on "Get Info" to fetch the video details. You'll see various format options:</p>
      <ul>
        <li>MP4 (360p, 720p, 1080p, 4K) - For video with audio</li>
        <li>MP3 (128kbps, 320kbps) - For audio only</li>
      </ul>
      <p>Choose the format that best suits your needs. Higher quality videos will have larger file sizes.</p>
      
      <h2>Step 4: Download the Video</h2>
      <p>Click the "Download Now" button to start the download process. Depending on your browser settings, the file will either start downloading automatically or you'll be prompted to choose a save location.</p>
      
      <h2>Legal Considerations</h2>
      <p>It's important to note that downloading YouTube videos may violate YouTube's Terms of Service. You should only download videos that:</p>
      <ul>
        <li>You have permission to download</li>
        <li>Are in the public domain</li>
        <li>Are your own content</li>
        <li>Are being downloaded for fair use purposes (varies by country)</li>
      </ul>
      <p>Always respect copyright laws and content creators' rights.</p>
      
      <h2>Alternative Methods</h2>
      <p>Besides using YTMate.in, there are other ways to download YouTube videos:</p>
      <ul>
        <li>YouTube Premium - Offers official offline viewing within the YouTube app</li>
        <li>Desktop software - Programs like 4K Video Downloader</li>
        <li>Browser extensions - Various extensions for Chrome, Firefox, etc.</li>
      </ul>
      <p>However, YTMate.in offers the advantage of being a web-based solution with no software installation required.</p>
      
      <h2>Conclusion</h2>
      <p>Downloading YouTube videos with YTMate.in is a straightforward process that takes just a few clicks. Remember to use this capability responsibly and respect content creators' rights.</p>
      
      <p>For more tutorials on downloading content from other platforms, check out our other guides on Instagram, Facebook, and X (Twitter) downloads.</p>
    `,
    image: "/placeholder.svg?key=bx2r3",
    date: "May 15, 2023",
    author: "Rahul Sharma",
    tags: ["YouTube", "Download", "Tutorial"],
    relatedPosts: [2, 3, 6],
  },
  {
    id: 2,
    slug: "instagram-reels-downloader-guide",
    title: "Complete Guide to Downloading Instagram Reels",
    content: `
      <p>Instagram Reels have become incredibly popular for short-form video content. Sometimes you might want to save these videos to your device for offline viewing or to use in your own projects. This guide will show you how to download Instagram Reels using YTMate.in.</p>
      
      <h2>Why Download Instagram Reels?</h2>
      <p>There are several reasons why you might want to download Instagram Reels:</p>
      <ul>
        <li>Save entertaining content for offline viewing</li>
        <li>Create a collection of inspiration for your own content</li>
        <li>Use clips in presentations or projects (with proper attribution)</li>
        <li>Backup your own Reels content</li>
      </ul>
      
      <h2>Step 1: Find the Instagram Reel URL</h2>
      <p>First, locate the Reel you want to download on Instagram. Tap on the three dots (⋯) in the bottom right of the Reel and select "Copy Link".</p>
      
      <h2>Step 2: Paste the URL in YTMate.in</h2>
      <p>Go to YTMate.in and navigate to the Instagram Downloader tool. Paste the copied URL in the input field.</p>
      
      <h2>Step 3: Download the Reel</h2>
      <p>Click on "Get Info" to fetch the video details. Once processed, you'll see a preview of the Reel. Click the "Download Now" button to save the Reel to your device.</p>
      
      <h2>Legal Considerations</h2>
      <p>When downloading Instagram Reels, keep in mind:</p>
      <ul>
        <li>Respect copyright and intellectual property rights</li>
        <li>Don't claim others' content as your own</li>
        <li>If you plan to reuse content, always get permission from the creator</li>
        <li>Be aware that downloading content may violate Instagram's Terms of Service</li>
      </ul>
      
      <h2>Tips for Downloading Instagram Reels</h2>
      <ul>
        <li>Make sure the account is public - private account content cannot be downloaded</li>
        <li>For best quality, choose the HD option when available</li>
        <li>If you're downloading your own content, consider using Instagram's built-in save feature</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>YTMate.in makes it easy to download Instagram Reels with just a few clicks. Remember to use this tool responsibly and respect content creators' rights.</p>
      
      <p>For more tutorials on downloading content from other platforms, check out our guides on YouTube, Facebook, and X (Twitter) downloads.</p>
    `,
    image: "/placeholder.svg?key=pwa44",
    date: "June 22, 2023",
    author: "Priya Patel",
    tags: ["Instagram", "Reels", "Social Media"],
    relatedPosts: [1, 4, 6],
  },
  {
    id: 3,
    slug: "convert-videos-to-mp3",
    title: "How to Convert Videos to MP3 Audio Files",
    content: `
      <p>Converting videos to MP3 audio files is useful when you want to extract just the audio portion of a video. This guide will show you how to easily convert videos to MP3 format using YTMate.in's Audio Converter tool.</p>
      
      <h2>Why Convert Videos to MP3?</h2>
      <p>There are many reasons why you might want to extract audio from videos:</p>
      <ul>
        <li>Create a music playlist from music videos</li>
        <li>Extract audio from lectures or educational content</li>
        <li>Save storage space compared to keeping the full video</li>
        <li>Create podcasts from video interviews</li>
        <li>Extract audio for editing or remixing purposes</li>
      </ul>
      
      <h2>Step 1: Get the Video URL</h2>
      <p>First, find the video you want to convert. This could be from YouTube, Facebook, or any other supported platform. Copy the URL of the video.</p>
      
      <h2>Step 2: Use YTMate.in's Audio Converter</h2>
      <p>Go to YTMate.in and navigate to the Audio Converter tool. Paste the video URL in the input field.</p>
      
      <h2>Step 3: Select Audio Format and Quality</h2>
      <p>After pasting the URL, click on "Get Info" to fetch the video details. Then select your preferred audio format and quality:</p>
      <ul>
        <li>MP3 (128kbps) - Good quality, smaller file size</li>
        <li>MP3 (320kbps) - High quality, larger file size</li>
        <li>AAC - Alternative high-quality format</li>
        <li>WAV - Lossless audio, very large file size</li>
        <li>OGG - Open source format, good compression</li>
      </ul>
      
      <h2>Step 4: Convert and Download</h2>
      <p>Click the "Download Now" button to start the conversion process. The tool will extract the audio, convert it to your chosen format, and provide a download link.</p>
      
      <h2>Tips for Best Results</h2>
      <ul>
        <li>Choose the right quality for your needs - 128kbps is sufficient for most casual listening</li>
        <li>For music, consider using 320kbps for better audio quality</li>
        <li>WAV format provides the highest quality but creates very large files</li>
        <li>Make sure the original video has good audio quality for the best results</li>
      </ul>
      
      <h2>Legal Considerations</h2>
      <p>When converting videos to MP3, remember:</p>
      <ul>
        <li>Only convert content you have the right to use</li>
        <li>Converting copyrighted music videos may violate copyright laws</li>
        <li>Always respect intellectual property rights</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>YTMate.in's Audio Converter makes it easy to extract MP3 audio from videos with just a few clicks. This tool is perfect for creating audio playlists, saving lecture audio, or extracting soundtracks from videos.</p>
      
      <p>For more tutorials on downloading and converting content, check out our other guides on YouTube, Instagram, and Facebook downloads.</p>
    `,
    image: "/placeholder.svg?key=fkxnm",
    date: "July 10, 2023",
    author: "Amit Kumar",
    tags: ["Audio", "Conversion", "MP3"],
    relatedPosts: [1, 5],
  },
  {
    id: 4,
    slug: "download-facebook-videos",
    title: "The Ultimate Guide to Downloading Facebook Videos",
    content: `
      <p>Facebook is full of interesting videos that you might want to save for offline viewing. This comprehensive guide will show you how to download Facebook videos using YTMate.in.</p>
      
      <h2>Why Download Facebook Videos?</h2>
      <p>There are several reasons why you might want to download videos from Facebook:</p>
      <ul>
        <li>Save videos to watch offline when you don't have internet access</li>
        <li>Keep a copy of important memories or family videos</li>
        <li>Use content in presentations (with proper permissions)</li>
        <li>Create backups of your own uploaded videos</li>
      </ul>
      
      <h2>Step 1: Find the Facebook Video URL</h2>
      <p>First, locate the video you want to download on Facebook. Click on the video to open it in theater mode or its dedicated page. Then copy the URL from your browser's address bar.</p>
      
      <h2>Step 2: Use YTMate.in's Facebook Downloader</h2>
      <p>Go to YTMate.in and navigate to the Facebook Downloader tool. Paste the copied URL in the input field.</p>
      
      <h2>Step 3: Select Video Quality</h2>
      <p>After pasting the URL, click on "Get Info" to fetch the video details. You'll see options for different quality levels:</p>
      <ul>
        <li>SD (Standard Definition) - Smaller file size, lower quality</li>
        <li>HD (High Definition) - Larger file size, better quality</li>
      </ul>
      <p>You may also have the option to download just the audio in MP3 format.</p>
      
      <h2>Step 4: Download the Video</h2>
      <p>Click the "Download Now" button to start the download process. The video will be saved to your device in your chosen format and quality.</p>
      
      <h2>Downloading Different Types of Facebook Videos</h2>
      <p>YTMate.in can help you download various types of Facebook videos:</p>
      <ul>
        <li>Regular feed videos</li>
        <li>Facebook Watch videos</li>
        <li>Facebook Live videos (after they've ended)</li>
        <li>Facebook Stories (while they're still available)</li>
        <li>Facebook Reels</li>
      </ul>
      
      <h2>Legal Considerations</h2>
      <p>When downloading Facebook videos, keep in mind:</p>
      <ul>
        <li>Only download videos that you have permission to use</li>
        <li>Respect copyright and intellectual property rights</li>
        <li>Don't claim others' content as your own</li>
        <li>Be aware that downloading content may violate Facebook's Terms of Service</li>
      </ul>
      
      <h2>Troubleshooting Tips</h2>
      <ul>
        <li>Make sure the video is public or from a page you can access</li>
        <li>Some videos may be protected and cannot be downloaded</li>
        <li>If a URL doesn't work, try refreshing the page and copying it again</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>YTMate.in provides a simple and effective way to download Facebook videos for offline viewing. Remember to use this tool responsibly and respect content creators' rights.</p>
      
      <p>For more tutorials on downloading content from other platforms, check out our guides on YouTube, Instagram, and X (Twitter) downloads.</p>
    `,
    image: "/facebook-video-player-interface.png",
    date: "August 5, 2023",
    author: "Neha Singh",
    tags: ["Facebook", "Download", "Social Media"],
    relatedPosts: [1, 2, 6],
  },
  {
    id: 5,
    slug: "best-video-formats-explained",
    title: "Video Formats Explained: Which One Should You Choose?",
    content: `
      <p>With so many video formats available, it can be confusing to know which one to choose for your specific needs. This guide explains the most common video formats and helps you decide which one is best for different situations.</p>
      
      <h2>Common Video Formats</h2>
      
      <h3>MP4 (MPEG-4 Part 14)</h3>
      <p>MP4 is one of the most widely used video formats today.</p>
      <ul>
        <li><strong>Pros:</strong> Excellent compatibility across devices and platforms, good compression, maintains quality</li>
        <li><strong>Cons:</strong> Not the most efficient for very high-quality videos</li>
        <li><strong>Best for:</strong> General purpose videos, social media, streaming</li>
      </ul>
      
      <h3>WebM</h3>
      <p>WebM is an open-source format developed by Google.</p>
      <ul>
        <li><strong>Pros:</strong> Excellent compression, high quality at smaller file sizes</li>
        <li><strong>Cons:</strong> Not as widely supported as MP4</li>
        <li><strong>Best for:</strong> Web videos, HTML5 video players</li>
      </ul>
      
      <h3>AVI (Audio Video Interleave)</h3>
      <p>AVI is an older format developed by Microsoft.</p>
      <ul>
        <li><strong>Pros:</strong> High quality, widely compatible with Windows</li>
        <li><strong>Cons:</strong> Large file sizes, less compatible with mobile devices</li>
        <li><strong>Best for:</strong> Archiving, high-quality storage when space isn't an issue</li>
      </ul>
      
      <h3>MOV</h3>
      <p>MOV is Apple's QuickTime file format.</p>
      <ul>
        <li><strong>Pros:</strong> High quality, good for editing</li>
        <li><strong>Cons:</strong> Larger file sizes, best compatibility on Apple devices</li>
        <li><strong>Best for:</strong> Video editing, Apple ecosystem</li>
      </ul>
      
      <h3>MKV (Matroska Video)</h3>
      <p>MKV is a flexible, open-standard container format.</p>
      <ul>
        <li><strong>Pros:</strong> Can contain almost any codec, supports multiple audio tracks and subtitles</li>
        <li><strong>Cons:</strong> Not as widely supported on mobile devices and some media players</li>
        <li><strong>Best for:</strong> High-definition videos, movies with multiple audio tracks or subtitles</li>
      </ul>
      
      <h2>Choosing the Right Format</h2>
      
      <h3>For Social Media</h3>
      <p>MP4 is generally the best choice for social media platforms. It offers good quality with reasonable file sizes and is supported by all major platforms including YouTube, Instagram, Facebook, and Twitter.</p>
      
      <h3>For Archiving</h3>
      <p>If you're archiving videos for long-term storage and quality is paramount, consider using:</p>
      <ul>
        <li>MKV for videos with multiple audio tracks or subtitles</li>
        <li>AVI for simple, high-quality storage</li>
        <li>Uncompressed formats for professional archiving (though these create extremely large files)</li>
      </ul>
      
      <h3>For Mobile Devices</h3>
      <p>MP4 is the most universally compatible format for mobile devices. It works well on both iOS and Android and offers a good balance of quality and file size.</p>
      
      <h3>For Video Editing</h3>
      <p>When working with video editing software:</p>
      <ul>
        <li>MOV works well with Apple's Final Cut Pro</li>
        <li>MP4 is compatible with most editing software</li>
        <li>Some professional editors prefer working with ProRes or DNxHD codecs</li>
      </ul>
      
      <h2>Video Codecs vs. Containers</h2>
      <p>It's important to understand the difference between video codecs and containers:</p>
      <ul>
        <li><strong>Container:</strong> The file format (MP4, MKV, AVI, etc.) that holds the video, audio, and metadata</li>
        <li><strong>Codec:</strong> The compression/decompression algorithm used (H.264, H.265/HEVC, VP9, etc.)</li>
      </ul>
      <p>For example, an MP4 file (container) might use H.264 (codec) for video compression.</p>
      
      <h2>Using YTMate.in for Format Conversion</h2>
      <p>YTMate.in's tools can help you convert videos between different formats. When downloading videos, you can choose your preferred format based on your needs.</p>
      
      <h2>Conclusion</h2>
      <p>For most general purposes, MP4 is the safest choice due to its wide compatibility and good balance of quality and file size. However, depending on your specific needs, other formats might be more appropriate.</p>
      
      <p>When in doubt, consider what you'll be using the video for and which devices you'll be playing it on to make the best choice.</p>
    `,
    image: "/video-format-icons.png",
    date: "September 18, 2023",
    author: "Vikram Mehta",
    tags: ["Video", "Formats", "Guide"],
    relatedPosts: [1, 3],
  },
  {
    id: 6,
    slug: "download-twitter-videos",
    title: "How to Download Videos from X (Twitter)",
    content: `
      <p>X (formerly Twitter) is a platform where users share short videos, GIFs, and clips. If you want to save these videos to your device, this guide will show you how to download videos from X using YTMate.in.</p>
      
      <h2>Why Download Videos from X?</h2>
      <p>There are several reasons why you might want to download videos from X:</p>
      <ul>
        <li>Save interesting or educational content for offline viewing</li>
        <li>Keep a record of important announcements or news clips</li>
        <li>Use content in presentations or projects (with proper attribution)</li>
        <li>Create backups of your own posted videos</li>
      </ul>
      
      <h2>Step 1: Find the X Video URL</h2>
      <p>First, locate the tweet containing the video you want to download. Click on the tweet to open it in its own page. Then copy the URL from your browser's address bar.</p>
      
      <h2>Step 2: Use YTMate.in's X Downloader</h2>
      <p>Go to YTMate.in and navigate to the X (Twitter) Downloader tool. Paste the copied URL in the input field.</p>
      
      <h2>Step 3: Download Options</h2>
      <p>After pasting the URL, click on "Get Info" to fetch the video details. You'll typically have two options:</p>
      <ul>
        <li>MP4 - For downloading the video with audio</li>
        <li>GIF - For animated GIFs shared on the platform</li>
      </ul>
      
      <h2>Step 4: Download the Video</h2>
      <p>Click the "Download Now" button to start the download process. The video will be saved to your device in your chosen format.</p>
      
      <h2>Tips for Downloading X Videos</h2>
      <ul>
        <li>Make sure the tweet is public - protected or private account content cannot be downloaded</li>
        <li>Some videos may be lower quality due to X's compression</li>
        <li>For GIFs, you can choose to download as either a GIF or MP4 format</li>
      </ul>
      
      <h2>Legal Considerations</h2>
      <p>When downloading videos from X, keep in mind:</p>
      <ul>
        <li>Respect copyright and intellectual property rights</li>
        <li>Don't claim others' content as your own</li>
        <li>If you plan to reuse content, always get permission from the creator</li>
        <li>Be aware that downloading content may violate X's Terms of Service</li>
      </ul>
      
      <h2>Troubleshooting</h2>
      <ul>
        <li>If the download doesn't work, try refreshing the tweet page and copying the URL again</li>
        <li>Some embedded videos from other platforms may not be downloadable</li>
        <li>If a video is removed from X, it can no longer be downloaded</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>YTMate.in provides a simple and effective way to download videos from X (Twitter) for offline viewing. Remember to use this tool responsibly and respect content creators' rights.</p>
      
      <p>For more tutorials on downloading content from other platforms, check out our guides on YouTube, Instagram, and Facebook downloads.</p>
    `,
    image: "/twitter-video-player-smartphone.png",
    date: "October 30, 2023",
    author: "Rahul Sharma",
    tags: ["Twitter", "X", "Download"],
    relatedPosts: [1, 2, 4],
  },
]

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = blogs.find((blog) => blog.slug === slug)

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0)
  }, [slug]) // Re-run when slug changes

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/blogs">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const relatedPosts = post.relatedPosts.map((id) => blogs.find((blog) => blog.id === id)).filter(Boolean)

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <Link href="/blogs" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {post.date}
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {post.author}
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blogs?tag=${tag}`}
                  className="inline-flex items-center text-xs bg-muted px-2 py-1 rounded-full hover:bg-primary/10"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="relative h-[300px] md:h-[400px] w-full mb-8 rounded-lg overflow-hidden">
          <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        <div className="border-t border-b py-6 my-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">{post.author}</p>
                <p className="text-xs text-muted-foreground">Author</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">Share:</span>
              <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Share on Facebook</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Share on Twitter</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">Share on LinkedIn</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy link</span>
              </Button>
            </div>
          </div>
        </div>

        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost?.id} href={`/blogs/${relatedPost?.slug}`}>
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <div className="relative h-40 w-full">
                      <Image
                        src={relatedPost?.image || ""}
                        alt={relatedPost?.title || ""}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold line-clamp-2 mb-2">{relatedPost?.title}</h3>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {relatedPost?.date}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 p-6 border rounded-lg bg-muted/30">
          <h3 className="text-xl font-semibold mb-4">Leave a Comment</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <Input id="email" type="email" placeholder="Your email" />
              </div>
            </div>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium mb-1">
                Comment
              </label>
              <textarea
                id="comment"
                rows={4}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Write your comment here..."
              ></textarea>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <MessageCircle className="mr-2 h-4 w-4" /> Post Comment
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
