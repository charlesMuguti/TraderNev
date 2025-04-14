
import { ExternalLink } from "lucide-react";

interface EducatorCardProps {
  name: string;
  platform: string;
  url: string;
  description?: string;
}

const EducatorCard: React.FC<EducatorCardProps> = ({ 
  name, 
  platform, 
  url, 
  description 
}) => {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block h-full"
    >
      <div className="glass-card dark:glass-card-dark p-6 h-full 
                     transition-all duration-300 hover:translate-y-[-5px]">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
              {platform}
            </span>
          </div>
          <ExternalLink className="text-primary dark:text-trader-dark" size={20} />
        </div>
        
        {description && (
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
            {description}
          </p>
        )}
      </div>
    </a>
  );
};

export default EducatorCard;
