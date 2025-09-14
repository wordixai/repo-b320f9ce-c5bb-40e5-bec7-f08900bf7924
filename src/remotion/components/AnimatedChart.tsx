import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface ChartData {
  name: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
}

interface AnimatedChartProps {
  data: ChartData[];
  startFrame: number;
}

export const AnimatedChart: React.FC<AnimatedChartProps> = ({
  data,
  startFrame
}) => {
  const frame = useCurrentFrame();
  const activeFrame = Math.max(0, frame - startFrame);
  
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="w-full h-96 bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6">
      <h3 className="text-2xl font-bold mb-6 gradient-text">API Performance</h3>
      
      <div className="flex items-end space-x-4 h-64">
        {data.map((item, index) => {
          const barStartFrame = activeFrame - (index * 10);
          const barHeight = (item.value / maxValue) * 200;
          
          const animatedHeight = interpolate(
            barStartFrame,
            [0, 30],
            [0, barHeight],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );
          
          const barOpacity = interpolate(
            barStartFrame,
            [0, 15],
            [0, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );
          
          const trendColor = item.trend === 'up' ? '#42b883' : 
                           item.trend === 'down' ? '#ef4444' : '#6b7280';

          return (
            <div key={item.name} className="flex-1 flex flex-col items-center">
              <div
                className="w-full rounded-t-lg glow-green"
                style={{
                  height: animatedHeight,
                  backgroundColor: trendColor,
                  opacity: barOpacity,
                  boxShadow: `0 0 20px ${trendColor}50`
                }}
              />
              <div className="mt-2 text-center">
                <div className="text-sm font-mono text-foreground">
                  {item.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {item.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};