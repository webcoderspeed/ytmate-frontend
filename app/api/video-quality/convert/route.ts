import { type NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { url, format } = data

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Extract video ID or identifier from URL
    let sourceId = ""
    let sourcePlatform = ""

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      sourcePlatform = "YouTube"
      sourceId = url.includes("v=") ? url.split("v=")[1].split("&")[0] : url.split("/").pop() || ""
    } else if (url.includes("instagram.com")) {
      sourcePlatform = "Instagram"
      sourceId = url.includes("/p/") ? url.split("/p/")[1].split("/")[0] : url.split("/").pop() || ""
    } else if (url.includes("facebook.com") || url.includes("fb.com")) {
      sourcePlatform = "Facebook"
      sourceId = url.includes("videos") ? url.split("videos/")[1].split("/")[0] : url.split("/").pop() || ""
    } else {
      sourcePlatform = "Unknown"
      sourceId = url.split("/").pop() || ""
    }

    // Determine quality from format
    let quality = "720p"
    if (format === "mp4-1080p") quality = "1080p"
    if (format === "mp4-1440p") quality = "1440p"
    if (format === "mp4-4k") quality = "4K"

    // Simulate video info
    const videoInfo = {
      title: `${quality} Video from ${sourcePlatform} - ${sourceId}`,
      duration: "3:45",
      thumbnail: `/placeholder.svg?height=400&width=600&query=${quality} video ${sourceId}`,
      author: `${sourcePlatform} Creator`,
    }

    // Generate a unique download ID
    const downloadId = uuidv4()
    const fileName = `video-${quality}-${sourcePlatform.toLowerCase()}-${sourceId}.mp4`

    // Create a direct download URL
    const downloadUrl = `/api/stream/video-quality?sourceId=${sourceId}&sourcePlatform=${sourcePlatform}&quality=${quality}&format=${format}&fileName=${encodeURIComponent(fileName)}`

    // Determine file size based on quality (simulated)
    let fileSize = 0
    if (format === "mp4-720p")
      fileSize = Math.floor(Math.random() * 50000000) + 20000000 // 20-70MB
    else if (format === "mp4-1080p")
      fileSize = Math.floor(Math.random() * 100000000) + 50000000 // 50-150MB
    else if (format === "mp4-1440p")
      fileSize = Math.floor(Math.random() * 200000000) + 100000000 // 100-300MB
    else if (format === "mp4-4k") fileSize = Math.floor(Math.random() * 500000000) + 200000000 // 200-700MB

    return NextResponse.json({
      success: true,
      downloadUrl,
      videoInfo,
      format,
      fileSize,
    })
  } catch (error) {
    console.error("Error converting video quality:", error)
    return NextResponse.json({ error: "Failed to convert video" }, { status: 500 })
  }
}
