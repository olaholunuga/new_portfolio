import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [darkMode, setDarkMode] = useState(
        () => document.documentElement.classList.contains("dark")
    );

    useEffect(
        () => {
            if (darkMode) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        }, [darkMode]
    );
    return (
        <button
        onClick={() => setDarkMode(!darkMode)}
        className="px-3 py-1 rounded-md bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 transition">
        {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
    );
}