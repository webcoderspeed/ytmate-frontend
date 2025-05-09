import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const videoId = searchParams.get("videoId")
    const format = searchParams.get("format")
    const fileName = searchParams.get("fileName") || `vimeo-video-${videoId}.mp4`

    if (!videoId) {
      return NextResponse.json({ error: "Video ID is required" }, { status: 400 })
    }

    // For this demo, we'll simulate a file download with sample content
    const content = `This is a simulated direct download for Vimeo video: ${videoId}
Format: ${format}
    
In a real implementation, this would be the actual video/audio content
streamed directly from Vimeo to your device without storing it on our servers.
    
Thank you for using YTMate.in!
`

    // Set appropriate headers for file download
    const headers = new Headers()
    headers.set("Content-Disposition", `attachment; filename="${fileName}"`)
    headers.set("Content-Type", format.includes("mp3") ? "audio/mpeg" : "video/mp4")
    headers.set("Content-Length", content.length.toString())

    return new NextResponse(content, {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error("Error streaming Vimeo video:", error)
    return NextResponse.json({ error: "Failed to stream video" }, { status: 500 })
  }
}
