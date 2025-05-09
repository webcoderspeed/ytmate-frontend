"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, ArrowRight, CheckCircle, Users, Globe, Shield } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About YTMate.in</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your trusted platform for downloading and converting videos from across the web
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              At YTMate.in, our mission is to provide a simple, fast, and reliable way for users to download and convert
              videos from various platforms. We believe in making content accessible to everyone, anywhere, anytime.
            </p>
            <p className="text-muted-foreground mb-6">
              Whether you're a content creator, student, professional, or just someone who wants to save videos for
              offline viewing, our tools are designed to make the process as seamless as possible.
            </p>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Download className="mr-2 h-4 w-4" /> Try Our Tools
            </Button>
          </div>
          <div className="md:w-1/2">
            <div className="relative rounded-lg overflow-hidden shadow-xl border">
              <Image
                src="/modern-office-teamwork.png"
                alt="YTMate.in Team"
                width={500}
                height={300}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose YTMate.in</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Reliable & Fast</h3>
                <p className="text-muted-foreground">
                  Our servers process your requests in real-time, ensuring quick and reliable downloads every time.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">User-Friendly</h3>
                <p className="text-muted-foreground">
                  Simple interface designed for everyone, from beginners to tech-savvy users. No technical knowledge
                  required.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Multi-Platform</h3>
                <p className="text-muted-foreground">
                  Support for YouTube, Instagram, Facebook, X, and many other platforms all in one place.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-16">
          <div className="bg-muted/50 rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="mt-1">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
                  <p className="text-muted-foreground">
                    We don't store your downloaded content or personal information. Your privacy is our priority.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Quality</h3>
                  <p className="text-muted-foreground">
                    We strive to provide the highest quality downloads possible, including HD and 4K options when
                    available.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Community</h3>
                  <p className="text-muted-foreground">
                    We value user feedback and continuously improve our tools based on community suggestions.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
                  <p className="text-muted-foreground">
                    We believe in making content accessible to everyone, regardless of their location or device.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
          <div className="space-y-6">
            <p className="text-muted-foreground">
              YTMate.in was founded in 2023 by a team of developers who were frustrated with the limitations and
              unreliability of existing video downloader tools. We set out to create a platform that would be fast,
              reliable, and easy to use.
            </p>
            <p className="text-muted-foreground">
              What started as a simple YouTube downloader quickly expanded to support multiple platforms as we received
              positive feedback and feature requests from our growing user base. Today, YTMate.in serves thousands of
              users daily, helping them download and convert videos for various purposes.
            </p>
            <p className="text-muted-foreground">
              Our team continues to work on improving our existing tools and developing new features to make YTMate.in
              the best video downloader platform on the web.
            </p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Try our tools today and experience the easiest way to download videos from your favorite platforms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Download className="mr-2 h-5 w-5" /> Try Our Tools
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">
                Contact Us <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
