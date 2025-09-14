import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { TerminalWindow } from '../components/TerminalWindow';

interface TerminalSimulationSectionProps {
  commands: string[];
}

export const TerminalSimulationSection: React.FC<TerminalSimulationSectionProps> = ({
  commands
}) => {
  const frame = useCurrentFrame();
  
  const containerScale = interpolate(frame, [0, 30], [0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  
  const containerOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  return (
    <AbsoluteFill className="flex items-center justify-center p-16">
      <div
        className="w-full max-w-6xl"
        style={{
          transform: `scale(${containerScale})`,
          opacity: containerOpacity
        }}
      >
        <TerminalWindow
          commands={commands}
          startFrame={30}
        />
      </div>
    </AbsoluteFill>
  );
};