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
    if (!url.includes("vimeo.com")) {
      return NextResponse.json({ error: "Invalid Vimeo URL" }, { status: 400 })
    }

    // Extract video ID from URL
    const videoId = url.split("vimeo.com/")[1].split("/")[0].split("?")[0]

    // Simulate video info
    const videoInfo = {
      title: `Vimeo Video - ${videoId}`,
      duration: "5:45",
      thumbnail: `/placeholder.svg?height=400&width=600&query=vimeo video ${videoId}`,
      author: "Vimeo Creator",
    }

    // Generate a unique download ID
    const downloadId = uuidv4()
    const fileExtension = format.includes("mp3") ? "mp3" : "mp4"
    const fileName = `vimeo-${videoId}-${format}.${fileExtension}`

    // Create a direct download URL
    const downloadUrl = `/api/stream/vimeo?videoId=${videoId}&format=${format}&fileName=${encodeURIComponent(fileName)}`

    // Determine file size (simulated)
    const fileSize = Math.floor(Math.random() * 50000000) + 10000000 // Random file size between 10-60MB

    return NextResponse.json({
      success: true,
      downloadUrl,
      videoInfo,
      format,
      fileSize,
    })
  } catch (error) {
    console.error("Error processing Vimeo video:", error)
    return NextResponse.json({ error: "Failed to process video" }, { status: 500 })
  }
}
