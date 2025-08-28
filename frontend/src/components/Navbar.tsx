import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-700 text-white px-6 py-3">
      <div className="flex justify-between items-center">
        {/* Logo / Title */}
        <h1 className="text-xl font-bold text-sky-400">My Portfolio</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-sky-400 transition">Home</Link>
          <Link to="/about" className="hover:text-sky-400 transition">About</Link>
          <Link to="/projects" className="hover:text-sky-400 transition">Projects</Link>
          <Link to="/contact" className="hover:text-sky-400 transition">Contact</Link>
          <a
            href="https://myblogsite.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-sky-400 hover:bg-sky-500 text-white px-4 py-2 rounded-md transition"
          >
            Blog
          </a>
          <ThemeToggle />
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="mt-3 flex flex-col space-y-2 md:hidden bg-slate-600 rounded-md p-3">
          <Link to="/" className="hover:text-sky-400 transition">Home</Link>
          <Link to="/about" className="hover:text-sky-400 transition">About</Link>
          <Link to="/projects" className="hover:text-sky-400 transition">Projects</Link>
          <Link to="/contact" className="hover:text-sky-400 transition">Contact</Link>
          <a
            href="https://myblogsite.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-sky-400 hover:bg-sky-500 text-white px-4 py-2 rounded-md transition"
          >
            Blog
          </a>
          <ThemeToggle />
        </div>
      )}
    </nav>
  );
}
