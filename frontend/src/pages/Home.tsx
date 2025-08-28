import { Link } from "react-router-dom"

export default function Home() {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 lg:px-24 py-16 bg-stone-50 dark:bg-slate-900">
      {/* Left Side - Text Content */}
      <div className="text-center md:text-left md:w-1/2 space-y-6">
        <h2 className="text-2xl md:text-3xl text-slate-700 dark:text-slate-300">
          👋 Hi, I’m
        </h2>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-slate-100">
          Your Name Here
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-md mx-auto md:mx-0">
          I’m a software developer passionate about building elegant, scalable
          web apps and AI-powered tools to solve real-world problems.
        </p>

        {/* Call To Action Buttons */}
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

      {/* Right Side - Image */}
      <div className="md:w-1/2 flex justify-center mb-10 md:mb-0">
        <img
          src="/profile.png"
          alt="Developer Portrait"
          className="w-64 h-64 object-cover rounded-full shadow-lg border-4 border-sky-400"
        />
      </div>
    </section>
  );
}