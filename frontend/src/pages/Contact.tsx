// src/pages/Contact.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await axios.post("http://localhost:5000/api/contact", form);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="py-16 space-y-16">
      {/* Contact Form */}
      <motion.section
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-center mb-8">Get in Touch</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-slate-200 dark:border-slate-700"
        >
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-sky-400"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-sky-400"
            />
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-1">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-sky-400"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-sky-400"
            ></textarea>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-3 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-400 text-white font-semibold rounded-lg shadow-md transition focus-visible:ring-4 focus-visible:ring-sky-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            {status === "loading"
              ? "Sending..."
              : status === "success"
              ? "Message Sent!"
              : "Send Message"}
          </motion.button>

          {/* Feedback */}
          {status === "error" && (
            <p className="text-red-500 text-sm mt-2">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </motion.section>

      {/* Direct Contact + Resume */}
      <motion.section
        className="max-w-2xl mx-auto text-center space-y-4"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold">Other Ways to Reach Me</h2>
        <p>
          Connect with me on{" "}
          <a
            href="https://github.com/yourusername"
            className="text-sky-500 hover:underline"
          >
            GitHub
          </a>{" "}
          or via{" "}
          <a
            href="https://linkedin.com/in/yourusername"
            className="text-sky-500 hover:underline"
          >
            LinkedIn
          </a>
          .
        </p>
        <a
          href="/resume.pdf"
          download
          className="inline-block px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg hover:bg-sky-500 hover:text-white transition"
        >
          Download My Resume
        </a>
      </motion.section>
    </div>
  );
}