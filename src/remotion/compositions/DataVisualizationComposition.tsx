import React from 'react';
import { AbsoluteFill } from 'remotion';
import { DataVisualizationSection } from '../scenes/DataVisualizationSection';
import { ParticleBackground } from '../components/ParticleBackground';

interface DataVisualizationProps {
  data: Array<{
    name: string;
    value: number;
    trend: 'up' | 'down' | 'stable';
  }>;
}

export const DataVisualizationComposition: React.FC<DataVisualizationProps> = ({
  data
}) => {
  return (
    <AbsoluteFill className="bg-background tech-grid">
      <ParticleBackground />
      <DataVisualizationSection data={data} />
    </AbsoluteFill>
  );
};