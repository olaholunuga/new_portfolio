import courses from "../data/courses.json";

export default function About() {
  return (
    <section className="px-6 md:px-12 lg:px-24 py-16 bg-stone-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      <div className="max-w-4xl mx-auto space-y-16">
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

        {/* Experience / Timeline */}
        <div>
          <h2 className="text-2xl font-bold mb-8 text-slate-700 dark:text-slate-200">
            Experience & Education
          </h2>
          <ol className="relative border-l border-slate-300 dark:border-slate-700">
            {/* Example jobs */}
            <li className="mb-10 ml-6">
              <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-sky-400 rounded-full ring-8 ring-stone-50 dark:ring-slate-900"></span>
              <h3 className="text-lg font-semibold">Software Developer @ Tech Company</h3>
              <time className="block mb-2 text-sm text-slate-500 dark:text-slate-400">
                Jan 2023 – Present
              </time>
              <p className="text-base text-slate-600 dark:text-slate-400">
                Working on full-stack applications, AI integrations, and building
                scalable APIs with Flask and React.
              </p>
            </li>

            {/* Education */}
            <li className="mb-10 ml-6">
              <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-sky-400 rounded-full ring-8 ring-stone-50 dark:ring-slate-900"></span>
              <h3 className="text-lg font-semibold">B.Sc. Computer Science</h3>
              <time className="block mb-2 text-sm text-slate-500 dark:text-slate-400">
                2017 – 2021
              </time>
              <p className="text-base text-slate-600 dark:text-slate-400">
                University of Example — specialized in software engineering and
                artificial intelligence.
              </p>
            </li>

            {/* Courses (dynamic) */}
            <li className="ml-6">
              <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-sky-400 rounded-full ring-8 ring-stone-50 dark:ring-slate-900"></span>
              <h3 className="text-lg font-semibold">Coursera Online Courses</h3>
              <time className="block mb-2 text-sm text-slate-500 dark:text-slate-400">
                2020 – Present
              </time>
              <ul className="list-disc list-inside text-base text-slate-600 dark:text-slate-400 space-y-2">
                {courses.map((course, index) => (
                  <li key={index}>
                    {course.certificateUrl ? (
                      <a
                        href={course.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-400 hover:underline"
                      >
                        {course.title}
                      </a>
                    ) : (
                      course.title
                    )}{" "}
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      ({course.provider}, {course.year})
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}