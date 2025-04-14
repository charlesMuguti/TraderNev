
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface CategoryCardProps {
  title: string;
  slug: string;
  icon?: React.ReactNode;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, slug, icon }) => {
  return (
    <Link to={`/category/${slug}`}>
      <div className="glass-card dark:glass-card-dark p-6 h-full flex flex-col justify-between 
                    transition-all duration-300 hover:translate-y-[-5px]">
        <div className="flex justify-between items-start mb-3">
          <div className="text-primary dark:text-trader-dark text-2xl">
            {icon}
          </div>
          <ChevronRight className="text-gray-400" size={20} />
        </div>
        <h3 className="text-lg font-semibold mt-2">{title}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
