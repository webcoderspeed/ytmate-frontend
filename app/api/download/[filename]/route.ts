import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { filename: string } }) {
  try {
    const { filename } = params

    // Create a simple text file with download information
    const content = `This is a simulated download for: ${filename}
    
Download started at: ${new Date().toISOString()}
    
In a real implementation, this would be the actual file content.
For security reasons, we're not implementing actual file downloads in this demo.
    
Thank you for using YTMate.in!
`

    // Set appropriate headers for file download
    const headers = new Headers()
    headers.set("Content-Disposition", `attachment; filename=${filename}`)
    headers.set("Content-Type", "text/plain")
    headers.set("Content-Length", content.length.toString())

    return new NextResponse(content, {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error("Error serving download:", error)
    return NextResponse.json({ error: "Failed to download file" }, { status: 500 })
  }
}
