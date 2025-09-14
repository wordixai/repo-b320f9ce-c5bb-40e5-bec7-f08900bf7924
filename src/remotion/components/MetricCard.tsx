import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  name: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  startFrame: number;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  name,
  value,
  trend,
  startFrame
}) => {
  const frame = useCurrentFrame();
  const activeFrame = Math.max(0, frame - startFrame);
  
  const cardScale = interpolate(activeFrame, [0, 20], [0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  
  const cardOpacity = interpolate(activeFrame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  
  const valueAnimation = interpolate(activeFrame, [20, 50], [0, value], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  
  const TrendIcon = trend === 'up' ? TrendingUp : 
                   trend === 'down' ? TrendingDown : Minus;
  
  const trendColor = trend === 'up' ? '#42b883' : 
                    trend === 'down' ? '#ef4444' : '#6b7280';

  return (
    <div
      className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6"
      style={{
        transform: `scale(${cardScale})`,
        opacity: cardOpacity,
        boxShadow: `0 0 20px ${trendColor}30`
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-foreground">{name}</h4>
        <TrendIcon 
          className="w-5 h-5" 
          style={{ color: trendColor }}
        />
      </div>
      
      <div className="text-3xl font-bold gradient-text">
        {Math.round(valueAnimation).toLocaleString()}
      </div>
      
      <div className="text-sm text-muted-foreground mt-2">
        {trend === 'up' ? '↗ Increasing' : 
         trend === 'down' ? '↘ Decreasing' : '→ Stable'}
      </div>
      
      {/* Animated progress bar */}
      <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${Math.min(100, (valueAnimation / 1000) * 100)}%`,
            backgroundColor: trendColor,
            boxShadow: `0 0 10px ${trendColor}`
          }}
        />
      </div>
    </div>
  );
};