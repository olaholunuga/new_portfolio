import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react"; // install with: pnpm add lucide-react

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(
    () => document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="w-10 h-10 flex items-center justify-center rounded-full transition 
                 bg-slate-200 text-slate-700 hover:bg-slate-300 
                 dark:bg-slate-700 dark:text-sky-400 dark:hover:bg-slate-600"
      aria-label="Toggle theme"
    >
      {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}