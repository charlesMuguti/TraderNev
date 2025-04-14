
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getCategory, getStrategyBySlug, getEducatorsByStrategy } from "@/lib/mockData";
import EducatorCard from "@/components/EducatorCard";
import BackgroundAnimation from "@/components/BackgroundAnimation";

const StrategyPage = () => {
  const { categorySlug, strategySlug } = useParams<{ categorySlug: string; strategySlug: string }>();
  
  const category = categorySlug ? getCategory(categorySlug) : null;
  const strategy = strategySlug ? getStrategyBySlug(strategySlug) : null;
  const educators = strategy ? getEducatorsByStrategy(strategy.id) : [];

  if (!category || !strategy) {
    return <div>Strategy not found</div>;
  }

  return (
    <div className="min-h-screen">
      <BackgroundAnimation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col space-y-2">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {category.title}
            </h4>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-sky-500 dark:from-purple-400 dark:to-blue-500 bg-clip-text text-transparent">
              {strategy.title}
            </h1>
          </div>
          
          {strategy.description && (
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              {strategy.description}
            </p>
          )}
          
          <h2 className="text-2xl font-semibold mb-2">
            Free Educators & Resources
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Check out these free educators that teach {strategy.title.toLowerCase()}.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {educators.length > 0 ? (
            educators.map((educator, index) => (
              <motion.div
                key={educator.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <EducatorCard
                  name={educator.name}
                  platform={educator.platform}
                  url={educator.url}
                  description={educator.description}
                />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No educators found for this strategy yet.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default StrategyPage;
