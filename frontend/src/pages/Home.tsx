import { Link } from "react-router-dom";
import skills from "../data/skills.json";
import blogs from "../data/blogs.json";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between py-16">
        {/* Left Side */}
        <div className="text-center md:text-left md:w-1/2 space-y-6">
          <h2 className="text-2xl md:text-3xl text-slate-700 dark:text-slate-300">
            👋 Hi, I’m
          </h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-slate-100">
            Olaoluwa Olunuga
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-md mx-auto md:mx-0">
            I’m a passionate Software Engineer dedicated to crafting elegant,
            scalable web applications and AI-powered solutions that solve
            real-world problems and deliver value.{" "}
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
        </div>

        {/* Right Side Image */}
        <div className="md:w-1/2 flex justify-center mb-10 md:mb-0">
          <img
            src="/profile.png"
            alt="Developer Portrait"
            className="w-64 h-64 object-cover rounded-full shadow-lg border-4 border-sky-400"
          />
        </div>
      </section>

      {/* Skills / Tech Stack */}
      <section className="py-16 space-y-8 text-center">
        <h2 className="text-3xl font-bold">Tech Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center space-y-2 p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 shadow-sm"
            >
              <img src={skill.icon} alt={skill.name} className="w-10 h-10" />
              <p className="text-sm font-medium">{skill.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Blog Teaser */}
      <section className="py-16 space-y-8">
        <h2 className="text-3xl font-bold text-center">From My Blog</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {blogs.slice(0, 3).map((blog, idx) => (
            <div
              key={idx}
              className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-md bg-white dark:bg-slate-800"
            >
              <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover" />
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-semibold">{blog.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{blog.excerpt}</p>
                <a
                  href={blog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sky-500 hover:underline font-medium"
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="text-center py-12 bg-sky-100 dark:bg-slate-800 rounded-xl mb-16">
        <h2 className="text-2xl font-bold mb-4">Have a project in mind?</h2>
        <Link
          to="/contact"
          className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg shadow-md transition"
        >
          Let’s Work Together
        </Link>
      </section>
    </>
  );
}