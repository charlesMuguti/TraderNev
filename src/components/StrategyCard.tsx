
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface StrategyCardProps {
  title: string;
  categorySlug: string;
  strategySlug: string;
  description?: string;
}

const StrategyCard: React.FC<StrategyCardProps> = ({ 
  title, 
  categorySlug, 
  strategySlug, 
  description 
}) => {
  return (
    <Link to={`/category/${categorySlug}/strategy/${strategySlug}`}>
      <div className="glass-card dark:glass-card-dark p-6 h-full 
                     transition-all duration-300 hover:translate-y-[-5px]">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{title}</h3>
          <ChevronRight className="text-gray-400" size={20} />
        </div>
        
        {description && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
};

export default StrategyCard;
