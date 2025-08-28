import { useState } from "react";
import axios from "axios";
import { Mail, Github, Linkedin } from "lucide-react"; // icons

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      await axios.post("http://localhost:5000/api/contact", formData);
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-6 md:px-12 lg:px-24 py-16 bg-stone-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      <div className="max-w-4xl mx-auto space-y-16">

        {/* Heading */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-slate-800 dark:text-slate-100">
            Contact Me
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Let’s connect! You can reach me via this form or through my social links below.
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-transparent"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-transparent"
            />
          </div>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-transparent"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-transparent"
          />

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg shadow-md transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {/* Feedback */}
          {status === "success" && (
            <p className="mt-4 text-green-600">Message sent successfully!</p>
          )}
          {status === "error" && (
            <p className="mt-4 text-red-500">Something went wrong. Please try again.</p>
          )}
        </form>

        {/* Direct Contact Links */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Other Ways to Reach Me</h2>
          <div className="flex justify-center gap-6 mt-4">
            <a href="mailto:your@email.com" className="flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:text-sky-500">
              <Mail className="w-5 h-5" /> Email
            </a>
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:text-sky-500">
              <Github className="w-5 h-5" /> GitHub
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:text-sky-500">
              <Linkedin className="w-5 h-5" /> LinkedIn
            </a>
          </div>
        </div>

        {/* Resume Download */}
        <div className="text-center">
          <a
            href="/Resume.pdf"
            download
            className="inline-block px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg shadow-md transition"
          >
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}