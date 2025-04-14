
import { Link } from "react-router-dom";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <BackgroundAnimation />
      
      <motion.div 
        className="text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-sky-500 dark:from-purple-400 dark:to-blue-500 bg-clip-text text-transparent">
          404
        </h1>
        
        <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
          Oops! This trading strategy can't be found.
        </p>
        
        <Link 
          to="/" 
          className="btn-primary inline-flex items-center gap-2"
        >
          <Home size={18} />
          Back to Homepage
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
