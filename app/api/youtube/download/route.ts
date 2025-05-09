import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { url, format } = data

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Validate URL (basic check)
    if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
      return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 })
    }

    // Extract video ID from URL
    const videoId = url.includes("v=")
      ? url.split("v=")[1].split("&")[0]
      : url.includes("youtu.be/")
        ? url.split("youtu.be/")[1].split("?")[0]
        : url.split("/").pop()

    try {
      // In a production environment, you would use a compatible library or service
      // to fetch the actual video metadata from YouTube

      // For this demo, we'll use the YouTube oEmbed API to get basic video info
      // This API is public and doesn't require authentication
      const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`

      const response = await fetch(oembedUrl)

      if (!response.ok) {
        throw new Error("Failed to fetch video information")
      }

      const oembedData = await response.json()

      // Get basic video details from oembed
      const title = oembedData.title
      const author = oembedData.author_name

      // For thumbnail, we can construct it directly from the video ID
      const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

      // Simulate duration and file size since oembed doesn't provide these
      const duration = "3:45" // Placeholder duration

      // Determine file size based on format (simulated)
      let fileSize = 0
      if (format === "mp4-360p")
        fileSize = 15000000 // ~15MB
      else if (format === "mp4-720p")
        fileSize = 45000000 // ~45MB
      else if (format === "mp4-1080p")
        fileSize = 90000000 // ~90MB
      else if (format === "mp4-4k")
        fileSize = 250000000 // ~250MB
      else if (format === "mp3-128")
        fileSize = 5000000 // ~5MB
      else if (format === "mp3-320")
        fileSize = 12000000 // ~12MB
      else fileSize = 30000000 // Default size

      // Create a proper file name based on video title
      const sanitizedTitle = title
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .toLowerCase()
      const fileExtension = format.includes("mp3") ? "mp3" : "mp4"
      const fileName = `${sanitizedTitle}-${videoId}.${fileExtension}`

      // Create a direct download URL
      const downloadUrl = `/api/stream/youtube?videoId=${videoId}&format=${format}&fileName=${encodeURIComponent(fileName)}`

      // Return the video info and direct download URL
      return NextResponse.json({
        success: true,
        videoInfo: {
          title,
          duration,
          thumbnail,
          author,
        },
        downloadUrl,
        format,
        fileSize,
      })
    } catch (error) {
      console.error("Error fetching YouTube video info:", error)

      // Fallback to simulated data if we can't fetch the real info
      const title = `YouTube Video - ${videoId}`
      const duration = "3:45"
      const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      const author = "YouTube Creator"

      // Determine file size based on format (simulated)
      let fileSize = 0
      if (format === "mp4-360p")
        fileSize = 15000000 // ~15MB
      else if (format === "mp4-720p")
        fileSize = 45000000 // ~45MB
      else if (format === "mp4-1080p")
        fileSize = 90000000 // ~90MB
      else if (format === "mp4-4k")
        fileSize = 250000000 // ~250MB
      else if (format === "mp3-128")
        fileSize = 5000000 // ~5MB
      else if (format === "mp3-320")
        fileSize = 12000000 // ~12MB
      else fileSize = 30000000 // Default size

      const fileName = `youtube-${videoId}-${format}.${format.includes("mp3") ? "mp3" : "mp4"}`
      const downloadUrl = `/api/stream/youtube?videoId=${videoId}&format=${format}&fileName=${encodeURIComponent(fileName)}`

      return NextResponse.json({
        success: true,
        videoInfo: {
          title,
          duration,
          thumbnail,
          author,
        },
        downloadUrl,
        format,
        fileSize,
      })
    }
  } catch (error) {
    console.error("Error processing YouTube video:", error)
    return NextResponse.json(
      {
        error: "Failed to process video",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
