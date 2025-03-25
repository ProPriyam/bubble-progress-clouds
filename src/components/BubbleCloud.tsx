
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';

type BubbleProps = {
  id: string;
  name: string;
  progress: number;
  size?: 'sm' | 'md' | 'lg';
  delay?: number;
  onClick?: () => void;
};

const getBubbleSize = (size: 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'sm': return 'w-20 h-20 md:w-24 md:h-24';
    case 'md': return 'w-28 h-28 md:w-32 md:h-32';
    case 'lg': return 'w-36 h-36 md:w-44 md:h-44';
  }
};

const getAnimationDelay = (delay: number) => {
  return `${delay}s`;
};

const Bubble: React.FC<BubbleProps> = ({ 
  id, 
  name, 
  progress, 
  size = 'md', 
  delay = 0,
  onClick 
}) => {
  const bubbleSize = getBubbleSize(size);
  const animationDelay = getAnimationDelay(delay);
  
  // Determine animation class based on size
  const animation = size === 'lg' 
    ? 'animate-float-slower' 
    : size === 'md' 
      ? 'animate-float-slow' 
      : 'animate-float';

  return (
    <div 
      className={`bubble ${bubbleSize} ${animation} animate-pulse-light hover:shadow-lg hover:scale-105`}
      style={{ animationDelay }}
      onClick={onClick}
    >
      <div className="flex flex-col items-center p-2 w-full">
        <span className="text-center font-medium mb-2 truncate w-full">
          {name}
        </span>
        <div className="w-full px-2">
          <ProgressBar value={progress} />
        </div>
      </div>
    </div>
  );
};

type BubbleCloudProps = {
  items: {
    id: string;
    name: string;
    progress: number;
  }[];
  onBubbleClick: (id: string) => void;
};

const BubbleCloud: React.FC<BubbleCloudProps> = ({ items, onBubbleClick }) => {
  // Determine size for each bubble - distribute sizes for visual interest
  const getSizeForIndex = (index: number, total: number): 'sm' | 'md' | 'lg' => {
    if (total <= 3) {
      return 'lg';
    }
    
    if (index % 3 === 0) return 'lg';
    if (index % 2 === 0) return 'md';
    return 'sm';
  };

  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center">
      <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-8 p-8 animate-fade-in">
        {items.map((item, index) => (
          <Bubble
            key={item.id}
            id={item.id}
            name={item.name}
            progress={item.progress}
            size={getSizeForIndex(index, items.length)}
            delay={index * 0.2}
            onClick={() => onBubbleClick(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default BubbleCloud;
