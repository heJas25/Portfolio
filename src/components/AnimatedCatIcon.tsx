import React, { useState } from 'react';
import { Cat, Heart } from 'lucide-react';

interface AnimatedCatIconProps {
  size?: number;
  className?: string;
}

const AnimatedCatIcon: React.FC<AnimatedCatIconProps> = ({ 
  size = 32, 
  className = '' 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`
        relative inline-block cursor-pointer select-none
        animate-kawaii-float
        ${isHovered ? 'animate-bounce' : ''}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Cat Icon */}
      <Cat 
        size={size} 
        className="text-kawaii-pink animate-pulse transition-all duration-300 hover:text-kawaii-purple" 
      />
      
      {/* Hover Effects */}
      {isHovered && (
        <>
          {/* Hearts */}
          <Heart 
            size={size * 0.3} 
            className="absolute -top-2 -right-2 text-kawaii-pink animate-bounce fill-current" 
          />
          <Heart 
            size={size * 0.2} 
            className="absolute -top-1 -left-3 text-kawaii-purple animate-bounce delay-150 fill-current opacity-70" 
          />
          
          {/* Sparkles */}
          <div className="absolute -top-3 left-1/2 w-1 h-1 bg-kawaii-mint rounded-full animate-ping" />
          <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-kawaii-peach rounded-full animate-ping delay-300" />
        </>
      )}
    </div>
  );
};

export default AnimatedCatIcon;