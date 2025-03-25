
import React, { useEffect, useRef } from 'react';

type ProgressBarProps = {
  value: number;
  height?: number;
  showValue?: boolean;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  height = 6, 
  showValue = true 
}) => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.setProperty('--progress-value', `${value}%`);
    }
  }, [value]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        {showValue && (
          <span className="text-xs text-foreground/80">{value}%</span>
        )}
      </div>
      <div 
        className="w-full bg-secondary rounded-full overflow-hidden"
        style={{ height: `${height}px` }}
      >
        <div
          ref={progressRef}
          className="progress-bar bg-primary rounded-full animate-progress-fill"
          style={{ 
            height: '100%',
            width: `${value}%`, // Initial width, animation will override
            transition: 'width 0.5s ease-out'
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
