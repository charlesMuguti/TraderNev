
import { 
  TrendingUp, BarChart2, BookOpen, TrendingDown, Activity, 
  DollarSign, Bitcoin, LineChart, BarChart, CreditCard 
} from "lucide-react";

// Types
export interface Category {
  id: number;
  title: string;
  slug: string;
  icon: keyof typeof Icons;
}

export interface Strategy {
  id: number;
  title: string;
  slug: string;
  description?: string;
  categoryId: number;
}

export interface Educator {
  id: number;
  name: string;
  platform: string;
  url: string;
  description?: string;
  strategyId: number;
}

// Icons lookup
export const Icons = {
  TrendingUp,
  BarChart2,
  BookOpen,
  TrendingDown,
  Activity,
  DollarSign,
  Bitcoin,
  LineChart,
  BarChart,
  CreditCard
};

// Mock Categories
export const categories: Category[] = [
  { id: 1, title: "Price Action", slug: "price-action", icon: "TrendingUp" },
  { id: 2, title: "Quantitative", slug: "quantitative", icon: "BarChart2" },
  { id: 3, title: "Fundamental", slug: "fundamental", icon: "BookOpen" },
  { id: 4, title: "Long-term Investing", slug: "long-term-investing", icon: "TrendingDown" },
  { id: 5, title: "Indicator-based", slug: "indicator-based", icon: "Activity" },
  { id: 6, title: "SMC / ICT-style", slug: "smc-ict", icon: "LineChart" },
  { id: 7, title: "Options", slug: "options", icon: "BarChart" },
  { id: 8, title: "Stocks", slug: "stocks", icon: "TrendingUp" },
  { id: 9, title: "Crypto", slug: "crypto", icon: "Bitcoin" },
  { id: 10, title: "ETFs", slug: "etfs", icon: "BarChart2" },
  { id: 11, title: "CFDs", slug: "cfds", icon: "CreditCard" },
];

// Mock Strategies
export const strategies: Strategy[] = [
  { 
    id: 1, 
    title: "Support & Resistance", 
    slug: "support-resistance", 
    description: "Trading based on price levels where markets historically reverse", 
    categoryId: 1 
  },
  { 
    id: 2, 
    title: "Trend Line Trading", 
    slug: "trend-line-trading", 
    description: "Using diagonal lines to identify and trade along trends", 
    categoryId: 1 
  },
  { 
    id: 3, 
    title: "Opening Range Breakout (ORB)", 
    slug: "opening-range-breakout", 
    description: "Trading breakouts from the initial trading range", 
    categoryId: 1 
  },
  { 
    id: 4, 
    title: "Supply & Demand", 
    slug: "supply-demand", 
    description: "Trading imbalances between buyers and sellers", 
    categoryId: 1 
  },
  { 
    id: 5, 
    title: "SMC / ICT", 
    slug: "smc-ict", 
    description: "Smart Money Concepts and Institutional trading patterns", 
    categoryId: 1 
  },
  { 
    id: 6, 
    title: "Machine Learning Models", 
    slug: "machine-learning", 
    description: "Using AI/ML to predict market movements", 
    categoryId: 2 
  },
  { 
    id: 7, 
    title: "Statistical Arbitrage", 
    slug: "statistical-arbitrage", 
    description: "Exploiting price differences using statistical methods", 
    categoryId: 2 
  },
  { 
    id: 8, 
    title: "Mean Reversion", 
    slug: "mean-reversion", 
    description: "Trading based on the theory that prices return to the mean", 
    categoryId: 2 
  },
  // Add more strategies for other categories
  { 
    id: 9, 
    title: "Financial Statement Analysis", 
    slug: "financial-statement-analysis", 
    description: "Analyzing company financials to make trading decisions", 
    categoryId: 3 
  },
  { 
    id: 10, 
    title: "Economic Indicators", 
    slug: "economic-indicators", 
    description: "Trading based on macroeconomic data releases", 
    categoryId: 3 
  },
];

// Mock Educators
export const educators: Educator[] = [
  { 
    id: 1, 
    name: "Trading with Rayner", 
    platform: "YouTube", 
    url: "https://www.youtube.com/user/tradingwithrayner", 
    description: "Focuses on price action trading with clear, beginner-friendly tutorials", 
    strategyId: 1 
  },
  { 
    id: 2, 
    name: "The Trading Channel", 
    platform: "YouTube", 
    url: "https://www.youtube.com/c/TheTradingChannelYT", 
    description: "In-depth support and resistance tutorials with practical examples", 
    strategyId: 1 
  },
  { 
    id: 3, 
    name: "Adam Khoo", 
    platform: "YouTube", 
    url: "https://www.youtube.com/user/adamkhoochannel", 
    description: "Practical trend line trading strategies with real trade examples", 
    strategyId: 2 
  },
  { 
    id: 4, 
    name: "Trading Rush", 
    platform: "YouTube", 
    url: "https://www.youtube.com/c/TradingRush", 
    description: "Simple, clear trend trading tutorials with backtesting results", 
    strategyId: 2 
  },
  { 
    id: 5, 
    name: "ICT Mentorship", 
    platform: "YouTube", 
    url: "https://www.youtube.com/c/InnerCircleTrader", 
    description: "Original ICT methods and institutional trading concepts", 
    strategyId: 5 
  },
  { 
    id: 6, 
    name: "Samurai Trading", 
    platform: "YouTube", 
    url: "https://www.youtube.com/c/SamuraiTrading", 
    description: "Clear explanations of SMC concepts and trade setups", 
    strategyId: 5 
  },
  // Add more educators for other strategies
];

// Mock data service functions
export const getCategories = () => {
  return categories;
};

export const getCategory = (slug: string) => {
  return categories.find(category => category.slug === slug);
};

export const getStrategiesByCategory = (categoryId: number) => {
  return strategies.filter(strategy => strategy.categoryId === categoryId);
};

export const getStrategyBySlug = (slug: string) => {
  return strategies.find(strategy => strategy.slug === slug);
};

export const getEducatorsByStrategy = (strategyId: number) => {
  return educators.filter(educator => educator.strategyId === strategyId);
};
