export default function Footer() {
  return (
    <footer className="bg-slate-700 text-slate-200 dark:bg-slate-900 dark:text-slate-400 text-center p-4">
      <p>
        &copy; {new Date().getFullYear()} My Portfolio. Built with{" "}
        <span className="text-sky-400">React + Flask</span>.
      </p>
    </footer>
  );
}