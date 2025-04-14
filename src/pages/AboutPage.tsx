
import BackgroundAnimation from "@/components/BackgroundAnimation";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <BackgroundAnimation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <motion.div 
          className="glass-card dark:glass-card-dark p-8 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-sky-500 dark:from-purple-400 dark:to-blue-500 bg-clip-text text-transparent">
            About TraderMap
          </h1>
          
          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <p>
              TraderMap is designed to help intermediate traders quickly discover different trading strategies 
              and free online educators who teach them — across various trading styles and instruments.
            </p>
            
            <p>
              Trading can be overwhelming with countless strategies, techniques, and educators to choose from. 
              TraderMap aims to simplify this journey by organizing trading knowledge in an accessible way.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-3">How to Use TraderMap</h2>
            
            <ol className="list-decimal pl-5 space-y-2">
              <li>Browse trading categories on the homepage</li>
              <li>Select a category to view specific strategies within that trading style</li>
              <li>Choose a strategy to discover free educators and resources</li>
              <li>Open educator links in a new tab to start learning</li>
            </ol>
            
            <h2 className="text-xl font-semibold mt-8 mb-3">Our Philosophy</h2>
            
            <p>
              We believe that quality trading education should be accessible to everyone. 
              TraderMap focuses on connecting traders with free, high-quality resources rather 
              than promoting paid courses or services.
            </p>
            
            <p>
              All educators and resources listed on TraderMap have been selected based on the quality 
              of their content, clarity of instruction, and community reputation.
            </p>
            
            <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                TraderMap is an educational resource and does not provide financial advice. 
                Trading involves risk, and it's important to do your own research before implementing 
                any strategy.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
