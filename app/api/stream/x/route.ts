import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tweetId = searchParams.get("tweetId")
    const format = searchParams.get("format")
    const fileName = searchParams.get("fileName") || `x-tweet-${tweetId}.mp4`

    if (!tweetId) {
      return NextResponse.json({ error: "Tweet ID is required" }, { status: 400 })
    }

    // For this demo, we'll simulate a file download with sample content
    const content = `This is a simulated direct download for X (Twitter) tweet: ${tweetId}
Format: ${format}
    
In a real implementation, this would be the actual video/gif content
streamed directly from Twitter to your device without storing it on our servers.
    
Thank you for using YTMate.in!
`

    // Set appropriate headers for file download
    const headers = new Headers()
    headers.set("Content-Disposition", `attachment; filename="${fileName}"`)

    // Set content type based on format
    if (format === "gif") {
      headers.set("Content-Type", "image/gif")
    } else {
      headers.set("Content-Type", "video/mp4")
    }

    headers.set("Content-Length", content.length.toString())

    return new NextResponse(content, {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error("Error streaming X (Twitter) content:", error)
    return NextResponse.json({ error: "Failed to stream content" }, { status: 500 })
  }
}
