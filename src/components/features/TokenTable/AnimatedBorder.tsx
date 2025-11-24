import { useEffect, useState } from 'react';

interface AnimatedBorderProps {
  color?: string;
  size?: number;
}

export function AnimatedBorder({ color = 'rgb(34, 197, 94)', size = 78 }: AnimatedBorderProps) {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const pathLength = 296; // Approximate perimeter of rounded rect

  return (
    <div className="absolute top-0 left-0 w-[74px] h-[74px] rounded-[4px] z-10 flex items-center justify-center pointer-events-none">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background path (dimmed) */}
        <path
          className="opacity-40"
          stroke={color}
          fill="transparent"
          strokeWidth="1"
          d={`
            M ${size - 2} ${size - 2}
            L 6 ${size - 2}
            Q 2 ${size - 2} 2 ${size - 6}
            L 2 6
            Q 2 2 6 2
            L ${size - 6} 2
            Q ${size - 2} 2 ${size - 2} 6
            L ${size - 2} ${size - 6}
            Q ${size - 2} ${size - 2} ${size - 2} ${size - 2}
          `}
        />
        {/* Animated path */}
        <path
          className="transition-all duration-300 ease-in-out"
          stroke={color}
          fill="transparent"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray={pathLength}
          strokeDashoffset={isAnimating ? 0 : pathLength}
          style={{
            transition: 'stroke-dashoffset 2s ease-out',
          }}
          d={`
            M ${size - 2} ${size - 2}
            L 6 ${size - 2}
            Q 2 ${size - 2} 2 ${size - 6}
            L 2 6
            Q 2 2 6 2
            L ${size - 6} 2
            Q ${size - 2} 2 ${size - 2} 6
            L ${size - 2} ${size - 6}
            Q ${size - 2} ${size - 2} ${size - 2} ${size - 2}
          `}
        />
      </svg>
    </div>
  );
}
