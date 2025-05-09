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

    // Simulate audio info
    const audioInfo = {
      title: `Audio from ${sourcePlatform} - ${sourceId}`,
      duration: "4:30",
      thumbnail: `/placeholder.svg?height=400&width=400&query=audio waveform ${sourceId}`,
      author: `${sourcePlatform} Creator`,
    }

    // Generate a unique download ID
    const downloadId = uuidv4()

    // Determine file extension based on format
    let fileExt = ".mp3"
    if (format === "aac") fileExt = ".aac"
    if (format === "wav") fileExt = ".wav"
    if (format === "ogg") fileExt = ".ogg"

    const fileName = `audio-${sourcePlatform.toLowerCase()}-${sourceId}${fileExt}`

    // Create a direct download URL
    const downloadUrl = `/api/stream/audio?sourceId=${sourceId}&sourcePlatform=${sourcePlatform}&format=${format}&fileName=${encodeURIComponent(fileName)}`

    // Determine file size based on format (simulated)
    let fileSize = 0
    if (format.includes("mp3-128"))
      fileSize = Math.floor(Math.random() * 5000000) + 1000000 // 1-6MB
    else if (format.includes("mp3-320"))
      fileSize = Math.floor(Math.random() * 10000000) + 3000000 // 3-13MB
    else if (format === "wav")
      fileSize = Math.floor(Math.random() * 50000000) + 20000000 // 20-70MB (WAV is large)
    else fileSize = Math.floor(Math.random() * 8000000) + 2000000 // 2-10MB for other formats

    return NextResponse.json({
      success: true,
      downloadUrl,
      audioInfo,
      format,
      fileSize,
    })
  } catch (error) {
    console.error("Error converting audio:", error)
    return NextResponse.json({ error: "Failed to convert audio" }, { status: 500 })
  }
}
