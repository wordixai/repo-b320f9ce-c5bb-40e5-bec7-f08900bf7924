import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

export const ParticleBackground: React.FC = () => {
  const frame = useCurrentFrame();
  
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    initialX: Math.random() * 1920,
    initialY: Math.random() * 1080,
    speed: 0.5 + Math.random() * 2,
    size: 2 + Math.random() * 4,
    opacity: 0.3 + Math.random() * 0.7,
    color: ['#42b883', '#00d4ff', '#a855f7'][Math.floor(Math.random() * 3)]
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => {
        const x = (particle.initialX + frame * particle.speed) % 1920;
        const y = particle.initialY + Math.sin(frame * 0.02 + particle.id) * 20;
        
        const pulseScale = 1 + Math.sin(frame * 0.05 + particle.id) * 0.3;
        
        return (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: x,
              top: y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              transform: `scale(${pulseScale})`,
              boxShadow: `0 0 10px ${particle.color}`,
            }}
          />
        );
      })}
    </div>
  );
};