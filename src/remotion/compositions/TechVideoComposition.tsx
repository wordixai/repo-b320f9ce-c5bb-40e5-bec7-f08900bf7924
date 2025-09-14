import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Sequence } from 'remotion';
import { CodeRevealSection } from '../scenes/CodeRevealSection';
import { LogoAnimationSection } from '../scenes/LogoAnimationSection';
import { TextKineticSection } from '../scenes/TextKineticSection';
import { ParticleBackground } from '../components/ParticleBackground';
import { GeometricShapes } from '../components/GeometricShapes';

interface TechVideoProps {
  title: string;
  subtitle: string;
  brandColor: string;
  logoUrl: string;
  codeSnippets: Array<{
    language: string;
    code: string;
  }>;
}

export const TechVideoComposition: React.FC<TechVideoProps> = ({
  title,
  subtitle,
  brandColor,
  logoUrl,
  codeSnippets
}) => {
  const frame = useCurrentFrame();
  
  return (
    <AbsoluteFill className="bg-background tech-grid">
      {/* Background Elements */}
      <ParticleBackground />
      <GeometricShapes />
      
      {/* Title Sequence - 0-180 frames (6 seconds) */}
      <Sequence from={0} durationInFrames={180}>
        <TextKineticSection
          title={title}
          subtitle={subtitle}
          brandColor={brandColor}
        />
      </Sequence>
      
      {/* Logo Animation - 180-360 frames (6 seconds) */}
      <Sequence from={180} durationInFrames={180}>
        <LogoAnimationSection
          logoUrl={logoUrl}
          brandColor={brandColor}
        />
      </Sequence>
      
      {/* Code Reveal Sections */}
      {codeSnippets.map((snippet, index) => (
        <Sequence
          key={index}
          from={360 + (index * 300)} // Each snippet gets 10 seconds
          durationInFrames={300}
        >
          <CodeRevealSection
            code={snippet.code}
            language={snippet.language}
            title={`Code Example ${index + 1}`}
          />
        </Sequence>
      ))}
      
      {/* Final Outro - Last 6 seconds */}
      <Sequence from={1620} durationInFrames={180}>
        <AbsoluteFill className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold gradient-text mb-4">
              Thank You
            </h1>
            <p className="text-2xl text-muted-foreground">
              Created with Remotion & React
            </p>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};