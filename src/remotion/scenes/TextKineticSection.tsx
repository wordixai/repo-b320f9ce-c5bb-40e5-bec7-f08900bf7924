import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { KineticText } from '../components/KineticText';

interface TextKineticSectionProps {
  title: string;
  subtitle: string;
  brandColor: string;
}

export const TextKineticSection: React.FC<TextKineticSectionProps> = ({
  title,
  subtitle,
  brandColor
}) => {
  const frame = useCurrentFrame();
  
  // Background animation
  const bgOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  return (
    <AbsoluteFill>
      {/* Animated background */}
      <div
        className="absolute inset-0 tech-grid"
        style={{ opacity: bgOpacity * 0.3 }}
      />
      
      <div className="flex flex-col items-center justify-center h-full">
        <KineticText
          text={title}
          startFrame={0}
          className="text-8xl font-bold mb-8"
          staggerDelay={3}
        />
        
        <KineticText
          text={subtitle}
          startFrame={60}
          className="text-3xl text-muted-foreground"
          staggerDelay={2}
        />
        
        {/* Animated accent line */}
        <div
          className="mt-12 h-2 bg-primary glow-green"
          style={{
            width: interpolate(frame, [120, 150], [0, 200], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp'
            })
          }}
        />
      </div>
    </AbsoluteFill>
  );
};