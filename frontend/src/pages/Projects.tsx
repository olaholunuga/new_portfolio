// src/pages/Projects.tsx
import { motion } from "framer-motion";
import { useState } from "react";
import projects from "../data/projects.json"; // 👈 import JSON data

// Variants for staggered entrance
const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } }
};

export default function Projects() {
  const [messages, setMessages] = useState([
    { sender: "assistant", text: "Hi! Want me to draft a proposal for your project?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");

    // Simulate assistant reply (later replace with Flask fetch)
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: "assistant", text: "Thanks! I’ll prepare a draft proposal for you." }
      ]);
    }, 800);
  };

  return (
    <div className="space-y-16 py-16">
      {/* PROJECT GRID */}
      <section>
        <h1 className="text-3xl font-bold text-center mb-12">My Projects</h1>

        <motion.div
          className="grid gap-8 md:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={gridVariants}
        >
          {projects.map((project, idx) => (
            <motion.article
              key={idx}
              className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-md bg-white dark:bg-slate-800 transition"
              variants={cardVariants}
              whileHover={{ y: -6, boxShadow: "0 12px 28px rgba(2, 6, 23, 0.15)" }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-6 space-y-3">
                <h2 className="text-xl font-semibold">{project.title}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {project.description}
                </p>

                {/* Tech stack tags */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sky-500 hover:underline font-medium"
                >
                  View →
                </a>
              </div>
            </motion.article>
          ))}

        </motion.div>
      </section>

      {/* WORK WITH ME CHAT SECTION */}
      <section className="max-w-2xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">Work With Me</h2>
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-white dark:bg-slate-800 space-y-3 h-80 overflow-y-auto">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              className={`p-3 rounded-lg max-w-xs ${msg.sender === "user"
                  ? "bg-sky-500 text-white self-end ml-auto"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {msg.text}
            </motion.div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus-visible:ring-2 focus-visible:ring-sky-400"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg transition"
          >
            Send
          </button>
        </div>
      </section>
    </div>
  );
}