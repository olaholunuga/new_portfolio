export default function Footer() {
  return (
    <footer className="bg-slate-700 dark:bg-slate-900 text-slate-200 dark:text-slate-400 text-center p-6">
      <p>&copy; {new Date().getFullYear()} My Portfolio. Built with <span className="text-sky-400">React</span> + <span className="text-sky-400">Flask</span>.</p>
    </footer>
  );
}
