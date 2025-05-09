import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get("postId")
    const format = searchParams.get("format")
    const fileName = searchParams.get("fileName") || `instagram-post-${postId}.mp4`

    if (!postId) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 })
    }

    // For this demo, we'll simulate a file download with sample content
    const content = `This is a simulated direct download for Instagram post: ${postId}
Format: ${format}
    
In a real implementation, this would be the actual video/image content
streamed directly from Instagram to your device without storing it on our servers.
    
Thank you for using YTMate.in!
`

    // Set appropriate headers for file download
    const headers = new Headers()
    headers.set("Content-Disposition", `attachment; filename="${fileName}"`)

    // Set content type based on format
    if (format === "jpg-hd") {
      headers.set("Content-Type", "image/jpeg")
    } else {
      headers.set("Content-Type", "video/mp4")
    }

    headers.set("Content-Length", content.length.toString())

    return new NextResponse(content, {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error("Error streaming Instagram content:", error)
    return NextResponse.json({ error: "Failed to stream content" }, { status: 500 })
  }
}
