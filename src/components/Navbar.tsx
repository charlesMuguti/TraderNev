
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { Home, Info } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full mb-10 py-4 px-4 sm:px-6 glass dark:bg-black/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-sky-400 dark:from-purple-400 dark:to-indigo-500 bg-clip-text text-transparent">
              TraderMap
            </span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link to="/" className="nav-link flex items-center gap-1">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <Link to="/about" className="nav-link flex items-center gap-1">
            <Info className="w-4 h-4" />
            <span>About</span>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
