import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | ElectronicHub",
  description:
    "Read our privacy policy to understand how ElectronicHub collects, uses, and protects your personal information.",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <div className="bg-white rounded-2xl p-8 border border-gray-200 prose max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <h2>Introduction</h2>
          <p>
            ElectronicHub ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains
            how we collect, use, and share information about you when you use our website, electronichub.com (the
            "Site").
          </p>

          <h2>Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you create an account, subscribe to our
            newsletter, or contact us for support. This information may include your name, email address, and any other
            information you choose to provide.
          </p>
          <p>
            We also automatically collect certain information about your device and how you interact with our Site,
            including:
          </p>
          <ul>
            <li>Log information (such as IP address, browser type, pages visited)</li>
            <li>Device information (such as hardware model, operating system)</li>
            <li>Usage information (such as how you use our Site)</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our Site</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Communicate with you about products, services, and events</li>
            <li>Monitor and analyze trends, usage, and activities in connection with our Site</li>
            <li>Detect, investigate, and prevent security incidents</li>
          </ul>

          <h2>Sharing Your Information</h2>
          <p>We may share your information with:</p>
          <ul>
            <li>Service providers who perform services on our behalf</li>
            <li>Professional advisors, such as lawyers and accountants</li>
            <li>Authorities, when required by law</li>
          </ul>

          <h2>Your Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal information, such as the
            right to access, correct, or delete your personal information.
          </p>

          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. If we make material changes, we will notify you as
            required by law.
          </p>

          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@electronichub.com.</p>
        </div>
      </div>
    </main>
  )
}
