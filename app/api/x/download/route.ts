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
    if (!url.includes("twitter.com") && !url.includes("x.com")) {
      return NextResponse.json({ error: "Invalid X (Twitter) URL" }, { status: 400 })
    }

    // Extract tweet ID from URL
    const tweetId = url.includes("status/")
      ? url.split("status/")[1].split("?")[0]
      : url.split("/").pop()?.split("?")[0]

    // Simulate video info
    const videoInfo = {
      title: `X (Twitter) Video - Tweet ${tweetId}`,
      duration: "1:20",
      thumbnail: `/placeholder.svg?height=400&width=600&query=twitter video ${tweetId}`,
      author: "X User",
    }

    // Generate a unique download ID
    const downloadId = uuidv4()
    const fileExtension = format === "gif" ? "gif" : "mp4"
    const fileName = `x-${tweetId}-${format}.${fileExtension}`

    // Create a direct download URL
    const downloadUrl = `/api/stream/x?tweetId=${tweetId}&format=${format}&fileName=${encodeURIComponent(fileName)}`

    // Determine file size (simulated)
    const fileSize = Math.floor(Math.random() * 8000000) + 1000000 // Random file size between 1-9MB

    return NextResponse.json({
      success: true,
      downloadUrl,
      videoInfo,
      format,
      fileSize,
    })
  } catch (error) {
    console.error("Error processing X (Twitter) video:", error)
    return NextResponse.json({ error: "Failed to process video" }, { status: 500 })
  }
}
