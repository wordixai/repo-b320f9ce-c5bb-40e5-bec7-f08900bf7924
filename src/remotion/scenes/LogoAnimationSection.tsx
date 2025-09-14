import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Img } from 'remotion';
import { GeometricShapes } from '../components/GeometricShapes';

interface LogoAnimationSectionProps {
  logoUrl: string;
  brandColor: string;
  brandName?: string;
  secondaryColor?: string;
}

export const LogoAnimationSection: React.FC<LogoAnimationSectionProps> = ({
  logoUrl,
  brandColor,
  brandName,
  secondaryColor = '#00d4ff'
}) => {
  const frame = useCurrentFrame();
  
  // Logo entrance animation
  const logoScale = interpolate(frame, [0, 45], [0, 1.2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  
  const logoScaleSettle = interpolate(frame, [45, 75], [1.2, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  
  const logoRotation = interpolate(frame, [0, 75], [0, 360], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  
  // Morphing animation
  const morphScale = interpolate(frame, [75, 105], [1, 1.1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  
  const morphRotation = interpolate(frame, [105, 135], [0, 15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  
  // Brand name animation
  const nameOpacity = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  
  const nameY = interpolate(frame, [90, 120], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  
  // Glow intensity
  const glowIntensity = interpolate(frame, [120, 150], [0.3, 0.8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  const finalScale = frame > 45 ? logoScaleSettle : logoScale;
  const finalMorphScale = frame > 75 ? morphScale : 1;

  return (
    <AbsoluteFill className="flex items-center justify-center">
      <GeometricShapes />
      
      {/* Animated glow rings */}
      <div className="absolute">
        {[1, 2, 3].map((ring) => {
          const ringScale = interpolate(
            frame,
            [60 + ring * 10, 90 + ring * 10],
            [0, 2 + ring * 0.5],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );
          
          const ringOpacity = interpolate(
            frame,
            [60 + ring * 10, 90 + ring * 10, 120 + ring * 10],
            [0, 0.6, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );
          
          return (
            <div
              key={ring}
              className="absolute w-32 h-32 rounded-full border-2"
              style={{
                borderColor: ring % 2 === 0 ? brandColor : secondaryColor,
                transform: `scale(${ringScale})`,
                opacity: ringOpacity,
                boxShadow: `0 0 40px ${ring % 2 === 0 ? brandColor : secondaryColor}`
              }}
            />
          );
        })}
      </div>
      
      {/* Main logo */}
      <div
        className="relative"
        style={{
          transform: `scale(${finalScale * finalMorphScale}) rotate(${logoRotation + morphRotation}deg)`,
        }}
      >
        <div
          className="w-64 h-64 rounded-2xl overflow-hidden"
          style={{
            boxShadow: `0 0 ${60 * glowIntensity}px ${brandColor}`,
          }}
        >
          <Img
            src={logoUrl}
            className="w-full h-full object-cover"
            style={{
              filter: `hue-rotate(${frame * 2}deg) saturate(1.2)`
            }}
          />
        </div>
        
        {/* Overlay effects */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `linear-gradient(45deg, ${brandColor}20, ${secondaryColor}20)`,
            opacity: Math.sin(frame * 0.1) * 0.3 + 0.3
          }}
        />
      </div>
      
      {/* Brand name */}
      {brandName && (
        <div
          className="absolute mt-80 text-center"
          style={{
            opacity: nameOpacity,
            transform: `translateY(${nameY}px)`
          }}
        >
          <h2 className="text-6xl font-bold gradient-text">
            {brandName}
          </h2>
        </div>
      )}
    </AbsoluteFill>
  );
};