// src/pages/About.tsx
import { motion, easeOut } from "framer-motion";
import courses from "../data/courses.json";
import { useLocation } from "react-router-dom"

const timelineVariants = {
  hidden: { opacity: 0, x: -40 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.15, duration: 0.45, ease: easeOut }
  })
};

export default function About() {
  const location = useLocation();
  const jobs = [
    {
      role: "Technical Lead",
      Institution: "RAIN-INN, OOU",
      year: "2025 - Present",
      description: "Building student communities around Tech and what they love most on campus."
    }
  ];

  const education = [
    {
      degree: "B.ENGR Computer Engineering",
      school: "Olabisi Onabanjo University",
      year: "2022 - Present"
    }
  ];

  return (
    <div key={location.key || location.pathname} className="max-w-3xl mx-auto py-16 space-y-16">
      {/* ABOUT INTRO */}
      {/* About Me */}
      <div className="text-center md:text-left space-y-6">
        <h1 className="text-4xl font-extrabold text-slate-800 dark:text-slate-100">
          About Me
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          I’m a software developer passionate about building web applications,
          AI-powered tools, and clean, user-friendly digital experiences.
          With a background in backend and frontend development, I enjoy
          transforming complex problems into elegant, minimal solutions.
        </p>
      </div>

      {/* Skills Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-slate-700 dark:text-slate-200">
          Skills & Tools
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg text-center hover:shadow-md transition">
            <img src="/icons/react.svg" alt="React" className="w-10 h-10 mx-auto mb-2" />
            <p>React</p>
          </div>
          <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg text-center hover:shadow-md transition">
            <img src="/icons/typescript.svg" alt="TypeScript" className="w-10 h-10 mx-auto mb-2" />
            <p>TypeScript</p>
          </div>
          <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg text-center hover:shadow-md transition">
            <img src="/icons/python.svg" alt="Python" className="w-10 h-10 mx-auto mb-2" />
            <p>Python</p>
          </div>
          <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg text-center hover:shadow-md transition">
            <img src="/icons/flask.svg" alt="Flask" className="w-10 h-10 mx-auto mb-2" />
            <p>Flask</p>
          </div>
        </div>
      </div>

      {/* EXPERIENCE TIMELINE */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Experience</h2>
        <div className="relative border-l-2 border-slate-300 dark:border-slate-700 pl-6 space-y-8">
          {jobs.map((job, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={timelineVariants}
              className="relative"
            >
              {/* Dot marker */}
              <span className="absolute -left-[14px] top-2 w-3 h-3 bg-sky-500 rounded-full border-2 border-white dark:border-slate-900" />
              <h3 className="font-semibold">{job.role}</h3>
              <p className="text-sm text-slate-500">
                {job.Institution} • {job.year}
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                {job.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EDUCATION TIMELINE */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Education</h2>
        <div className="relative border-l-2 border-slate-300 dark:border-slate-700 pl-6 space-y-8">
          {education.map((edu, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={timelineVariants}
              className="relative"
            >
              <span className="absolute -left-[14px] top-2 w-3 h-3 bg-sky-500 rounded-full border-2 border-white dark:border-slate-900" />
              <h3 className="font-semibold">{edu.degree}</h3>
              <p className="text-sm text-slate-500">
                {edu.school} • {edu.year}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* COURSES TIMELINE */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Courses</h2>
        <div className="relative border-l-2 border-slate-300 dark:border-slate-700 pl-6 space-y-8">
          {courses.map((course, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={timelineVariants}
              className="relative"
            >
              <span className="absolute -left-[14px] top-2 w-3 h-3 bg-sky-500 rounded-full border-2 border-white dark:border-slate-900" />
              <h3 className="font-semibold">{course.title}</h3>
              <p className="text-sm text-slate-500">
                {course.provider} • {course.year}
              </p>
              <a
                href={course.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-500 hover:underline text-sm"
              >
                View Certificate →
              </a>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}