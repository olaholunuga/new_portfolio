function Home() {
    return (
        <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 lg:px-24 py-12 bg-gray-50 dark:bg-gray-900">
            {/* Left Side - Text Content */}
            <div className="text-center md:text-left md:w-1/2 space-y-6">
                <h2 className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300">
                    👋 Hi, I’m
                </h2>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
                    Olaoluwa Olunuga
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-md mx-auto md:mx-0">
                    I’m a software Engineer passionate about building web apps,
                    AI-powered tools, and creating elegant solutions to real-world
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <a
                        href="/projects"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
                    >
                        View My Projects
                    </a>
                    <a
                        href="/contact"
                        className="border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 px-6 py-3 rounded-lg font-medium transition"
                    >
                        Contact Me
                    </a>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
                <img
                    src="/profile.png"
                    alt="Developer Illustration"
                    className="w-64 h-64 object-cover rounded-full shadow-lg border-4 border-blue-500"
                />
            </div>
        </section>
    )
}

export default Home