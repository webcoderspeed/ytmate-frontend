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
    if (!url.includes("instagram.com")) {
      return NextResponse.json({ error: "Invalid Instagram URL" }, { status: 400 })
    }

    // Extract post ID from URL
    const postId = url.includes("/p/")
      ? url.split("/p/")[1].split("/")[0]
      : url.includes("/reel/")
        ? url.split("/reel/")[1].split("/")[0]
        : url.split("/").pop()

    // Simulate video info
    const videoInfo = {
      title: `Instagram ${url.includes("/reel/") ? "Reel" : "Post"} - ${postId}`,
      duration: "0:45",
      thumbnail: `/placeholder.svg?height=400&width=400&query=instagram post ${postId}`,
      author: "instagram_user",
    }

    // Generate a unique download ID
    const downloadId = uuidv4()
    const fileExtension = format === "jpg-hd" ? "jpg" : "mp4"
    const fileName = `instagram-${postId}-${format}.${fileExtension}`

    // Create a direct download URL
    const downloadUrl = `/api/stream/instagram?postId=${postId}&format=${format}&fileName=${encodeURIComponent(fileName)}`

    // Determine file size (simulated)
    const fileSize = Math.floor(Math.random() * 10000000) + 1000000 // Random file size between 1-10MB

    return NextResponse.json({
      success: true,
      downloadUrl,
      videoInfo,
      format,
      fileSize,
    })
  } catch (error) {
    console.error("Error processing Instagram content:", error)
    return NextResponse.json({ error: "Failed to process content" }, { status: 500 })
  }
}
