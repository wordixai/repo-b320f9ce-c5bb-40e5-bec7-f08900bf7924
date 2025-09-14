import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface KineticTextProps {
  text: string;
  startFrame: number;
  className?: string;
  staggerDelay?: number;
}

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  startFrame,
  className = '',
  staggerDelay = 3
}) => {
  const frame = useCurrentFrame();
  const words = text.split(' ');

  return (
    <div className={`overflow-hidden ${className}`}>
      {words.map((word, wordIndex) => {
        const wordStartFrame = startFrame + (wordIndex * staggerDelay);
        const activeFrame = Math.max(0, frame - wordStartFrame);
        
        const y = interpolate(activeFrame, [0, 20], [100, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp'
        });
        
        const opacity = interpolate(activeFrame, [0, 20], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp'
        });
        
        const scale = interpolate(activeFrame, [0, 10, 20], [0.8, 1.1, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp'
        });

        return (
          <span
            key={wordIndex}
            className="inline-block mr-4 gradient-text"
            style={{
              transform: `translateY(${y}px) scale(${scale})`,
              opacity,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};