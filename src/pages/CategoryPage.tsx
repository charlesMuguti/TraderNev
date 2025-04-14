
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import StrategyCard from "@/components/StrategyCard";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Category {
  id: number;
  title: string;
  slug: string;
  icon: string;
}

interface Strategy {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  category_id: number;
}

const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryAndStrategies = async () => {
      if (!categorySlug) return;
      
      try {
        setLoading(true);
        
        // Fetch category
        const { data: categoryData, error: categoryError } = await supabase
          .from('categories')
          .select('*')
          .eq('slug', categorySlug)
          .single();
        
        if (categoryError) {
          console.error('Error fetching category:', categoryError);
          return;
        }
        
        setCategory(categoryData);
        
        // Fetch strategies for this category
        if (categoryData) {
          const { data: strategiesData, error: strategiesError } = await supabase
            .from('strategies')
            .select('*')
            .eq('category_id', categoryData.id);
          
          if (strategiesError) {
            console.error('Error fetching strategies:', strategiesError);
            return;
          }
          
          setStrategies(strategiesData || []);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndStrategies();
  }, [categorySlug]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <BackgroundAnimation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse h-10 w-80 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
          <div className="animate-pulse h-6 w-full max-w-2xl bg-gray-200 dark:bg-gray-700 rounded mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, index) => (
              <div key={`loading-${index}`} className="glass-card dark:glass-card-dark p-6 h-40 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

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
                  categorySlug={categorySlug as string}
                  strategySlug={strategy.slug}
                  description={strategy.description || undefined}
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
