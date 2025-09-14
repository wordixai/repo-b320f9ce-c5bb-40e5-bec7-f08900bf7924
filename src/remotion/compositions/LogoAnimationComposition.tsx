import React from 'react';
import { AbsoluteFill } from 'remotion';
import { LogoAnimationSection } from '../scenes/LogoAnimationSection';
import { ParticleBackground } from '../components/ParticleBackground';

interface LogoAnimationProps {
  logoUrl: string;
  brandName: string;
  primaryColor: string;
  secondaryColor: string;
}

export const LogoAnimationComposition: React.FC<LogoAnimationProps> = ({
  logoUrl,
  brandName,
  primaryColor,
  secondaryColor
}) => {
  return (
    <AbsoluteFill className="bg-background">
      <ParticleBackground />
      <LogoAnimationSection
        logoUrl={logoUrl}
        brandColor={primaryColor}
        brandName={brandName}
        secondaryColor={secondaryColor}
      />
    </AbsoluteFill>
  );
};