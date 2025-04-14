
import { motion } from "framer-motion";
import CategoryCard from "@/components/CategoryCard";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import SupportBanner from "@/components/SupportBanner";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Icons } from "@/lib/mockData";
import { LucideIcon } from "lucide-react";

interface Category {
  id: number;
  title: string;
  slug: string;
  icon: string;
}

const HomePage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*');
        
        if (error) {
          console.error('Error fetching categories:', error);
          return;
        }
        
        setCategories(data || []);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen">
      <BackgroundAnimation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-sky-500 dark:from-purple-400 dark:to-blue-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Find Your Trading Strategy. Fast.
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover trading strategies and free online educators across various styles and instruments.
          </motion.p>
        </div>
        
        {/* Support Banner Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <SupportBanner />
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {loading ? (
            // Loading placeholder
            Array(8).fill(0).map((_, index) => (
              <div 
                key={`loading-${index}`} 
                className="glass-card dark:glass-card-dark p-6 h-40 animate-pulse"
              />
            ))
          ) : categories.length > 0 ? (
            categories.map((category, index) => {
              const IconComponent = Icons[category.icon as keyof typeof Icons] as LucideIcon;
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <CategoryCard 
                    title={category.title}
                    slug={category.slug}
                    icon={IconComponent && <IconComponent size={28} />}
                  />
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No categories found.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
