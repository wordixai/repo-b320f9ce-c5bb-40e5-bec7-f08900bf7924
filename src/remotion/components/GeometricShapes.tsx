import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

export const GeometricShapes: React.FC = () => {
  const frame = useCurrentFrame();
  
  const shapes = [
    {
      type: 'triangle',
      x: 200,
      y: 300,
      size: 60,
      color: '#42b883',
      rotationSpeed: 1
    },
    {
      type: 'square',
      x: 1600,
      y: 200,
      size: 80,
      color: '#00d4ff',
      rotationSpeed: -0.5
    },
    {
      type: 'circle',
      x: 300,
      y: 800,
      size: 50,
      color: '#a855f7',
      rotationSpeed: 2
    },
    {
      type: 'hexagon',
      x: 1500,
      y: 850,
      size: 70,
      color: '#f59e0b',
      rotationSpeed: -1.5
    }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {shapes.map((shape, index) => {
        const rotation = frame * shape.rotationSpeed;
        const float = Math.sin(frame * 0.03 + index) * 10;
        const scale = 1 + Math.sin(frame * 0.02 + index) * 0.1;
        
        const opacity = interpolate(frame, [0, 60], [0, 0.6], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp'
        });

        return (
          <div
            key={index}
            className="absolute"
            style={{
              left: shape.x,
              top: shape.y + float,
              width: shape.size,
              height: shape.size,
              transform: `rotate(${rotation}deg) scale(${scale})`,
              opacity,
            }}
          >
            {shape.type === 'triangle' && (
              <div
                className="w-0 h-0 border-l-[30px] border-r-[30px] border-b-[52px] border-l-transparent border-r-transparent"
                style={{
                  borderBottomColor: shape.color,
                  filter: `drop-shadow(0 0 10px ${shape.color})`
                }}
              />
            )}
            
            {shape.type === 'square' && (
              <div
                className="w-full h-full"
                style={{
                  backgroundColor: shape.color,
                  boxShadow: `0 0 20px ${shape.color}`,
                }}
              />
            )}
            
            {shape.type === 'circle' && (
              <div
                className="w-full h-full rounded-full"
                style={{
                  backgroundColor: shape.color,
                  boxShadow: `0 0 15px ${shape.color}`,
                }}
              />
            )}
            
            {shape.type === 'hexagon' && (
              <div
                className="w-full h-full"
                style={{
                  backgroundColor: shape.color,
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  filter: `drop-shadow(0 0 15px ${shape.color})`
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};