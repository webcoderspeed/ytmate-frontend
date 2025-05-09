import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    // Get title from query params
    const title = searchParams.get("title") || "YTMate.in - Download Any Video or Audio Instantly"

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          backgroundImage: "linear-gradient(to right, #9333ea, #ec4899)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            borderRadius: "24px",
            padding: "40px 80px",
            margin: "40px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
            width: "90%",
            height: "80%",
          }}
        >
          <h1
            style={{
              fontSize: "60px",
              fontWeight: "bold",
              background: "linear-gradient(to right, #9333ea, #ec4899)",
              backgroundClip: "text",
              color: "transparent",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            YTMate.in
          </h1>
          <div
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#333",
              textAlign: "center",
              maxWidth: "800px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "18px",
              color: "#666",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            Download videos from YouTube, Instagram, Facebook, X, and more
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e) {
    console.log(`${e}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
