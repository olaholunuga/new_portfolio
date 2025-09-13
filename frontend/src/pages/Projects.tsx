import { useState } from "react";
import { motion, easeOut } from "framer-motion";
import projects from "../data/projects.json";
import { api } from "../api/client";
import { useLocation } from 'react-router-dom'

const gridVariants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const cardVariants = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: easeOut } } };

type ProposalForm = {
  name: string;
  email: string;
  title: string;
  budget: string;
  timeline: string;
  requirements: string;
  comments?: string;
};

export default function Projects() {
  const location = useLocation();
  // ---- Showcase grid above (unchanged) ----
  // You can keep your existing grid from earlier steps
  const [form, setForm] = useState<ProposalForm>({
    name: "",
    email: "",
    title: "",
    budget: "",
    timeline: "",
    requirements: "",
    comments: "",
  });
  const [loading, setLoading] = useState(false);
  const [proposal, setProposal] = useState<string>(""); // proposal preview
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setProposal("");

    try {
      // Send all details to backend; backend:
      //  - generates proposal
      //  - emails HTML-formatted content (all details + proposal) via Resend
      //  - returns { proposalText: string }
      const res = await api.post("/api/generate_proposal", {
        name: form.name,
        email: form.email,
        title: form.title,
        budget: form.budget,
        timeline: form.timeline,
        requirements: form.requirements,
        comments: form.comments,
      });

      const proposalText = res?.data?.proposal || "No proposal text returned.";
      setProposal(proposalText);
      setStatus("success");

      // Dispatch to the global chat
      window.dispatchEvent(
        new CustomEvent("proposal:submitted", {
          detail: {
            name: form.name,
            email: form.email,
            title: form.title,
            budget: form.budget,
            timeline: form.timeline,
            requirements: form.requirements,
            comments: form.comments,
            proposal: proposalText,
          },
        })
      );
    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div key={location.key || location.pathname} className="space-y-16 py-16">
      {/* PROJECT GRID (keep from previous step) */}
      <section>
        <h1 className="text-3xl font-bold text-center mb-12">My Projects</h1>
        <motion.div className="grid gap-8 md:grid-cols-3" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={gridVariants}>
          {projects.map((project, idx) => (
            <motion.article
              key={idx}
              className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-md bg-white dark:bg-slate-800 transition"
              variants={cardVariants}
              whileHover={{ y: -6, boxShadow: "0 12px 28px rgba(2, 6, 23, 0.15)" }}
            >
              <img src={project.image} alt={project.title} className="w-full h-40 object-cover" />
              <div className="p-6 space-y-3">
                <h2 className="text-xl font-semibold">{project.title}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">{project.description}</p>
                {Array.isArray(project.techStack) && (
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((t, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-block text-sky-500 hover:underline font-medium">
                  View →
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* ---- SIDE BY SIDE: FORM (left) + PROPOSAL PREVIEW (right) ---- */}
      <section className="grid md:grid-cols-2 gap-8 items-start">
        {/* Professional form */}
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-6 bg-white dark:bg-slate-800 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Project Proposal Request</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Fill in the details below. I’ll email you a copy and a draft proposal.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" aria-describedby="proposal-disclaimer">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <input
                  id="name" required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input
                  id="email" type="email" required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">Project Title</label>
              <input
                id="title" required
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="budget" className="block text-sm font-medium mb-1">Budget (range or estimate)</label>
                <input
                  id="budget" required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="timeline" className="block text-sm font-medium mb-1">Timeline (deadline / timeframe)</label>
                <input
                  id="timeline" required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                  value={form.timeline}
                  onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="requirements" className="block text-sm font-medium mb-1">Requirements</label>
              <textarea
                id="requirements" required rows={5}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                value={form.requirements}
                onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                placeholder="Describe your project goals, features, audience, integrations, etc."
              />
            </div>

            <div>
              <label htmlFor="comments" className="block text-sm font-medium mb-1">Additional Comments (optional)</label>
              <textarea
                id="comments" rows={3}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                value={form.comments}
                onChange={(e) => setForm({ ...form, comments: e.target.value })}
                placeholder="Anything else you'd like to add?"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-medium disabled:opacity-60"
              aria-busy={loading}
            >
              {loading ? "Submitting..." : "Generate Proposal & Send"}
            </button>

            {/* Plain text disclaimer */}
            <p id="proposal-disclaimer" className="text-xs text-slate-500 mt-3">
              Note: The proposals generated by this AI agent are for experimental purposes only and do not constitute a formal business agreement.
            </p>

            <div role="status" aria-live="polite" className="text-sm mt-2">
              {status === "success" && <span className="text-green-600">Sent! Check your email for the full details.</span>}
              {status === "error" && <span className="text-red-600">Something went wrong. Please try again.</span>}
            </div>
          </form>
        </div>

        {/* Proposal Preview */}
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-6 bg-white dark:bg-slate-800 shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Proposal Preview</h3>
          {proposal ? (
            <article className="prose prose-slate dark:prose-invert max-w-none whitespace-pre-wrap">
              {proposal}
            </article>
          ) : (
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Your generated proposal will appear here after you submit the form.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}