import { useState } from "react";
import axios from "axios";
import projects from "../data/projects.json";

export default function Projects() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    requirements: ""
  });
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Add user's message
    const newMessages = [...messages, { role: "user", content: formData.requirements }];
    setMessages(newMessages);

    try {
      const response = await axios.post("http://localhost:5000/api/generate-proposal", formData);
      const proposal = response.data.proposal;

      setMessages([...newMessages, { role: "assistant", content: proposal }]);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-6 md:px-12 lg:px-24 py-16 bg-stone-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Page Title */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-slate-800 dark:text-slate-100">
            My Projects
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            A selection of my work — blending creativity, problem-solving, and
            clean code.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition bg-white dark:bg-slate-800"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs font-medium bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-sky-400 hover:underline font-medium"
                >
                  View Project →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Proposal Generator */}
        <div className="mt-16 p-8 rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold mb-6 text-slate-700 dark:text-slate-200">
            Work with Me
          </h2>
          <p className="mb-6 text-slate-600 dark:text-slate-400">
            Tell me about your project, and I’ll generate a tailored proposal. 
            You’ll see the response instantly, and I’ll also receive it via email.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <textarea
              name="requirements"
              placeholder="Tell me about your project..."
              value={formData.requirements}
              onChange={handleChange}
              required
              rows={5}
              className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-transparent"
            />

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg shadow-md transition disabled:opacity-50"
            >
              {loading ? "Generating Proposal..." : "Generate Proposal"}
            </button>
          </form>

          {/* Error */}
          {error && <p className="mt-4 text-red-500">{error}</p>}

          {/* Chat Messages */}
          <div className="mt-8 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-lg p-4 rounded-lg ${
                  msg.role === "user"
                    ? "ml-auto bg-sky-500 text-white"
                    : "mr-auto bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}