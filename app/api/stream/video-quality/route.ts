import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sourceId = searchParams.get("sourceId")
    const sourcePlatform = searchParams.get("sourcePlatform")
    const quality = searchParams.get("quality")
    const format = searchParams.get("format")
    const fileName = searchParams.get("fileName") || `video-${quality}-${sourcePlatform}-${sourceId}.mp4`

    if (!sourceId) {
      return NextResponse.json({ error: "Source ID is required" }, { status: 400 })
    }

    // For this demo, we'll simulate a file download with sample content
    const content = `This is a simulated direct download for ${quality} video from ${sourcePlatform}: ${sourceId}
Format: ${format}
    
In a real implementation, this would be the actual video content
converted to ${quality} quality and streamed directly to your device without storing it on our servers.

Thank you for using YTMate.in!
`

    // Set appropriate headers for file download
    const headers = new Headers()
    headers.set("Content-Disposition", `attachment; filename="${fileName}"`)
    headers.set("Content-Type", "video/mp4")
    headers.set("Content-Length", content.length.toString())

    return new NextResponse(content, {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error("Error streaming video:", error)
    return NextResponse.json({ error: "Failed to stream video" }, { status: 500 })
  }
}
