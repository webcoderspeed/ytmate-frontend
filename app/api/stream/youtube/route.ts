import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const videoId = searchParams.get("videoId")
    const format = searchParams.get("format")
    const fileName = searchParams.get("fileName") || `youtube-video-${videoId}.mp4`

    if (!videoId) {
      return NextResponse.json({ error: "Video ID is required" }, { status: 400 })
    }

    // In a production environment, you would:
    // 1. Use a compatible library or service to get the direct video URL
    // 2. Use fetch to get the video content and stream it to the client
    // 3. Set appropriate headers for streaming

    // For this demo, we'll simulate a file download with sample content
    // since ytdl-core is not compatible with the Next.js environment in preview mode
    const content = `This is a simulated direct download for YouTube video: ${videoId}
Format: ${format}
    
In a real production environment, this would use a compatible library or service
to stream the actual video content directly to your device.
    
For a full implementation, consider:
1. Using a server-side API endpoint deployed to a Node.js environment
2. Using a compatible YouTube API client library
3. Using a third-party service that provides direct download URLs
    
Thank you for using YTMate.in!
`

    // Set appropriate headers for file download
    const headers = new Headers()
    headers.set("Content-Disposition", `attachment; filename="${fileName}"`)
    headers.set("Content-Type", format?.includes("mp3") ? "audio/mpeg" : "video/mp4")
    headers.set("Content-Length", content.length.toString())

    return new NextResponse(content, {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error("Error streaming YouTube video:", error)
    return NextResponse.json({ error: "Failed to stream video" }, { status: 500 })
  }
}
