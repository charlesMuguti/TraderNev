
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import EducatorCard from "@/components/EducatorCard";
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

interface Educator {
  id: number;
  name: string;
  platform: string;
  url: string;
  description: string | null;
  strategy_id: number;
}

const StrategyPage = () => {
  const { categorySlug, strategySlug } = useParams<{ categorySlug: string; strategySlug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [strategy, setStrategy] = useState<Strategy | null>(null);
  const [educators, setEducators] = useState<Educator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!categorySlug || !strategySlug) return;
      
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
        
        // Fetch strategy
        const { data: strategyData, error: strategyError } = await supabase
          .from('strategies')
          .select('*')
          .eq('slug', strategySlug)
          .single();
        
        if (strategyError) {
          console.error('Error fetching strategy:', strategyError);
          return;
        }
        
        setStrategy(strategyData);
        
        // Fetch educators for this strategy
        if (strategyData) {
          const { data: educatorsData, error: educatorsError } = await supabase
            .from('educators')
            .select('*')
            .eq('strategy_id', strategyData.id);
          
          if (educatorsError) {
            console.error('Error fetching educators:', educatorsError);
            return;
          }
          
          setEducators(educatorsData || []);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categorySlug, strategySlug]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <BackgroundAnimation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse h-10 w-80 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
          <div className="animate-pulse h-6 w-full max-w-2xl bg-gray-200 dark:bg-gray-700 rounded mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(3).fill(0).map((_, index) => (
              <div key={`loading-${index}`} className="glass-card dark:glass-card-dark p-6 h-40 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

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
                  description={educator.description || undefined}
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
