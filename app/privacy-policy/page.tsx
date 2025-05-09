"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h1>Privacy Policy</h1>
          <p>Last updated: May 1, 2023</p>

          <h2>Introduction</h2>
          <p>
            Welcome to YTMate.in ("we," "our," or "us"). We respect your privacy and are committed to protecting your
            personal data. This privacy policy will inform you about how we look after your personal data when you visit
            our website and tell you about your privacy rights and how the law protects you.
          </p>

          <h2>Information We Collect</h2>
          <p>We collect minimal information to provide our services. The information we may collect includes:</p>
          <ul>
            <li>
              <strong>Usage Data:</strong> Information on how you use our website and services, including the URLs you
              enter for downloading.
            </li>
            <li>
              <strong>Device Information:</strong> Information about your device, browser type, and IP address.
            </li>
            <li>
              <strong>Cookies:</strong> We use cookies to enhance your experience on our website. You can set your
              browser to refuse all or some browser cookies, or to alert you when websites set or access cookies.
            </li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul>
            <li>To provide and maintain our service</li>
            <li>To improve our website and user experience</li>
            <li>To monitor the usage of our website</li>
            <li>To detect, prevent, and address technical issues</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We have implemented appropriate security measures to prevent your personal data from being accidentally
            lost, used, or accessed in an unauthorized way, altered, or disclosed. We limit access to your personal data
            to those employees, agents, contractors, and other third parties who have a business need to know.
          </p>

          <h2>Data Retention</h2>
          <p>
            We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for.
            We do not store the content of videos or files that you download through our service.
          </p>

          <h2>Your Legal Rights</h2>
          <p>
            Under certain circumstances, you have rights under data protection laws in relation to your personal data,
            including the right to:
          </p>
          <ul>
            <li>Request access to your personal data</li>
            <li>Request correction of your personal data</li>
            <li>Request erasure of your personal data</li>
            <li>Object to processing of your personal data</li>
            <li>Request restriction of processing your personal data</li>
            <li>Request transfer of your personal data</li>
            <li>Right to withdraw consent</li>
          </ul>

          <h2>Third-Party Links</h2>
          <p>
            Our website may include links to third-party websites, plug-ins, and applications. Clicking on those links
            or enabling those connections may allow third parties to collect or share data about you. We do not control
            these third-party websites and are not responsible for their privacy statements.
          </p>

          <h2>Children's Privacy</h2>
          <p>
            Our service is not intended for children under the age of 13. We do not knowingly collect personal
            information from children under 13. If you are a parent or guardian and you are aware that your child has
            provided us with personal information, please contact us.
          </p>

          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "last updated" date at the top of this Privacy Policy.
          </p>

          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us:</p>
          <ul>
            <li>By email: privacy@ytmate.in</li>
            <li>
              By visiting the contact page on our website: <Link href="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div className="mt-12 text-center">
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
