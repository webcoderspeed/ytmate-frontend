"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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
  Info,
  FileVideo,
  FileAudio,
  Loader2,
  AlertCircle,
} from "lucide-react"
import type { JSX } from "react"

import { api, BASE_URL } from "@/lib/api";

interface ToolInfo {
  id: string
  name: string
  description: string
  icon: JSX.Element
  apiEndpoint: string
  formats: {
    id: string
    name: string
    quality?: string
    type: "video" | "audio"
  }[]
  placeholder: string
}

interface PreviewData {
  title: string
  thumbnail: string
  duration: string
  downloadUrl?: string
  fileSize?: number
  format?: string
}

export default function ToolPage() {
  const { toolId } = useParams()
  const [url, setUrl] = useState("")
  const [format, setFormat] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [previewData, setPreviewData] = useState<PreviewData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const tools: Record<string, ToolInfo> = {
    youtube: {
      id: "youtube",
      name: "YouTube Downloader",
      description: "Download YouTube videos in MP4, MP3, HD, and 4K formats",
      icon: <Youtube className="h-8 w-8 text-red-500" />,
      apiEndpoint: "/api/youtube/download",
      formats: [
        { id: "mp4-360p", name: "MP4", quality: "360p", type: "video" },
        { id: "mp4-720p", name: "MP4", quality: "720p", type: "video" },
        { id: "mp4-1080p", name: "MP4", quality: "1080p", type: "video" },
        { id: "mp4-4k", name: "MP4", quality: "4K", type: "video" },
        { id: "mp3-128", name: "MP3", quality: "128 kbps", type: "audio" },
        { id: "mp3-320", name: "MP3", quality: "320 kbps", type: "audio" },
      ],
      placeholder: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    instagram: {
      id: "instagram",
      name: "Instagram Downloader",
      description: "Download Instagram reels, stories, and posts in high quality",
      icon: <Instagram className="h-8 w-8 text-pink-500" />,
      apiEndpoint: "/api/instagram/download",
      formats: [
        { id: "mp4-hd", name: "MP4", quality: "HD", type: "video" },
        { id: "mp4-sd", name: "MP4", quality: "SD", type: "video" },
        { id: "jpg-hd", name: "JPG", quality: "HD", type: "video" },
      ],
      placeholder: "https://www.instagram.com/p/CxxxxXXXXXX/",
    },
    facebook: {
      id: "facebook",
      name: "Facebook Downloader",
      description: "Download Facebook videos, reels, and stories easily",
      icon: <Facebook className="h-8 w-8 text-blue-500" />,
      apiEndpoint: "/api/facebook/download",
      formats: [
        { id: "mp4-hd", name: "MP4", quality: "HD", type: "video" },
        { id: "mp4-sd", name: "MP4", quality: "SD", type: "video" },
        { id: "mp3", name: "MP3", type: "audio" },
      ],
      placeholder: "https://www.facebook.com/watch?v=xxxxxxxxxx",
    },
    x: {
      id: "x",
      name: "X (Twitter) Downloader",
      description: "Save videos and GIFs from tweets",
      icon: <Twitter className="h-8 w-8 text-sky-500" />,
      apiEndpoint: "/api/x/download",
      formats: [
        { id: "mp4", name: "MP4", type: "video" },
        { id: "gif", name: "GIF", type: "video" },
      ],
      placeholder: "https://twitter.com/username/status/xxxxxxxxxx",
    },
    vimeo: {
      id: "vimeo",
      name: "Vimeo Downloader",
      description: "Download Vimeo videos in multiple formats",
      icon: <Vimeo className="h-8 w-8 text-cyan-500" />,
      apiEndpoint: "/api/vimeo/download",
      formats: [
        { id: "mp4-sd", name: "MP4", quality: "SD", type: "video" },
        { id: "mp4-hd", name: "MP4", quality: "HD", type: "video" },
        { id: "mp4-4k", name: "MP4", quality: "4K", type: "video" },
        { id: "mp3", name: "MP3", type: "audio" },
      ],
      placeholder: "https://vimeo.com/xxxxxxxxx",
    },
    "audio-converter": {
      id: "audio-converter",
      name: "Audio Converter",
      description: "Convert to MP3, AAC, WAV, and more",
      icon: <Music className="h-8 w-8 text-purple-500" />,
      apiEndpoint: "/api/audio-converter/convert",
      formats: [
        { id: "mp3-128", name: "MP3", quality: "128 kbps", type: "audio" },
        { id: "mp3-320", name: "MP3", quality: "320 kbps", type: "audio" },
        { id: "aac", name: "AAC", type: "audio" },
        { id: "wav", name: "WAV", type: "audio" },
        { id: "ogg", name: "OGG", type: "audio" },
      ],
      placeholder: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    "video-quality": {
      id: "video-quality",
      name: "HD/4K Converter",
      description: "Convert videos to HD and 4K quality",
      icon: <Video className="h-8 w-8 text-emerald-500" />,
      apiEndpoint: "/api/video-quality/convert",
      formats: [
        { id: "mp4-720p", name: "MP4", quality: "720p", type: "video" },
        { id: "mp4-1080p", name: "MP4", quality: "1080p", type: "video" },
        { id: "mp4-1440p", name: "MP4", quality: "1440p", type: "video" },
        { id: "mp4-4k", name: "MP4", quality: "4K", type: "video" },
      ],
      placeholder: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  }

  const currentTool = tools[toolId as string] || tools.youtube

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0)
  }, [toolId]) // Re-run when toolId changes

  useEffect(() => {
    if (currentTool.formats.length > 0) {
      setFormat(currentTool.formats[0].id)
    }
  }, [currentTool.formats])

  useEffect(() => {
    setPreviewData(null)
    setError(null)
  }, [toolId])

  // Set URL from query param only on initial mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlParam = params.get("url")
    if (urlParam) {
      setUrl(urlParam)
      setTimeout(() => {
        const submitEvent = new Event("submit", { cancelable: true, bubbles: true })
        document.querySelector("form")?.dispatchEvent(submitEvent)
      }, 500)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!url) return

    setIsLoading(true)
    setError(null)

    try {
      // Use the new /info endpoint to get video info and download URL
      const params: Record<string, string> = {
        platform: toolId as string,
        url,
      };

      // For audio/video converters, backend expects 'format' param
      if (
        [
          "youtube",
          "facebook",
          "instagram",
          "vimeo",
          "x",
          "video-quality",
        ].includes(toolId as string)
      ) {
        params.format = format;
      }
      // For audio-converter, also send bitrate if needed (example: parse from format id)
      if (toolId === "audio-converter") {
        const [fmt, bitrate] = format.split("-");
        params.format = fmt;
        params.bitrate = bitrate ? `${bitrate}k` : "128k";
      }

      const {data} = await api.get("/info", { params });


      setPreviewData({
        title: data?.title,
        thumbnail: data?.thumbnail,
        duration: data?.duration,
        downloadUrl: data?.downloadUrl,
        fileSize: data?.fileSize,
        format: data?.format,
      });
    } catch (error: any) {
      console.error("Error fetching video info:", error)
      setError(
        error?.response?.data?.detail ||
        error?.response?.data?.error ||
        error?.message ||
        "An unexpected error occurred"
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = async () => {
    if (!previewData?.downloadUrl) return

    setIsLoading(true)

    try {
      const link = document.createElement("a")
      link.href = `${BASE_URL}${previewData.downloadUrl}`
      link.setAttribute("download", "")
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error downloading:", error)
      setError("Failed to start download")
    } finally {
      setIsLoading(false)
    }
  }

  // Format file size to human-readable format
  const formatFileSize = (bytes: number | undefined): string => {
    if (!bytes) return "Unknown size"

    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB"
    else if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + " MB"
    else return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB"
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center mb-8">
          <div className="p-3 rounded-full bg-primary/10 mr-4">{currentTool.icon}</div>
          <div>
            <h1 className="text-3xl font-bold">{currentTool.name}</h1>
            <p className="text-muted-foreground">{currentTool.description}</p>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Download {currentTool.name.split(" ")[0]} Content</CardTitle>
            <CardDescription>Paste the URL of the content you want to download</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="url"
                  placeholder={currentTool.placeholder}
                  className="pl-10"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/2">
                  <label htmlFor="format" className="block text-sm font-medium mb-2">
                    Format
                  </label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentTool.formats.map((fmt) => (
                        <SelectItem key={fmt.id} value={fmt.id}>
                          {fmt.type === "video" ? (
                            <FileVideo className="inline-block mr-2 h-4 w-4" />
                          ) : (
                            <FileAudio className="inline-block mr-2 h-4 w-4" />
                          )}
                          {fmt.name} {fmt.quality ? `(${fmt.quality})` : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-full sm:w-1/2 flex items-end">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Info className="mr-2 h-4 w-4" />
                        Get Info
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
            {previewData && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="mt-6 p-4 border rounded-lg"
              >
                <h3 className="font-semibold mb-3">{previewData.title}</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="sm:w-1/3">
                    <img
                      src={`${BASE_URL}proxy?url=${encodeURIComponent(previewData.thumbnail)}`}
                      alt={previewData.title}
                      className="w-full rounded-md"
                    />
                  </div>
                  <div className="sm:w-2/3 flex flex-col justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Duration: {previewData.duration}</p>
                      <p className="text-sm text-muted-foreground mb-2">
                        Format: {currentTool.formats.find((f) => f.id === previewData.format)?.name}
                        {currentTool.formats.find((f) => f.id === previewData.format)?.quality
                          ? ` (${currentTool.formats.find((f) => f.id === previewData.format)?.quality})`
                          : ""}
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        File Size: {formatFileSize(previewData.fileSize)}
                      </p>
                    </div>
                    <Button
                      onClick={handleDownload}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Downloading...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Download Now
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col text-sm text-muted-foreground">
            <div className="flex items-start space-x-2">
              <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>
                This tool allows you to download {currentTool.name.toLowerCase()} in various formats. We do not store
                any downloaded content on our servers. All processing is done in real-time.
              </p>
            </div>
          </CardFooter>
        </Card>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">How to use {currentTool.name}</h2>
          <ol className="list-decimal list-inside space-y-3 ml-4">
            <li className="text-muted-foreground">
              <span className="text-foreground font-medium">Copy the URL</span> - Go to{" "}
              {currentTool.id === "youtube"
                ? "YouTube"
                : currentTool.id === "instagram"
                  ? "Instagram"
                  : currentTool.id === "facebook"
                    ? "Facebook"
                    : currentTool.id === "x"
                      ? "X (Twitter)"
                      : "the website"}{" "}
              and copy the URL of the video you want to download.
            </li>
            <li className="text-muted-foreground">
              <span className="text-foreground font-medium">Paste the URL</span> - Paste the URL in the input field
              above.
            </li>
            <li className="text-muted-foreground">
              <span className="text-foreground font-medium">Select format</span> - Choose your preferred format and
              quality from the dropdown menu.
            </li>
            <li className="text-muted-foreground">
              <span className="text-foreground font-medium">Get info</span> - Click the "Get Info" button to fetch the
              video information.
            </li>
            <li className="text-muted-foreground">
              <span className="text-foreground font-medium">Download</span> - Click the "Download Now" button to start
              the download.
            </li>
          </ol>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Fast & Reliable</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our servers process your download requests in real-time, ensuring fast and reliable downloads.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">High Quality</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Download videos in the highest quality available, including HD and 4K options when available.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Free to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                All our tools are completely free to use with no registration required. No hidden fees or limitations.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
