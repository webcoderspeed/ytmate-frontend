import { type NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { url, format } = data

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Validate URL (basic check)
    if (!url.includes("facebook.com") && !url.includes("fb.com")) {
      return NextResponse.json({ error: "Invalid Facebook URL" }, { status: 400 })
    }

    // Extract video ID from URL
    const videoId = url.includes("videos")
      ? url.split("videos/")[1].split("/")[0].split("?")[0]
      : url.includes("watch")
        ? url.split("v=")[1].split("&")[0]
        : url.split("/").pop()?.split("?")[0]

    // Simulate video info
    const videoInfo = {
      title: `Facebook Video - ${videoId}`,
      duration: "3:15",
      thumbnail: `/placeholder.svg?height=400&width=600&query=facebook video ${videoId}`,
      author: "Facebook User",
    }

    // Generate a unique download ID
    const downloadId = uuidv4()
    const fileExtension = format.includes("mp3") ? "mp3" : "mp4"
    const fileName = `facebook-${videoId}-${format}.${fileExtension}`

    // Create a direct download URL
    const downloadUrl = `/api/stream/facebook?videoId=${videoId}&format=${format}&fileName=${encodeURIComponent(fileName)}`

    // Determine file size (simulated)
    const fileSize = Math.floor(Math.random() * 20000000) + 5000000 // Random file size between 5-25MB

    return NextResponse.json({
      success: true,
      downloadUrl,
      videoInfo,
      format,
      fileSize,
    })
  } catch (error) {
    console.error("Error processing Facebook video:", error)
    return NextResponse.json({ error: "Failed to process video" }, { status: 500 })
  }
}
