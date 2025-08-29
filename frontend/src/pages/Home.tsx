import { Link } from "react-router-dom";
import skills from "../data/skills.json";
import blogs from "../data/blogs.json";
import { motion, useReducedMotion } from 'framer-motion'

/**
 * Motion variants
 */
const heroTextVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const heroImageVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1, transition: { delay: 0.08, duration: 0.6, ease: "easeOut" } }
};

const skillsListVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } }
};

const skillItemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.36 } }
};

export default function Home() {
  // Respect user's reduced motion setting (accessibility)
  const reduceMotion = useReducedMotion();
  return (
    <>
      {/* HERO */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between py-16">
        {/* Left - text */}
        <motion.div
          className="text-center md:text-left md:w-1/2 space-y-6"
          initial={reduceMotion ? "show" : "hidden"}
          animate="show"
          variants={heroTextVariants}
          aria-labelledby="hero-heading"
        >
          <h2 className="text-2xl md:text-3xl text-slate-700 dark:text-slate-300">
            👋 Hi, I’m
          </h2>

          <h1 id="hero-heading" className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-slate-100">
            Olaoluwa Olunuga
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-md mx-auto md:mx-0 leading-relaxed">
            I build elegant, scalable web applications and AI-powered tools that
            solve real problems and deliver measurable results. I combine clean
            engineering with thoughtful design to ship production-ready software.
            {" "}
            <Link to="/about" className="text-sky-500 hover:underline font-medium">
              Learn More →
            </Link>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/projects"
              className="bg-sky-400 hover:bg-sky-500 text-white px-6 py-3 rounded-lg font-medium shadow-md transition"
            >
              View My Projects
            </Link>
            <Link
              to="/contact"
              className="border border-sky-400 text-sky-400 hover:bg-sky-50 dark:hover:bg-slate-800 px-6 py-3 rounded-lg font-medium transition"
            >
              Contact Me
            </Link>
          </div>
        </motion.div>

        {/* Right - image */}
        <motion.div
          className="md:w-1/2 flex justify-center mb-10 md:mb-0"
          initial={reduceMotion ? "show" : "hidden"}
          animate="show"
          variants={heroImageVariants}
        >
          <img
            src="/profile.png"
            alt="Portrait of Olaoluwa Olunuga"
            className="w-64 h-64 object-cover rounded-full shadow-lg border-4 border-sky-400"
          />
        </motion.div>
      </section>

      {/* SKILLS */}
      <motion.section
        className="py-16 space-y-8 text-center"
        initial={reduceMotion ? "show" : "hidden"}
        whileInView={reduceMotion ? undefined : "show"}
        viewport={{ once: true, amount: 0.25 }}
        variants={skillsListVariants}
        aria-labelledby="skills-heading"
      >
        <h2 id="skills-heading" className="text-3xl font-bold">Tech Stack</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-items-center">
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center space-y-2 p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 shadow-sm"
              variants={skillItemVariants}
            >
              {/* SVG icons are decorative but still need alt text for accessibility */}
              <img src={skill.icon} alt={skill.name + " logo"} className="w-10 h-10" />
              <p className="text-sm font-medium">{skill.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* BLOG TEASER */}
      <motion.section
        className="py-16 space-y-8"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } }
        }}
        aria-labelledby="blog-heading"
      >
        <h2 id="blog-heading" className="text-3xl font-bold text-center">
          From My Blog
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {blogs.slice(0, 3).map((blog, idx) => (
            <motion.article
              key={idx}
              className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-md bg-white dark:bg-slate-800 transition"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -6,
                boxShadow: "0 12px 28px rgba(2, 6, 23, 0.15)"
              }}
              transition={{ duration: 0.35 }}
              viewport={{ once: true }}
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-semibold">{blog.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {blog.excerpt}
                </p>
                <a
                  href={blog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sky-500 hover:underline font-medium"
                >
                  Read More →
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="text-center py-12 bg-sky-100 dark:bg-slate-800 rounded-xl mb-16"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold mb-4">
          Have a project in mind?
        </h2>
        <Link
          to="/contact"
          className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105 focus-visible:ring-4 focus-visible:ring-sky-300"
        >
          Let’s Work Together
        </Link>
      </motion.section>
    </>
  );
}