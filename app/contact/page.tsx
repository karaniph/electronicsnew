import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | ElectronicHub",
  description:
    "Get in touch with the ElectronicHub team. We're here to help with any questions or feedback about our electronic components database.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

        <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
          <h2 className="text-xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-700 mb-6">
            We'd love to hear from you! Whether you have a question about our database, feedback on our website, or just
            want to say hello, please fill out the form below and we'll get back to you as soon as possible.
          </p>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Subject of your message"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Your message"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
