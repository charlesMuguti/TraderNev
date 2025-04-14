
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getCategory, getStrategiesByCategory } from "@/lib/mockData";
import StrategyCard from "@/components/StrategyCard";
import BackgroundAnimation from "@/components/BackgroundAnimation";

const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  
  const category = categorySlug ? getCategory(categorySlug) : null;
  const strategies = category ? getStrategiesByCategory(category.id) : [];

  if (!category) {
    return <div>Category not found</div>;
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-sky-500 dark:from-purple-400 dark:to-blue-500 bg-clip-text text-transparent">
            {category.title} Strategies
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Explore different strategies within {category.title.toLowerCase()} trading.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {strategies.length > 0 ? (
            strategies.map((strategy, index) => (
              <motion.div
                key={strategy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <StrategyCard
                  title={strategy.title}
                  categorySlug={categorySlug}
                  strategySlug={strategy.slug}
                  description={strategy.description}
                />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No strategies found for this category yet.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryPage;
