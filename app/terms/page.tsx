"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TermsOfServicePage() {
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
          <h1>Terms of Service</h1>
          <p>Last updated: May 1, 2023</p>

          <h2>1. Introduction</h2>
          <p>
            Welcome to YTMate.in. These Terms of Service ("Terms") govern your use of our website located at ytmate.in
            (the "Service") and all related services provided by YTMate.in ("we," "us," or "our").
          </p>
          <p>
            By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of
            the terms, you may not access the Service.
          </p>

          <h2>2. Use of the Service</h2>
          <p>
            YTMate.in provides tools for downloading and converting videos from various platforms. By using our Service,
            you agree to:
          </p>
          <ul>
            <li>Use the Service only for lawful purposes and in accordance with these Terms.</li>
            <li>Not use the Service for any illegal or unauthorized purpose.</li>
            <li>
              Not attempt to probe, scan, or test the vulnerability of the Service or any related system or network.
            </li>
            <li>Not interfere with or disrupt the Service or servers or networks connected to the Service.</li>
          </ul>

          <h2>3. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property
            of YTMate.in and its licensors. The Service is protected by copyright, trademark, and other laws.
          </p>
          <p>
            Our Service allows you to download content from third-party websites. It is your responsibility to ensure
            that your use of such content complies with applicable copyright laws and the terms of service of those
            websites.
          </p>

          <h2>4. User Responsibilities</h2>
          <p>When using our Service, you acknowledge and agree that:</p>
          <ul>
            <li>You are solely responsible for your conduct and any content that you download through the Service.</li>
            <li>You will not use our Service to infringe upon the intellectual property rights of others.</li>
            <li>
              You will not use our Service to download content for commercial purposes without proper authorization.
            </li>
            <li>You will comply with all applicable laws regarding the downloading and use of content.</li>
          </ul>

          <h2>5. Fair Use Policy</h2>
          <p>
            Our Service is intended for personal, non-commercial use. We reserve the right to limit or block access to
            users who engage in excessive or abusive usage patterns that may negatively impact the Service's performance
            or availability for other users.
          </p>

          <h2>6. Disclaimer of Warranties</h2>
          <p>
            The Service is provided "as is" and "as available" without any warranties of any kind, either express or
            implied, including but not limited to the implied warranties of merchantability, fitness for a particular
            purpose, or non-infringement.
          </p>
          <p>
            We do not warrant that the Service will be uninterrupted or error-free, that defects will be corrected, or
            that the Service or the server that makes it available are free of viruses or other harmful components.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            In no event shall YTMate.in, its directors, employees, partners, agents, suppliers, or affiliates be liable
            for any indirect, incidental, special, consequential, or punitive damages, including without limitation,
            loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul>
            <li>Your access to or use of or inability to access or use the Service;</li>
            <li>Any conduct or content of any third party on the Service;</li>
            <li>Any content obtained from the Service; and</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
          </ul>

          <h2>8. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
            material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What
            constitutes a material change will be determined at our sole discretion.
          </p>
          <p>
            By continuing to access or use our Service after those revisions become effective, you agree to be bound by
            the revised terms. If you do not agree to the new terms, please stop using the Service.
          </p>

          <h2>9. Termination</h2>
          <p>
            We may terminate or suspend access to our Service immediately, without prior notice or liability, for any
            reason whatsoever, including without limitation if you breach the Terms.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of India, without regard to its
            conflict of law provisions.
          </p>
          <p>
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those
            rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining
            provisions of these Terms will remain in effect.
          </p>

          <h2>11. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us:</p>
          <ul>
            <li>By email: legal@ytmate.in</li>
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
