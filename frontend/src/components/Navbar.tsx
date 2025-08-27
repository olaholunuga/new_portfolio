import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between">
            <h1 className="text-xl font-bold">My Portfolio</h1>
            <div className="space-x-4">
                <Link to="/" className="hover:underline"> Home </Link>
                <Link to="/about" className="hover:underline"> About </Link>
                <Link to="/projects" className="hover:underline"> Projects </Link>
                <Link to="/contact" className="hover:underline"> Contact </Link>
                <a href="http://myblogsite.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                 Blog
                </a>
            </div>
        </nav>
    );
}