import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sourceId = searchParams.get("sourceId")
    const sourcePlatform = searchParams.get("sourcePlatform")
    const format = searchParams.get("format")
    const fileName = searchParams.get("fileName") || `audio-${sourcePlatform}-${sourceId}.mp3`

    if (!sourceId) {
      return NextResponse.json({ error: "Source ID is required" }, { status: 400 })
    }

    // For this demo, we'll simulate a file download with sample content
    const content = `This is a simulated direct download for audio from ${sourcePlatform}: ${sourceId}
Format: ${format}
    
In a real implementation, this would be the actual audio content
extracted from the source and streamed directly to your device.
    
Thank you for using YTMate.in!
`

    // Set appropriate headers for file download
    const headers = new Headers()
    headers.set("Content-Disposition", `attachment; filename="${fileName}"`)

    // Set content type based on format
    let contentType = "audio/mpeg"
    if (format === "aac") contentType = "audio/aac"
    if (format === "wav") contentType = "audio/wav"
    if (format === "ogg") contentType = "audio/ogg"

    headers.set("Content-Type", contentType)
    headers.set("Content-Length", content.length.toString())

    return new NextResponse(content, {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error("Error streaming audio:", error)
    return NextResponse.json({ error: "Failed to stream audio" }, { status: 500 })
  }
}
