
import React from "react";

const BackgroundAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 animated-gradient-bg overflow-hidden">
      <div className="absolute inset-0 opacity-90">
        {/* Creates a grid-like pattern of circles */}
        <div className="absolute h-full w-full">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-blue-300/10 dark:bg-purple-500/10 
                         animate-pulse-slow"
              style={{
                width: `${Math.random() * 20 + 5}rem`,
                height: `${Math.random() * 20 + 5}rem`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackgroundAnimation;
