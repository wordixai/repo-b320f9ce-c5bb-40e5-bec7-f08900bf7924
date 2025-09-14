import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { AnimatedChart } from '../components/AnimatedChart';
import { MetricCard } from '../components/MetricCard';

interface DataVisualizationSectionProps {
  data: Array<{
    name: string;
    value: number;
    trend: 'up' | 'down' | 'stable';
  }>;
}

export const DataVisualizationSection: React.FC<DataVisualizationSectionProps> = ({
  data
}) => {
  const frame = useCurrentFrame();
  
  // Title animation
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  
  // Chart animation
  const chartScale = interpolate(frame, [30, 60], [0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  return (
    <AbsoluteFill className="p-16">
      {/* Title */}
      <div
        className="text-center mb-16"
        style={{ opacity: titleOpacity }}
      >
        <h1 className="text-6xl font-bold gradient-text mb-4">
          Performance Metrics
        </h1>
        <p className="text-2xl text-muted-foreground">
          Real-time data visualization
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-16 h-full">
        {/* Animated Chart */}
        <div
          className="flex items-center justify-center"
          style={{
            transform: `scale(${chartScale})`,
            opacity: frame > 30 ? 1 : 0
          }}
        >
          <AnimatedChart
            data={data}
            startFrame={60}
          />
        </div>
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 gap-6">
          {data.map((metric, index) => (
            <MetricCard
              key={metric.name}
              {...metric}
              startFrame={90 + (index * 15)}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};