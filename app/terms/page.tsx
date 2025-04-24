import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | ElectronicHub",
  description:
    "Read our terms of service to understand the rules and guidelines for using the ElectronicHub website and services.",
}

export default function TermsPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

        <div className="bg-white rounded-2xl p-8 border border-gray-200 prose max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <h2>Introduction</h2>
          <p>
            Welcome to ElectronicHub. By accessing or using our website, electronichub.com (the "Site"), you agree to be
            bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Site.
          </p>

          <h2>Use of Our Site</h2>
          <p>You may use our Site only for lawful purposes and in accordance with these Terms. You agree not to:</p>
          <ul>
            <li>Use our Site in any way that violates any applicable law or regulation</li>
            <li>Use our Site to transmit any material that is defamatory, obscene, or offensive</li>
            <li>Use our Site to impersonate any person or entity</li>
            <li>Interfere with the proper working of our Site</li>
            <li>Attempt to gain unauthorized access to our Site or its related systems</li>
          </ul>

          <h2>Intellectual Property</h2>
          <p>
            Our Site and its original content, features, and functionality are owned by ElectronicHub and are protected
            by international copyright, trademark, patent, trade secret, and other intellectual property laws.
          </p>

          <h2>User Contributions</h2>
          <p>
            Our Site may contain message boards, forums, and other interactive features that allow users to post,
            submit, publish, display, or transmit content or materials. Any content you post to our Site will be
            considered non-confidential and non-proprietary.
          </p>

          <h2>Disclaimer of Warranties</h2>
          <p>
            Our Site is provided on an "as is" and "as available" basis, without any warranties of any kind, either
            express or implied. We do not warrant that our Site will be uninterrupted or error-free.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            In no event will ElectronicHub, its affiliates, or their licensors, service providers, employees, agents,
            officers, or directors be liable for damages of any kind arising from the use of our Site.
          </p>

          <h2>Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. If we make material changes, we will notify you as required by
            law.
          </p>

          <h2>Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at terms@electronichub.com.</p>
        </div>
      </div>
    </main>
  )
}
