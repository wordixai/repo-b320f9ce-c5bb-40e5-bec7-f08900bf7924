import React from 'react';
import { AbsoluteFill } from 'remotion';
import { TerminalSimulationSection } from '../scenes/TerminalSimulationSection';
import { ParticleBackground } from '../components/ParticleBackground';

interface TerminalSimulationProps {
  commands: string[];
}

export const TerminalSimulationComposition: React.FC<TerminalSimulationProps> = ({
  commands
}) => {
  return (
    <AbsoluteFill className="bg-background">
      <ParticleBackground />
      <TerminalSimulationSection commands={commands} />
    </AbsoluteFill>
  );
};